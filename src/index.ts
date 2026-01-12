// ============================================================================
// src/index.ts
// ============================================================================
import "express-async-errors";
import { AppServer } from "@core/http/server";

const server = new AppServer();
server.start();
