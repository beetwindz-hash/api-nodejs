# 📚 BENNET EDDAR - API Documentation

**Base URL:** `http://localhost:3000/api` (or `VITE_API_BASE_URL`)

**Authentication:** Bearer Token (JWT) in `Authorization` header

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Cooks](#cooks)
4. [Dishes](#dishes)
5. [Orders](#orders)
6. [Applications](#applications)
7. [Conversations](#conversations)
8. [Reviews](#reviews)
9. [Notifications](#notifications)
10. [Admin](#admin)

---

## 🔐 Authentication

### Login

```
POST /auth/login
```

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "role": "customer | cook | admin",
      "avatarUrl": "string | null",
      "isAdmin": "boolean",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    },
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 3600
  },
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO8601"
  }
}
```

---

### Register

```
POST /auth/register
```

**Request:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "role": "customer | cook"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "role": "customer | cook",
      "avatarUrl": null,
      "isAdmin": false,
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    },
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 3600
  },
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO8601"
  }
}
```

---

### Logout

```
POST /auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Request:** None

**Response:**
```json
{
  "data": null,
  "message": "Logged out successfully"
}
```

---

### Refresh Token

```
POST /auth/refresh
```

**Request:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 3600
  }
}
```

---

### Get Current User

```
GET /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "role": "customer | cook | admin",
    "avatarUrl": "string | null",
    "isAdmin": "boolean",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Forgot Password

```
POST /auth/forgot-password
```

**Request:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "data": null,
  "message": "Password reset email sent"
}
```

---

### Reset Password

```
POST /auth/reset-password
```

**Request:**
```json
{
  "token": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response:**
```json
{
  "data": null,
  "message": "Password reset successfully"
}
```

---

## 👤 Users

### Get User Profile

```
GET /users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "avatarUrl": "string | null",
    "role": "customer | cook | admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string | null",
      "postalCode": "string",
      "country": "string",
      "isDefault": "boolean"
    },
    "preferences": {
      "language": "ar | fr | en",
      "notifications": "boolean",
      "newsletter": "boolean"
    },
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Update User Profile

```
PATCH /users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "string (optional)",
  "phone": "string (optional)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string (optional)",
    "postalCode": "string",
    "country": "string",
    "isDefault": "boolean"
  },
  "preferences": {
    "language": "ar | fr | en",
    "notifications": "boolean",
    "newsletter": "boolean"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "avatarUrl": "string | null",
    "role": "customer | cook | admin",
    "address": { ... },
    "preferences": { ... },
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Upload Avatar

```
POST /users/avatar
```

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request:** FormData with `avatar` file

**Response:**
```json
{
  "data": {
    "avatarUrl": "string"
  }
}
```

---

### Delete Avatar

```
DELETE /users/avatar
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "Avatar deleted successfully"
}
```

---

### Get User by ID

```
GET /users/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "avatarUrl": "string | null",
    "role": "customer | cook | admin",
    "createdAt": "ISO8601"
  }
}
```

---

### Get User Addresses

```
GET /users/addresses
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "label": "string",
      "street": "string",
      "city": "string",
      "state": "string | null",
      "postalCode": "string | null",
      "country": "string",
      "isDefault": "boolean",
      "phone": "string | null",
      "instructions": "string | null",
      "latitude": "number | null",
      "longitude": "number | null",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  ]
}
```

---

### Create Address

```
POST /users/addresses
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "label": "string",
  "street": "string",
  "city": "string",
  "state": "string (optional)",
  "postalCode": "string (optional)",
  "country": "string",
  "isDefault": "boolean (optional)",
  "phone": "string (optional)",
  "instructions": "string (optional)",
  "latitude": "number (optional)",
  "longitude": "number (optional)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "label": "string",
    "street": "string",
    "city": "string",
    "state": "string | null",
    "postalCode": "string | null",
    "country": "string",
    "isDefault": "boolean",
    "phone": "string | null",
    "instructions": "string | null",
    "latitude": "number | null",
    "longitude": "number | null",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Update Address

