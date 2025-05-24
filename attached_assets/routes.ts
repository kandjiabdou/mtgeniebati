import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

// Vérification des variables d'environnement
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  throw new Error("MAIL_USER ou MAIL_PASS manquant dans le fichier .env");
}

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true, // Utiliser SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Schéma de validation du formulaire de contact
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  subject: z.string().min(1).max(50),
  message: z.string().min(10).max(1000),
});

// Schéma de validation du formulaire de franchise
const franchiseFormSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  adresse: z.string().min(2, { message: "L'adresse doit contenir au moins 2 caractères" }),
  ville: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
  codePostal: z.string().min(2, { message: "Le code postal est requis" }),
  pays: z.string().min(2, { message: "Le pays est requis" }),
  telephone: z.string().min(6, { message: "Le téléphone est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  franchiseVisee: z.string().min(2, { message: "Champ requis" }),
  regionSouhaitee: z.string().min(2, { message: "Champ requis" }),
  experiencePro: z.string().min(5, { message: "Champ requis" }),
  gereEquipe: z.string().min(2, { message: "Champ requis" }),
  detailsEquipe: z.string().optional(),
  experienceVente: z.string().min(2, { message: "Champ requis" }),
  detailsVente: z.string().optional(),
  autresCompetences: z.string().optional(),
  investissement: z.number().min(0, { message: "Champ requis" }),
  financementExterne: z.string().min(2, { message: "Champ requis" }),
  detailsFinancement: z.string().optional(),
  motivation: z.string().min(5, { message: "Champ requis" }),
  objectifs: z.string().min(5, { message: "Champ requis" }),
  declaration: z.literal(true, { errorMap: () => ({ message: "Champ requis" }) }),
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

// Fonction utilitaire pour envoyer l'accusé de réception
const sendAcknowledgmentEmail = async (
  to: string,
  name: string,
  subject: string,
  type: "contact" | "franchise"
) => {
  const content = type === "contact"
    ? `
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre message concernant : <strong>${subject}</strong>.</p>
      <p>Notre équipe vous répondra dans les plus brefs délais.</p>
      <p>Merci de nous avoir contactés,<br>L’équipe Njaboot Connect</p>
    `
    : `
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre candidature pour devenir franchisé Njaboot Connect.</p>
      <p>Notre équipe examinera votre dossier et vous contactera dans les plus brefs délais.</p>
      <p>Merci de votre intérêt,<br>L’équipe Njaboot Connect</p>
    `;

  await transporter.sendMail({
    from: `"Njaboot Connect" <${process.env.MAIL_USER}>`,
    to,
    subject: "📩 Nous avons bien reçu votre " + (type === "contact" ? "message" : "candidature"),
    html: content,
  });
};

// Fonction utilitaire pour envoyer la copie interne
const sendInternalEmail = async (
  data: Record<string, any>,
  subject: string,
  type: "contact" | "franchise"
) => {
  let content = "";
  if (type === "contact") {
    content = `
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Sujet :</strong> ${data.subject}</p>
      <p><strong>Message :</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `;
  } else {
    content = `
      <p><strong>Nom :</strong> ${data.nom}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Adresse :</strong> ${data.adresse}, ${data.ville}, ${data.codePostal}, ${data.pays}</p>
      <p><strong>Téléphone :</strong> ${data.telephone}</p>
      <p><strong>Franchise visée :</strong> ${data.franchiseVisee}</p>
      <p><strong>Région souhaitée :</strong> ${data.regionSouhaitee}</p>
      <p><strong>Expérience professionnelle :</strong></p>
      <p>${data.experiencePro.replace(/\n/g, "<br>")}</p>
      <p><strong>A géré une équipe :</strong> ${data.gereEquipe}${data.detailsEquipe ? ` (${data.detailsEquipe})` : ""}</p>
      <p><strong>Expérience vente/service client :</strong> ${data.experienceVente}${data.detailsVente ? ` (${data.detailsVente})` : ""}</p>
      ${data.autresCompetences ? `<p><strong>Autres compétences :</strong> ${data.autresCompetences.replace(/\n/g, "<br>")}</p>` : ""}
      <p><strong>Investissement disponible :</strong> ${data.investissement} €/FCFA</p>
      <p><strong>Financement externe :</strong> ${data.financementExterne}${data.detailsFinancement ? ` (${data.detailsFinancement})` : ""}</p>
      <p><strong>Motivation :</strong></p>
      <p>${data.motivation.replace(/\n/g, "<br>")}</p>
      <p><strong>Objectifs à long terme :</strong></p>
      <p>${data.objectifs.replace(/\n/g, "<br>")}</p>
      <p><strong>Déclaration :</strong> ${data.declaration ? "Certifiée" : "Non certifiée"}</p>
    `;
  }

  await transporter.sendMail({
    from: `"Njaboot Connect" <${process.env.MAIL_USER}>`,
    to: "contact@njabootconnect.com",
    subject,
    html: content,
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Route pour le formulaire de contact
  app.post("/api/contact", async (req, res) => {
    try {
      // Validation des données
      const parsed = contactFormSchema.parse(req.body);

      // Sanitisation des champs
      const sanitized = sanitizeFields(parsed);

      console.log("Contact form submission:", sanitized);

      // Envoi de l'accusé de réception
      await sendAcknowledgmentEmail(sanitized.email, sanitized.name, sanitized.subject, "contact");

      // Envoi de la copie interne
      await sendInternalEmail(sanitized, `📥 Nouveau message de contact - ${sanitized.subject}`, "contact");

      res.status(200).json({
        success: true,
        message: "Votre message a été envoyé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire de contact:", error);
      res.status(400).json({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du formulaire.",
      });
    }
  });

  // Route pour le formulaire de franchise
  app.post("/api/franchise", async (req, res) => {
    try {
      // Validation des données
      const parsed = franchiseFormSchema.parse(req.body);

      // Sanitisation des champs
      const sanitized = sanitizeFields(parsed);

      console.log("Franchise form submission:", sanitized);

      // Envoi de l'accusé de réception
      await sendAcknowledgmentEmail(sanitized.email, sanitized.nom, sanitized.franchiseVisee, "franchise");

      // Envoi de la copie interne
      await sendInternalEmail(sanitized, `📥 Nouvelle candidature franchise - ${sanitized.nom}`, "franchise");

      res.status(200).json({
        success: true,
        message: "Votre candidature a été envoyée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire de franchise:", error);
      res.status(400).json({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du formulaire.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}