# 🚀 Bennet Eddar API - Complete Development Roadmap

## 📋 Project Overview

**Bennet Eddar** is a platform connecting home cooks with customers for authentic homemade meals. This is a production-ready REST API built with Express.js, TypeScript, and MongoDB.

---

## 🏗️ Phase 1: Project Foundation & Core Setup

### 1.1 Initial Setup

```bash
# Initialize project structure
mkdir -p src/{core,modules}
mkdir -p src/core/{config,database,middleware,utils,types}
mkdir -p src/modules/{auth,users,cooks,dishes,orders,applications,conversations,reviews,notifications,admin}
```

### 1.2 Core Configuration Files

**Create: `src/core/config/env.config.ts`**

- Load and validate environment variables
- Export typed configuration object
- Handle defaults for development/production

**Create: `src/core/config/database.config.ts`**

- MongoDB connection settings
- Mongoose configuration
- Connection pooling options

**Create: `src/core/types/express.d.ts`**

- Extend Express Request interface
- Add user property to Request
- Define custom types for JWT payload

### 1.3 Database Connection

**Create: `src/core/database/connection.ts`**

- Implement MongoDB connection with Mongoose
- Add connection error handling
- Implement reconnection logic
- Add connection event listeners

**Create: `src/core/database/models/index.ts`**

- Central export for all Mongoose models
- Implement base schema with timestamps

---

## 🗄️ Phase 2: Database Models & Schemas

### 2.1 User Model

**Create: `src/core/database/models/User.model.ts`**