```
PATCH /users/addresses/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request:** Same as Create Address (all fields optional)

**Response:** Same as Create Address

---

### Delete Address

```
DELETE /users/addresses/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "Address deleted successfully"
}
```

---

### Set Default Address

```
POST /users/addresses/:id/default
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "isDefault": true,
    ...
  }
}
```

---

### Get Favorites

```
GET /users/favorites
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "cookId": "uuid",
      "cook": {
        "id": "uuid",
        "name": "string",
        "arabicName": "string",
        "avatarUrl": "string | null",
        "location": "string",
        "arabicLocation": "string",
        "specialties": ["string"],
        "arabicSpecialties": ["string"],
        "rating": "number",
        "totalReviews": "number",
        "isVerified": "boolean"
      },
      "createdAt": "ISO8601"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### Add to Favorites

```
POST /users/favorites
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "cookId": "uuid"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "cookId": "uuid",
    "cook": { ... },
    "createdAt": "ISO8601"
  }
}
```

---

### Remove from Favorites

```
DELETE /users/favorites/:cookId
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "Removed from favorites"
}
```

---

### Check if Favorited

```
GET /users/favorites/:cookId/check
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "isFavorite": "boolean"
  }
}
```

---

## 👨‍🍳 Cooks

### Get All Cooks

```
GET /cooks
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| location | string | Filter by location |
| specialty | string | Filter by specialty |
| minRating | number | Minimum rating |
| isVerified | boolean | Filter verified cooks |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "arabicName": "string",
      "avatarUrl": "string | null",
      "location": "string",
      "arabicLocation": "string",
      "specialties": ["string"],
      "arabicSpecialties": ["string"],
      "rating": "number",
      "totalReviews": "number",
      "isVerified": "boolean"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### Get Cook by ID

```
GET /cooks/:id
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "string",
    "arabicName": "string",
    "email": "string",
    "phone": "string",
    "avatarUrl": "string | null",
    "bio": "string",
    "arabicBio": "string",
    "location": "string",
    "arabicLocation": "string",
    "specialties": ["string"],
    "arabicSpecialties": ["string"],
    "rating": "number",
    "totalReviews": "number",
    "totalOrders": "number",
    "isVerified": "boolean",
    "isActive": "boolean",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Get Cook's Dishes

