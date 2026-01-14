// ============================================================================
// src/core/http/router.ts
// ============================================================================
import { Router } from "express";
import { authRouter } from "@modules/auth/presentation/routes/auth.routes";
import { usersRouter } from "@modules/users/presentation/routes/users.routes";
import { cooksRouter } from "@modules/cooks/presentation/routes/cooks.routes";
import { dishesRouter } from "@modules/dishes/presentation/routes/dishes.routes";
import { ordersRouter } from "@modules/orders/presentation/routes/orders.routes";
import { conversationsRouter } from "@modules/conversations/presentation/routes/conversations.routes";
import { reviewsRouter } from "@modules/reviews/presentation/routes/reviews.routes";
import { notificationsRouter } from "@modules/notifications/presentation/routes/notifications.routes";
import { adminRouter } from "@modules/admin/presentation/routes/admin.routes";

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
  router.use("/cooks", cooksRouter);
  router.use("/dishes", dishesRouter);
  router.use("/orders", ordersRouter);
  router.use("/conversations", conversationsRouter);
  router.use("/reviews", reviewsRouter);
  router.use("/notifications", notificationsRouter);
  router.use("/admin", adminRouter);

  // TODO: Uncomment as modules are implemented
  // router.use('/applications', applicationsRouter);

  return router;
};
