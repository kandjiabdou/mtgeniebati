import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net", // Vous devrez ajuster selon votre provider
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Fonction utilitaire pour sanitiser les champs
const sanitizeFields = <T extends Record<string, any>>(data: T): T => {
  const sanitized: any = {};
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = typeof value === "string" ? sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    }) : value;
  }
  return sanitized;
};

// Fonction pour envoyer l'accusé de réception
const sendAcknowledgmentEmail = async (
  to: string,
  name: string
) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log("Variables d'environnement email manquantes, email non envoyé");
    return;
  }

  const content = `
    <p>Bonjour ${name},</p>
    <p>Nous avons bien reçu votre demande de contact.</p>
    <p>Notre équipe vous répondra dans les plus brefs délais.</p>
    <p>Merci de nous avoir contactés,<br>L'équipe MT GENIE BATI</p>
  `;

  try {
    await transporter.sendMail({
      from: `"MT GENIE BATI" <${process.env.MAIL_USER}>`,
      to,
      subject: "📩 Nous avons bien reçu votre message",
      html: content,
    });
  } catch (error) {
    console.error("Erreur envoi email accusé:", error);
  }
};

// Fonction pour envoyer la copie interne
const sendInternalEmail = async (data: any) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log("Variables d'environnement email manquantes, email interne non envoyé");
    return;
  }

  const content = `
    <h2>Nouveau message de contact - MT GENIE BATI</h2>
    <p><strong>Prénom :</strong> ${data.firstName}</p>
    <p><strong>Nom :</strong> ${data.lastName}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
    <p><strong>Type de projet :</strong> ${data.projectType}</p>
    <p><strong>Message :</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"MT GENIE BATI" <${process.env.MAIL_USER}>`,
      to: "massatacisse@mtgeniebati.com",
      subject: `📥 Nouveau contact - ${data.firstName} ${data.lastName}`,
      html: content,
    });
  } catch (error) {
    console.error("Erreur envoi email interne:", error);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validation des données
      const validatedData = insertContactSchema.parse(req.body);
      
      // Sanitisation des champs
      const sanitizedData = sanitizeFields(validatedData);
      
      // Stockage en base
      const contact = await storage.createContact(sanitizedData);
      
      // Envoi des emails
      await sendAcknowledgmentEmail(
        sanitizedData.email, 
        `${sanitizedData.firstName} ${sanitizedData.lastName}`
      );
      
      await sendInternalEmail(sanitizedData);
      
      res.json({ 
        success: true, 
        message: "Votre message a été envoyé avec succès. Nous vous recontacterons très bientôt.",
        contactId: contact.id 
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire de contact:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Données invalides", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erreur serveur lors de l'envoi du message" 
        });
      }
    }
  });

  // Get all contacts (for admin use)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erreur lors de la récupération des contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
