import { users, userProgress, quizAttempts, type User, type InsertUser, type UserProgress, type InsertUserProgress, type QuizAttempt, type InsertQuizAttempt } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttempts(userId: number): Promise<QuizAttempt[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProgress: Map<number, UserProgress>;
  private quizAttempts: Map<number, QuizAttempt[]>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentAttemptId: number;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.quizAttempts = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentAttemptId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return this.userProgress.get(userId);
  }

  async updateUserProgress(userId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existing = this.userProgress.get(userId);
    
    if (existing) {
      const updated: UserProgress = {
        ...existing,
        ...progress,
        lastAccessed: new Date(),
      };
      this.userProgress.set(userId, updated);
      return updated;
    } else {
      const newProgress: UserProgress = {
        id: this.currentProgressId++,
        userId,
        currentProgress: progress.currentProgress || 0,
        completedSections: progress.completedSections || [],
        quizScores: progress.quizScores || {},
        lastAccessed: new Date(),
      };
      this.userProgress.set(userId, newProgress);
      return newProgress;
    }
  }

  async createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = this.currentAttemptId++;
    const quizAttempt: QuizAttempt = {
      id,
      userId: attempt.userId || 1,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      answers: attempt.answers,
      completedAt: new Date(),
    };
    
    const userAttempts = this.quizAttempts.get(quizAttempt.userId || 1) || [];
    userAttempts.push(quizAttempt);
    this.quizAttempts.set(quizAttempt.userId || 1, userAttempts);
    
    return quizAttempt;
  }

  async getQuizAttempts(userId: number): Promise<QuizAttempt[]> {
    return this.quizAttempts.get(userId) || [];
  }
}

export const storage = new MemStorage();