```
GET /cooks/:id/dishes
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| category | string | Filter by category |

**Response:**
```json
{
  "data": [
    {
      "id": "number",
      "name": "string",
      "arabicName": "string",
      "price": "number",
      "imageUrl": "string",
      "category": "string",
      "arabicCategory": "string",
      "prepTime": "string",
      "serves": "string",
      "rating": "number",
      "totalReviews": "number",
      "cookName": "string",
      "arabicCookName": "string",
      "location": "string",
      "arabicLocation": "string"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Cook's Reviews

```
GET /cooks/:id/reviews
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "rating": "number",
      "comment": "string",
      "customerName": "string",
      "customerAvatarUrl": "string | null",
      "reply": "string | null",
      "createdAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

## 🍽️ Dishes

### Get All Dishes

```
GET /dishes
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| query | string | Search term |
| location | string | Filter by location |
| category | string | Filter by category |
| minPrice | number | Minimum price |
| maxPrice | number | Maximum price |
| minRating | number | Minimum rating |
| cookId | string | Filter by cook |
| sortBy | string | price, rating, newest |
| sortOrder | string | asc, desc |

**Response:**
```json
{
  "data": [
    {
      "id": "number",
      "name": "string",
      "arabicName": "string",
      "price": "number",
      "imageUrl": "string",
      "category": "string",
      "arabicCategory": "string",
      "prepTime": "string",
      "serves": "string",
      "rating": "number",
      "totalReviews": "number",
      "cookName": "string",
      "arabicCookName": "string",
      "location": "string",
      "arabicLocation": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### Get Dish by ID

```
GET /dishes/:id
```

**Response:**
```json
{
  "data": {
    "id": "number",
    "cookId": "uuid",
    "name": "string",
    "arabicName": "string",
    "description": "string",
    "arabicDescription": "string",
    "price": "number",
    "imageUrl": "string",
    "category": "string",
    "arabicCategory": "string",
    "ingredients": ["string"],
    "arabicIngredients": ["string"],
    "prepTime": "string",
    "serves": "string",
    "rating": "number",
    "totalReviews": "number",
    "isAvailable": "boolean",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601",
    "cook": {
      "id": "uuid",
      "name": "string",
      "arabicName": "string",
      "location": "string",
      "arabicLocation": "string",
      "avatarUrl": "string | null"
    }
  }
}
```

---

### Search Dishes

```
GET /dishes/search
```

**Query Parameters:** Same as Get All Dishes

**Response:** Same as Get All Dishes

---

### Get Categories

```
GET /dishes/categories
```

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "arabicName": "string",
      "icon": "string | null"
    }
  ]
}
```

---

### Create Dish (Cook Only)

```
POST /dishes
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "preparationTime": "number",
  "images": ["string"] (optional),
  "ingredients": ["string"] (optional),
  "isAvailable": "boolean (default: true)"
}
```

**Response:**
```json
{
  "data": {
    "id": "number",
    "name": "string",
    ...
  }
}
```

---

### Update Dish (Cook Only)

```
PATCH /dishes/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request:** Same as Create Dish (all fields optional)

**Response:** Same as Get Dish by ID

---

### Delete Dish (Cook Only)

```
DELETE /dishes/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "Dish deleted successfully"
}
```

---

## 📦 Orders

### Get All Orders

```
GET /orders
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | pending, confirmed, preparing, ready, delivered, cancelled |
| cookId | string | Filter by cook |
| customerId | string | Filter by customer |
| startDate | string | Filter from date (ISO8601) |
| endDate | string | Filter to date (ISO8601) |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "customerName": "string",
      "cookName": "string",
      "totalPrice": "number",
      "status": "pending | confirmed | preparing | ready | delivered | cancelled",
      "itemCount": "number",
      "orderDate": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Order by ID

```
GET /orders/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "customerId": "uuid",
    "customerName": "string",
    "customerEmail": "string",
    "customerPhone": "string",
    "cookId": "uuid",
    "cookName": "string",
    "items": [
      {
        "id": "number",
        "dishId": "number",
        "name": "string",
        "arabicName": "string",
        "price": "number",
        "quantity": "number",
        "subtotal": "number"
      }
    ],
    "totalPrice": "number",
    "status": "pending | confirmed | preparing | ready | delivered | cancelled",
    "deliveryAddress": "string",
    "notes": "string | null",
    "orderDate": "ISO8601",
    "confirmedAt": "ISO8601 | null",
    "preparedAt": "ISO8601 | null",
    "deliveredAt": "ISO8601 | null",
    "cancelledAt": "ISO8601 | null",
    "cancellationReason": "string | null",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Get Order History

```
GET /orders/history
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |

**Response:** Same as Get All Orders

---

### Create Order

```
POST /orders
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "cookId": "uuid",
  "items": [
    {
      "dishId": "number",
      "quantity": "number"
    }
  ],
  "deliveryAddress": "string",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "customerId": "uuid",
    "cookId": "uuid",
    "items": [ ... ],
    "totalPrice": "number",
    "status": "pending",
    "deliveryAddress": "string",
    "notes": "string | null",
    "orderDate": "ISO8601",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Update Order Status

```
PATCH /orders/:id/status
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "status": "pending | confirmed | preparing | ready | delivered | cancelled",
  "reason": "string (required for cancellation)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "confirmedAt": "ISO8601",
    ...
  }
}
```

---

## 📝 Applications

### Get All Applications (Admin)

```
GET /applications
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | pending, approved, rejected |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "fullName": "string",
      "email": "string",
      "location": "string",
      "status": "pending | approved | rejected",
      "createdAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Application by ID

```
GET /applications/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "profileId": "uuid",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "specialties": "string",
    "experience": "string",
    "status": "pending | approved | rejected",
    "reviewedBy": "uuid | null",
    "reviewedAt": "ISO8601 | null",
    "rejectionReason": "string | null",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Create Application

```
POST /applications
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "specialties": "string",
  "experience": "string"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "specialties": "string",
    "experience": "string",
    "status": "pending",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Review Application (Admin)