```typescript
interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "customer" | "cook" | "admin";
  avatarUrl?: string;
  isAdmin: boolean;
  refreshTokens: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

- Add password hashing middleware (bcrypt)
- Add password comparison method
- Add indexes on email

### 2.2 Profile Model

**Create: `src/core/database/models/Profile.model.ts`**

- Link to User model
- Store phone, address, preferences
- Support multiple addresses
- Language preferences (ar, fr, en)

### 2.3 Cook Model

**Create: `src/core/database/models/Cook.model.ts`**

- Extended cook-specific fields
- Bio, specialties (English & Arabic)
- Location, rating, reviews count
- Verification status
- Link to User model

### 2.4 Dish Model

**Create: `src/core/database/models/Dish.model.ts`**

- Link to Cook
- Name, description (bilingual)
- Price, category, ingredients
- Prep time, servings
- Availability status
- Rating aggregation

### 2.5 Order Model

**Create: `src/core/database/models/Order.model.ts`**

- Customer and Cook references
- Order items array (dish, quantity, price)
- Status workflow: pending → confirmed → preparing → ready → delivered
- Delivery address
- Timestamps for each status change
- Cancellation support

### 2.6 Application Model

**Create: `src/core/database/models/Application.model.ts`**

- Cook application form data
- Status: pending, approved, rejected
- Admin review tracking
- Rejection reason field

### 2.7 Conversation & Message Models

**Create: `src/core/database/models/Conversation.model.ts`**
**Create: `src/core/database/models/Message.model.ts`**

- Customer-Cook messaging
- Unread count tracking
- Last message caching
- Order-related messages flag

### 2.8 Review Model

**Create: `src/core/database/models/Review.model.ts`**

- Link to Order and Cook
- Rating (1-5), comment
- Cook reply support
- Timestamps for reply

### 2.9 Notification Model

**Create: `src/core/database/models/Notification.model.ts`**

- Types: order_new, order_status, message, review, etc.
- User-specific notifications
- Read/unread status
- Metadata JSON field

### 2.10 Favorite Model

**Create: `src/core/database/models/Favorite.model.ts`**

- User favorites for cooks
- Composite index on userId + cookId

---

## 🔐 Phase 3: Authentication & Authorization

### 3.1 JWT Utilities

**Create: `src/core/utils/jwt.utils.ts`**

- Generate access token (1h expiry)
- Generate refresh token (7d expiry)
- Verify token
- Decode token payload

### 3.2 Password Utilities

**Create: `src/core/utils/password.utils.ts`**

- Hash password (bcrypt, 10 rounds)
- Compare password
- Generate reset token (crypto)

### 3.3 Auth Middleware

**Create: `src/core/middleware/auth.middleware.ts`**

- Extract JWT from Authorization header
- Verify token validity
- Attach user to request object
- Handle token expiration errors

**Create: `src/core/middleware/role.middleware.ts`**

- Check user role (customer, cook, admin)
- Restrict routes by role
- Multiple role support

### 3.4 Auth Module

**Create: `src/modules/auth/auth.controller.ts`**

- Register: POST /auth/register
- Login: POST /auth/login
- Logout: POST /auth/logout
- Refresh token: POST /auth/refresh
- Get current user: GET /auth/me
- Forgot password: POST /auth/forgot-password
- Reset password: POST /auth/reset-password

**Create: `src/modules/auth/auth.service.ts`**

- Business logic for all auth operations
- Token management
- Password reset email (stub for now)

**Create: `src/modules/auth/auth.validation.ts`**

- Express-validator schemas
- Email format, password strength
- Required fields validation

**Create: `src/modules/auth/auth.routes.ts`**

- Define all auth routes
- Apply validation middleware

---

## 👤 Phase 4: Users Module

### 4.1 User Controller

**Create: `src/modules/users/users.controller.ts`**

- Get profile: GET /users/profile
- Update profile: PATCH /users/profile
- Upload avatar: POST /users/avatar
- Delete avatar: DELETE /users/avatar
- Get user by ID: GET /users/:id
- Get addresses: GET /users/addresses
- Create address: POST /users/addresses
- Update address: PATCH /users/addresses/:id
- Delete address: DELETE /users/addresses/:id
- Set default address: POST /users/addresses/:id/default
- Get favorites: GET /users/favorites
- Add favorite: POST /users/favorites
- Remove favorite: DELETE /users/favorites/:cookId
- Check favorite: GET /users/favorites/:cookId/check

### 4.2 User Service

**Create: `src/modules/users/users.service.ts`**

- Implement all business logic
- Handle file uploads for avatars
- Manage user addresses
- Handle favorites relationships

### 4.3 File Upload Middleware

**Create: `src/core/middleware/upload.middleware.ts`**

- Configure Multer
- Support local storage and Cloudinary
- File size limits (5MB)
- Image format validation
- Generate unique filenames

### 4.4 User Validation

**Create: `src/modules/users/users.validation.ts`**

- Profile update validation
- Address validation
- Phone number format

### 4.5 User Routes

**Create: `src/modules/users/users.routes.ts`**

- Define all user routes
- Apply auth middleware
- Apply validation

---

## 👨‍🍳 Phase 5: Cooks Module

### 5.1 Cook Controller

**Create: `src/modules/cooks/cooks.controller.ts`**

- Get all cooks: GET /cooks (with filters)
- Get cook by ID: GET /cooks/:id
- Get cook dishes: GET /cooks/:id/dishes
- Get cook reviews: GET /cooks/:id/reviews
- Update cook profile: PATCH /cooks/profile (cook only)

### 5.2 Cook Service

**Create: `src/modules/cooks/cooks.service.ts`**

- Filtering: location, specialty, rating, verification
- Sorting options
- Pagination logic
- Rating aggregation
- Review statistics

### 5.3 Cook Validation

**Create: `src/modules/cooks/cooks.validation.ts`**

- Profile update rules
- Specialties array validation
- Location validation

### 5.4 Cook Routes

**Create: `src/modules/cooks/cooks.routes.ts`**

---

## 🍽️ Phase 6: Dishes Module

### 6.1 Dish Controller

**Create: `src/modules/dishes/dishes.controller.ts`**

- Get all dishes: GET /dishes (with comprehensive filters)
- Get dish by ID: GET /dishes/:id
- Search dishes: GET /dishes/search
- Get categories: GET /dishes/categories
- Create dish: POST /dishes (cook only)
- Update dish: PATCH /dishes/:id (cook only)
- Delete dish: DELETE /dishes/:id (cook only)

### 6.2 Dish Service

**Create: `src/modules/dishes/dishes.service.ts`**

- Advanced filtering: category, price range, rating, location
- Full-text search on name and description
- Sort by: price, rating, newest
- Owner verification for updates
- Category management
- Availability toggle

### 6.3 Dish Validation

**Create: `src/modules/dishes/dishes.validation.ts`**

- Price validation (positive number)
- Category enum validation
- Ingredients array validation
- Prep time format

### 6.4 Dish Routes

**Create: `src/modules/dishes/dishes.routes.ts`**

---

## 📦 Phase 7: Orders Module

### 7.1 Order Controller

**Create: `src/modules/orders/orders.controller.ts`**

- Get all orders: GET /orders (filtered by user/cook)
- Get order by ID: GET /orders/:id
- Get order history: GET /orders/history
- Create order: POST /orders
- Update order status: PATCH /orders/:id/status
- Cancel order: POST /orders/:id/cancel

### 7.2 Order Service

**Create: `src/modules/orders/orders.service.ts`**

- Calculate order total
- Validate dish availability
- Status workflow validation
- Notification triggers
- Order statistics
- Filter by date range, status, customer, cook

### 7.3 Order Validation

**Create: `src/modules/orders/orders.validation.ts`**

- Items array validation
- Quantity validation (min: 1)
- Delivery address required
- Status transition rules

### 7.4 Order Routes

**Create: `src/modules/orders/orders.routes.ts`**

---

## 📝 Phase 8: Applications Module

### 8.1 Application Controller

**Create: `src/modules/applications/applications.controller.ts`**

- Get all applications: GET /applications (admin only)
- Get application by ID: GET /applications/:id
- Create application: POST /applications
- Review application: POST /applications/:id/review (admin)

### 8.2 Application Service

**Create: `src/modules/applications/applications.service.ts`**

- Check duplicate applications
- Create cook profile on approval
- Update user role to 'cook'
- Send notification on status change

### 8.3 Application Validation

**Create: `src/modules/applications/applications.validation.ts`**

- Required fields: fullName, email, phone, location, experience
- Email format validation
- Phone format validation

### 8.4 Application Routes

**Create: `src/modules/applications/applications.routes.ts`**

---

## 💬 Phase 9: Conversations Module

### 9.1 Conversation Controller

**Create: `src/modules/conversations/conversations.controller.ts`**

- Get all conversations: GET /conversations
- Get conversation by ID: GET /conversations/:id
- Get messages: GET /conversations/:id/messages
- Send message: POST /conversations/:id/messages
- Create conversation: POST /conversations
- Mark messages as read: POST /conversations/:id/read

### 9.2 Conversation Service

**Create: `src/modules/conversations/conversations.service.ts`**

- Find or create conversation
- Update last message cache
- Increment unread count
- Mark messages as read
- Real-time update support (future WebSocket)

### 9.3 Conversation Validation

**Create: `src/modules/conversations/conversations.validation.ts`**

- Message content required
- CookId validation
- DishName validation

### 9.4 Conversation Routes

**Create: `src/modules/conversations/conversations.routes.ts`**

---

## ⭐ Phase 10: Reviews Module

### 10.1 Review Controller

**Create: `src/modules/reviews/reviews.controller.ts`**

- Get all reviews: GET /reviews
- Get review by ID: GET /reviews/:id
- Get cook review stats: GET /cooks/:cookId/reviews/stats
- Create review: POST /reviews
- Reply to review: POST /reviews/:id/reply (cook only)
- Delete review: DELETE /reviews/:id

### 10.2 Review Service

**Create: `src/modules/reviews/reviews.service.ts`**

- Verify order completion before review
- Check duplicate reviews
- Update cook rating aggregation
- Calculate rating distribution
- Only order customer can review

### 10.3 Review Validation

**Create: `src/modules/reviews/reviews.validation.ts`**

- Rating: 1-5 required
- Comment: min 10 characters
- OrderId validation

### 10.4 Review Routes

**Create: `src/modules/reviews/reviews.routes.ts`**

---

## 🔔 Phase 11: Notifications Module

### 11.1 Notification Controller

**Create: `src/modules/notifications/notifications.controller.ts`**

- Get all notifications: GET /notifications
- Get notification by ID: GET /notifications/:id
- Mark as read: POST /notifications/mark-read
- Mark all as read: POST /notifications/mark-all-read
- Get unread count: GET /notifications/unread-count
- Get preferences: GET /notifications/preferences
- Update preferences: PATCH /notifications/preferences

### 11.2 Notification Service

**Create: `src/modules/notifications/notifications.service.ts`**

- Create notification helper
- Notification types: order_new, order_status, message, review, etc.
- Batch mark as read
- User preference filtering
- Scheduled cleanup of old notifications

### 11.3 Notification Validation

**Create: `src/modules/notifications/notifications.validation.ts`**

- Notification IDs array
- Preferences boolean validation

### 11.4 Notification Routes

**Create: `src/modules/notifications/notifications.routes.ts`**

---

## 🔧 Phase 12: Admin Module

### 12.1 Admin Controller

**Create: `src/modules/admin/admin.controller.ts`**

- Get admin stats: GET /admin/stats
- Get all users: GET /admin/users
- Get user by ID: GET /admin/users/:id
- Suspend user: POST /admin/users/:id/suspend
- Activate user: POST /admin/users/:id/activate
- Delete user: DELETE /admin/users/:id
- Get all orders: GET /admin/orders
- Get analytics: GET /admin/analytics

### 12.2 Admin Service

**Create: `src/modules/admin/admin.service.ts`**

- Dashboard statistics aggregation
- User management operations
- Analytics: orders per day, top cooks, top dishes, user growth
- Revenue calculations
- Export data functionality

### 12.3 Admin Validation

**Create: `src/modules/admin/admin.validation.ts`**

- Date range validation
- Suspension reason validation

### 12.4 Admin Routes

**Create: `src/modules/admin/admin.routes.ts`**

- All routes require admin role

---

## 🛡️ Phase 13: Middleware & Error Handling

### 13.1 Error Handler Middleware

**Create: `src/core/middleware/error.middleware.ts`**

- Global error handler
- Format consistent error responses
- Log errors with Winston
- Handle Mongoose validation errors
- Handle JWT errors
- Handle Multer errors

### 13.2 Validation Middleware

**Create: `src/core/middleware/validation.middleware.ts`**

- Execute express-validator chains
- Format validation errors
- Return 422 for validation failures

### 13.3 Not Found Middleware

**Create: `src/core/middleware/notFound.middleware.ts`**

- Handle 404 errors
- Return consistent format

### 13.4 Rate Limiting

**Create: `src/core/middleware/rateLimiter.middleware.ts`**

- Configure express-rate-limit
- Different limits for auth routes
- IP-based limiting
- Custom error messages

### 13.5 Logger

**Create: `src/core/utils/logger.utils.ts`**

- Winston logger configuration
- Console transport for development
- File transport for production
- Error log file
- Combined log file

### 13.6 Response Formatter

**Create: `src/core/utils/response.utils.ts`**

- Success response helper
- Error response helper
- Paginated response helper
- Consistent meta data (requestId, timestamp)

---

## 🔧 Phase 14: Utilities & Helpers

### 14.1 Pagination Utility

**Create: `src/core/utils/pagination.utils.ts`**

- Calculate skip and limit
- Generate pagination metadata
- Default page size: 10
- Max page size: 100

### 14.2 Validation Helpers

**Create: `src/core/utils/validation.utils.ts`**

- Common validation rules
- Email validator
- Phone validator
- UUID validator
- Date range validator

### 14.3 File Helpers

**Create: `src/core/utils/file.utils.ts`**

- Delete local file
- Generate unique filename
- Get file extension
- Validate file type

### 14.4 Cloudinary Integration

**Create: `src/core/utils/cloudinary.utils.ts`**

- Upload to Cloudinary
- Delete from Cloudinary
- Get optimized URL
- Configure folders

### 14.5 Slugify Utility

**Create: `src/core/utils/slugify.utils.ts`**

- Generate URL-friendly slugs
- Handle Arabic text
- Unique slug generation

---

## 🚀 Phase 15: Main Application Setup

### 15.1 Express App Configuration

**Create: `src/app.ts`**

- Initialize Express app
- Apply middleware: helmet, cors, compression
- Parse JSON and urlencoded bodies
- Apply rate limiting
- Mount routes
- Apply error handling middleware
- Export app instance

### 15.2 Routes Index

**Create: `src/routes/index.ts`**

- Mount all module routes under /api
- Auth routes: /api/auth
- Users routes: /api/users
- Cooks routes: /api/cooks
- Dishes routes: /api/dishes
- Orders routes: /api/orders
- Applications routes: /api/applications
- Conversations routes: /api/conversations
- Reviews routes: /api/reviews
- Notifications routes: /api/notifications
- Admin routes: /api/admin

### 15.3 Server Entry Point

**Create: `src/index.ts`**

- Load environment variables
- Connect to database
- Start Express server
- Handle graceful shutdown
- Handle uncaught exceptions
- Handle unhandled promise rejections

---

## 📊 Phase 16: Data Seeding & Testing

### 16.1 Seed Scripts

**Create: `src/core/database/seeds/users.seed.ts`**

- Create admin user
- Create sample customers
- Create sample cooks

**Create: `src/core/database/seeds/dishes.seed.ts`**

- Create sample dishes for each cook
- Various categories

**Create: `src/core/database/seeds/index.ts`**

- Run all seeds in order
- Clear existing data option

### 16.2 Run Seeds

```bash
npm run seed
```

---

## 📝 Phase 17: Documentation

### 17.1 API Documentation

- ✅ Already provided in API_DOCUMENTATION.md
- Generate Postman collection
- Add request/response examples

### 17.2 README

**Update: `README.md`**

- Project overview
- Features list
- Tech stack
- Installation guide
- Environment variables
- API endpoints
- Contributing guidelines

### 17.3 Code Comments

- Add JSDoc comments to all functions
- Document complex business logic
- Add type definitions where needed

---

## 🧪 Phase 18: Testing (Optional but Recommended)

### 18.1 Unit Tests

- Test services independently
- Mock database calls
- Test utility functions

### 18.2 Integration Tests

- Test API endpoints
- Use test database
- Test authentication flow
- Test authorization

### 18.3 Test Coverage

- Aim for 80%+ coverage
- Critical paths 100% covered

---

## 🔒 Phase 19: Security Hardening

### 19.1 Security Checklist

- ✅ Helmet for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ JWT authentication
- ✅ Password hashing
- Input sanitization
- SQL/NoSQL injection prevention
- XSS protection
- CSRF protection (if needed)

### 19.2 Security Middleware

**Create: `src/core/middleware/sanitize.middleware.ts`**

- Sanitize request body
- Remove HTML tags
- Prevent NoSQL injection

---

## 🚢 Phase 20: Deployment Preparation

### 20.1 Environment Configuration

- Production .env template
- Staging .env template
- CI/CD configuration

### 20.2 Docker Setup (Optional)

**Create: `Dockerfile`**

- Node.js base image
- Multi-stage build
- Production optimizations

**Create: `docker-compose.yml`**

- API service
- MongoDB service
- Redis service (for sessions/cache)

### 20.3 Performance Optimization

- Enable gzip compression (already done)
- Database indexing
- Query optimization
- Caching strategy (Redis)
- CDN for static assets

### 20.4 Monitoring & Logging

- Setup Winston for production logs
- Error tracking (Sentry)
- Performance monitoring (New Relic/Datadog)
- Health check endpoint: GET /health

---

## ✅ Development Checklist

### Phase 1-3: Foundation

- [ ] Project structure created
- [ ] TypeScript configuration
- [ ] Database connection
- [ ] All models created
- [ ] Authentication system
- [ ] Authorization middleware

### Phase 4-11: Core Modules

- [ ] Users module complete
- [ ] Cooks module complete
- [ ] Dishes module complete
- [ ] Orders module complete
- [ ] Applications module complete
- [ ] Conversations module complete
- [ ] Reviews module complete
- [ ] Notifications module complete

### Phase 12-15: Admin & Setup

- [ ] Admin module complete
- [ ] All middleware implemented
- [ ] Error handling configured
- [ ] Main app configured
- [ ] Routes mounted

### Phase 16-20: Polish & Deploy

- [ ] Database seeding
- [ ] Documentation complete
- [ ] Security hardened
- [ ] Testing implemented
- [ ] Ready for deployment

---

## 🎯 Quick Start Command Sequence

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your values

# 3. Build TypeScript
npm run build

# 4. Run development server
npm run dev

# 5. Seed database (optional)
npm run seed

# 6. Run tests
npm test
```

---

## 📞 Support & Maintenance

### Regular Tasks

- Monitor error logs
- Update dependencies monthly
- Backup database daily
- Review and optimize slow queries
- Update security patches immediately

### Future Enhancements

- Real-time messaging (Socket.io)
- Push notifications (Firebase)
- Payment integration (Stripe)
- Email service (SendGrid)
- SMS notifications (Twilio)
- Search optimization (Elasticsearch)
- Caching layer (Redis)
- Image optimization (Sharp)
- PDF generation (Puppeteer)
- Export to Excel/CSV

---

## 🎉 Conclusion

Follow these phases sequentially for best results. Each phase builds upon the previous one. Test thoroughly after completing each phase before moving to the next.

**Estimated Timeline:**

- **Phase 1-3:** 2-3 days (Foundation)
- **Phase 4-11:** 7-10 days (Core Modules)
- **Phase 12-15:** 2-3 days (Admin & Setup)
- **Phase 16-20:** 3-5 days (Polish & Deploy)

**Total:** 14-21 days for complete implementation

Good luck building Bennet Eddar! 🚀
