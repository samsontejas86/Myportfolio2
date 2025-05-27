import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = insertContactSchema.parse({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
      });
      
      // Store the contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Return success response
      res.status(201).json({ 
        success: true,
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      // Handle other errors
      console.error("Error submitting contact form:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to submit contact form" 
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json({ 
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