```
POST /applications/:id/review
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Request:**
```json
{
  "status": "approved | rejected",
  "reason": "string (required for rejection)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "status": "approved | rejected",
    "reviewedBy": "uuid",
    "reviewedAt": "ISO8601",
    "rejectionReason": "string | null",
    ...
  }
}
```

---

## 💬 Conversations

### Get All Conversations

```
GET /conversations
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "cookId": "uuid",
      "cookName": "string",
      "cookAvatarUrl": "string | null",
      "customerId": "uuid",
      "customerName": "string",
      "customerAvatarUrl": "string | null",
      "dishName": "string",
      "lastMessage": "string | null",
      "lastMessageAt": "ISO8601 | null",
      "unreadCount": "number",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Conversation by ID

```
GET /conversations/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "cookId": "uuid",
    "cookName": "string",
    "cookAvatarUrl": "string | null",
    "customerId": "uuid",
    "customerName": "string",
    "customerAvatarUrl": "string | null",
    "dishName": "string",
    "lastMessage": "string | null",
    "lastMessageAt": "ISO8601 | null",
    "unreadCount": "number",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Get Conversation Messages

```
GET /conversations/:id/messages
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "conversationId": "uuid",
      "senderId": "uuid",
      "senderName": "string",
      "senderAvatarUrl": "string | null",
      "content": "string",
      "isOrder": "boolean",
      "isRead": "boolean",
      "createdAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Send Message

```
POST /conversations/:id/messages
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "content": "string",
  "isOrder": "boolean (optional, default: false)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "senderName": "string",
    "senderAvatarUrl": "string | null",
    "content": "string",
    "isOrder": "boolean",
    "isRead": false,
    "createdAt": "ISO8601"
  }
}
```

---

### Create Conversation

```
POST /conversations
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "cookId": "uuid",
  "dishName": "string",
  "initialMessage": "string (optional)"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "cookId": "uuid",
    "cookName": "string",
    "customerId": "uuid",
    "customerName": "string",
    "dishName": "string",
    "unreadCount": 0,
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

## ⭐ Reviews

### Get All Reviews

```
GET /reviews
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| cookId | string | Filter by cook |
| customerId | string | Filter by customer |
| minRating | number | Minimum rating |
| maxRating | number | Maximum rating |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "rating": "number",
      "comment": "string",
      "customerName": "string",
      "customerAvatarUrl": "string | null",
      "reply": "string | null",
      "createdAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Review by ID

```
GET /reviews/:id
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "orderId": "uuid",
    "cookId": "uuid",
    "cookName": "string",
    "customerId": "uuid",
    "customerName": "string",
    "customerAvatarUrl": "string | null",
    "rating": "number",
    "comment": "string",
    "reply": "string | null",
    "repliedAt": "ISO8601 | null",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Get Cook Review Stats

```
GET /cooks/:cookId/reviews/stats
```

**Response:**
```json
{
  "data": {
    "averageRating": "number",
    "totalReviews": "number",
    "ratingDistribution": {
      "1": "number",
      "2": "number",
      "3": "number",
      "4": "number",
      "5": "number"
    }
  }
}
```

---

### Create Review

```
POST /reviews
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "orderId": "uuid",
  "cookId": "uuid",
  "rating": "number (1-5)",
  "comment": "string"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "orderId": "uuid",
    "cookId": "uuid",
    "customerId": "uuid",
    "rating": "number",
    "comment": "string",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
}
```

---

### Reply to Review (Cook Only)

```
POST /reviews/:id/reply
```

**Headers:** `Authorization: Bearer <token>` (Cook only)

**Request:**
```json
{
  "reply": "string"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "reply": "string",
    "repliedAt": "ISO8601",
    ...
  }
}
```

---

### Delete Review

```
DELETE /reviews/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "Review deleted successfully"
}
```

---

## 🔔 Notifications

### Get All Notifications

```
GET /notifications
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "order_new | order_status | order_cancelled | message | review | application_status | system",
      "title": "string",
      "message": "string",
      "isRead": "boolean",
      "createdAt": "ISO8601"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Notification by ID

```
GET /notifications/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "type": "order_new | order_status | order_cancelled | message | review | application_status | system",
    "title": "string",
    "message": "string",
    "data": { ... },
    "isRead": "boolean",
    "createdAt": "ISO8601"
  }
}
```

---

### Mark Notifications as Read

```
POST /notifications/mark-read
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "notificationIds": ["uuid", "uuid"]
}
```

**Response:**
```json
{
  "data": null,
  "message": "Notifications marked as read"
}
```

---

