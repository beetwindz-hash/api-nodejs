// ============================================================================
// src/core/http/app.ts
// ============================================================================
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { appConfig } from "@core/config";
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from "@core/middlewares";
import { createRouter } from "./router";

export const createApp = (): Application => {
  const app = express();

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: appConfig.corsOrigin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: appConfig.rateLimitWindowMs,
    max: appConfig.rateLimitMaxRequests,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api", limiter);

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Compression
  app.use(compression());

  // Request logging
  if (appConfig.nodeEnv !== "test") {
    app.use(requestLogger);
  }

  // Health check
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: appConfig.nodeEnv,
    });
  });

  // Root endpoint
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Bennet Eddar API",
      version: appConfig.apiVersion,
      docs: "/api/docs",
    });
  });

  // API routes
  app.use("/api", createRouter());

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
};
