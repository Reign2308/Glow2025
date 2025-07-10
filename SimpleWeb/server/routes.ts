import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizAttemptSchema, insertUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      
      if (!progress) {
        // Return default progress if none exists
        return res.json({
          currentProgress: 0,
          completedSections: [],
          quizScores: {},
        });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user progress" });
    }
  });

  // Update user progress
  app.post("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = insertUserProgressSchema.parse({
        userId,
        currentProgress: req.body.currentProgress,
        completedSections: req.body.completedSections,
        quizScores: req.body.quizScores,
      });
      
      const progress = await storage.updateUserProgress(userId, progressData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update user progress" });
      }
    }
  });

  // Submit quiz attempt
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const attemptData = insertQuizAttemptSchema.parse({
        ...req.body,
        userId: req.body.userId || 1, // Default user for demo
      });
      
      const attempt = await storage.createQuizAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid quiz data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit quiz" });
      }
    }
  });

  // Get quiz attempts
  app.get("/api/quiz/attempts/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const attempts = await storage.getQuizAttempts(userId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get quiz attempts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
