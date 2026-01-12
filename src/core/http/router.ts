// ============================================================================
// src/core/http/router.ts
// ============================================================================
import { Router } from "express";
import { authRouter } from "@modules/auth/presentation/routes";
import { usersRouter } from "@modules/users/presentation/routes";

export const createRouter = (): Router => {
  const router = Router();

  // Mount module routes
  router.use("/auth", authRouter);
  router.use("/users", usersRouter);
  // router.use('/cooks', cooksRouter);
  // router.use('/dishes', dishesRouter);
  // router.use('/orders', ordersRouter);
  // router.use('/applications', applicationsRouter);
  // router.use('/conversations', conversationsRouter);
  // router.use('/reviews', reviewsRouter);
  // router.use('/notifications', notificationsRouter);
  // router.use('/admin', adminRouter);

  return router;
};
