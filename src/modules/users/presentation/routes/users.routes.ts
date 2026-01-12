// ============================================================================
// src/modules/users/presentation/routes/users.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate } from "@core/middlewares";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Placeholder routes - will be fully implemented with repositories
router.get("/profile", (req, res) => {
  res.json({ message: "Get user profile endpoint" });
});

router.patch("/profile", (req, res) => {
  res.json({ message: "Update user profile endpoint" });
});

router.post("/avatar", (req, res) => {
  res.json({ message: "Upload avatar endpoint" });
});

router.delete("/avatar", (req, res) => {
  res.json({ message: "Delete avatar endpoint" });
});

router.get("/addresses", (req, res) => {
  res.json({ message: "Get addresses endpoint" });
});

router.post("/addresses", (req, res) => {
  res.json({ message: "Create address endpoint" });
});

router.patch("/addresses/:id", (req, res) => {
  res.json({ message: "Update address endpoint" });
});

router.delete("/addresses/:id", (req, res) => {
  res.json({ message: "Delete address endpoint" });
});

router.post("/addresses/:id/default", (req, res) => {
  res.json({ message: "Set default address endpoint" });
});

export { router as usersRouter };
