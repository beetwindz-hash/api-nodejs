// ============================================================================
// src/core/http/router.ts
// ============================================================================
import { Router } from "express";
import { authRouter } from "@modules/auth/presentation/routes/auth.routes";
import { usersRouter } from "@modules/users/presentation/routes/users.routes";

export const createRouter = (): Router => {
  const router = Router();

  // API Info
  router.get("/", (req, res) => {
    res.json({
      message: "Bennet Eddar API",
      version: "1.0.0",
      endpoints: {
        auth: "/api/auth",
        users: "/api/users",
        cooks: "/api/cooks",
        dishes: "/api/dishes",
        orders: "/api/orders",
        applications: "/api/applications",
        conversations: "/api/conversations",
        reviews: "/api/reviews",
        notifications: "/api/notifications",
        admin: "/api/admin",
      },
    });
  });

  // Mount module routes
  router.use("/auth", authRouter);
  router.use("/users", usersRouter);

  // TODO: Uncomment as modules are implemented
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
