import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.json({ 
        success: true, 
        message: "Votre message a été envoyé avec succès. Nous vous recontacterons très bientôt.",
        contactId: contact.id 
      });
    } catch (error) {
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