### Mark All as Read

```
POST /notifications/mark-all-read
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": null,
  "message": "All notifications marked as read"
}
```

---

### Get Unread Count

```
GET /notifications/unread-count
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "count": "number"
  }
}
```

---

### Get Notification Preferences

```
GET /notifications/preferences
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "orderUpdates": "boolean",
    "messages": "boolean",
    "reviews": "boolean",
    "promotions": "boolean",
    "email": "boolean",
    "push": "boolean"
  }
}
```

---

### Update Notification Preferences

```
PATCH /notifications/preferences
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "orderUpdates": "boolean (optional)",
  "messages": "boolean (optional)",
  "reviews": "boolean (optional)",
  "promotions": "boolean (optional)",
  "email": "boolean (optional)",
  "push": "boolean (optional)"
}
```

**Response:**
```json
{
  "data": {
    "orderUpdates": "boolean",
    "messages": "boolean",
    "reviews": "boolean",
    "promotions": "boolean",
    "email": "boolean",
    "push": "boolean"
  }
}
```

---

## 🔧 Admin

### Get Admin Stats

```
GET /admin/stats
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:**
```json
{
  "data": {
    "totalUsers": "number",
    "totalCooks": "number",
    "totalOrders": "number",
    "totalRevenue": "number",
    "pendingApplications": "number",
    "activeOrders": "number",
    "newUsersToday": "number",
    "ordersToday": "number"
  }
}
```

---

### Get All Users (Admin)

```
GET /admin/users
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| role | string | customer, cook, admin |
| status | string | active, suspended, deleted |
| search | string | Search by name/email |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "avatar": "string | null",
      "role": "customer | cook | admin",
      "status": "active | suspended | deleted",
      "createdAt": "ISO8601",
      "lastLoginAt": "ISO8601 | null",
      "ordersCount": "number"
    }
  ],
  "pagination": { ... }
}
```

---

### Get User by ID (Admin)

```
GET /admin/users/:id
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "avatar": "string | null",
    "role": "customer | cook | admin",
    "status": "active | suspended | deleted",
    "createdAt": "ISO8601",
    "lastLoginAt": "ISO8601 | null",
    "ordersCount": "number"
  }
}
```

---

### Suspend User (Admin)

```
POST /admin/users/:id/suspend
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Request:**
```json
{
  "reason": "string (optional)"
}
```

**Response:**
```json
{
  "data": null,
  "message": "User suspended successfully"
}
```

---

### Activate User (Admin)

```
POST /admin/users/:id/activate
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:**
```json
{
  "data": null,
  "message": "User activated successfully"
}
```

---

### Delete User (Admin)

```
DELETE /admin/users/:id
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:**
```json
{
  "data": null,
  "message": "User deleted successfully"
}
```

---

### Get All Orders (Admin)

```
GET /admin/orders
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | Order status filter |
| cookId | string | Filter by cook |
| customerId | string | Filter by customer |
| dateFrom | string | Start date (ISO8601) |
| dateTo | string | End date (ISO8601) |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "customerId": "uuid",
      "customerName": "string",
      "cookId": "uuid",
      "cookName": "string",
      "status": "string",
      "totalAmount": "number",
      "createdAt": "ISO8601",
      "items": "number"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Analytics (Admin)

```
GET /admin/analytics
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| from | string | Start date (ISO8601) |
| to | string | End date (ISO8601) |

**Response:**
```json
{
  "data": {
    "ordersPerDay": [
      {
        "date": "string",
        "count": "number",
        "revenue": "number"
      }
    ],
    "topCooks": [
      {
        "id": "uuid",
        "name": "string",
        "orders": "number",
        "revenue": "number"
      }
    ],
    "topDishes": [
      {
        "id": "number",
        "name": "string",
        "orders": "number"
      }
    ],
    "userGrowth": [
      {
        "date": "string",
        "users": "number"
      }
    ]
  }
}
```

---

## 📌 Common Response Formats

### Success Response

```json
{
  "data": { ... },
  "message": "string (optional)",
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO8601"
  }
}
```

### Paginated Response

```json
{
  "data": [ ... ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

### Error Response

```json
{
  "message": "string",
  "code": "string (optional)",
  "status": "number",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

---

## 🔑 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
