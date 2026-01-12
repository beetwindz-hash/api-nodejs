// ============================================================================
// src/core/types/express.d.ts
// ============================================================================
import { JwtPayload } from "@core/utils";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      requestId?: string;
    }
  }
}
