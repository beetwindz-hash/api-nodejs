# Reviews API Documentation

## Overview

The Reviews API manages customer reviews and ratings for cooks and their services.

**Base URL**: `/api/reviews`

---

## Endpoints

### 1. Get All Reviews

**GET** `/api/reviews`

Get reviews with optional filters.

#### Query Parameters

- `cookId` (string, optional): Filter by cook
- `customerId` (string, optional): Filter by customer
- `minRating` (number, optional): Minimum rating (1-5)
- `maxRating` (number, optional): Maximum rating (1-5)
- `page` (number, optional): Page number
- `limit` (number, optional): Results per page (1-100)

#### Example Request

```
GET /api/reviews?cookId=507f1f77bcf86cd799439011&minRating=4&page=1&limit=20
```

#### Success Response (200 OK)

```json
{
  "data": {
    "reviews": [
      {
        "id": "507f1f77bcf86cd799439015",
        "orderId": "507f1f77bcf86cd799439016",
        "cookId": "507f1f77bcf86cd799439011",
        "customerId": "507f1f77bcf86cd799439012",
        "rating": 5,
        "comment": "Excellent food! The couscous was authentic and delicious.",
        "reply": "Thank you so much for your kind words!",
        "repliedAt": "2026-01-15T15:00:00.000Z",
        "createdAt": "2026-01-15T14:00:00.000Z",
        "updatedAt": "2026-01-15T15:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 95,
      "totalPages": 5
    }
  }
}
```

---

### 2. Get Review by ID

**GET** `/api/reviews/:id`

Get a specific review.

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "orderId": "507f1f77bcf86cd799439016",
    "cookId": "507f1f77bcf86cd799439011",
    "customerId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "Excellent food! The couscous was authentic and delicious.",
    "reply": "Thank you so much for your kind words!",
    "repliedAt": "2026-01-15T15:00:00.000Z",
    "createdAt": "2026-01-15T14:00:00.000Z",
    "updatedAt": "2026-01-15T15:00:00.000Z"
  }
}
```

---

### 3. Create Review

**POST** `/api/reviews`

Create a review for a completed order (customer only).

#### Headers

```
Authorization: Bearer <customer_access_token>
```

#### Request Body

```json
{
  "orderId": "507f1f77bcf86cd799439016",
  "cookId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Excellent food! The couscous was authentic and delicious. Will definitely order again!"
}
```

#### Fields

- `orderId` (string, required): Order ID being reviewed
- `cookId` (string, required): Cook ID (must match order)
- `rating` (number, required): Rating from 1-5
- `comment` (string, required): Review text (3-2000 characters)

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "orderId": "507f1f77bcf86cd799439016",
    "cookId": "507f1f77bcf86cd799439011",
    "customerId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "Excellent food! The couscous was authentic and delicious. Will definitely order again!",
    "reply": null,
    "repliedAt": null,
    "createdAt": "2026-01-15T14:00:00.000Z",
    "updatedAt": "2026-01-15T14:00:00.000Z"
  }
}
```

#### Error Responses

- **403 Forbidden**: Can only review own orders, or already reviewed
- **404 Not Found**: Order or cook not found

---

### 4. Reply to Review

**POST** `/api/reviews/:id/reply`

Reply to a review (cook only, owner of review).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "reply": "Thank you so much for your kind words! We're glad you enjoyed the couscous. Looking forward to serving you again!"
}
```

#### Fields

- `reply` (string, required): Reply text (1-2000 characters)

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "orderId": "507f1f77bcf86cd799439016",
    "cookId": "507f1f77bcf86cd799439011",
    "customerId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "Excellent food! The couscous was authentic and delicious.",
    "reply": "Thank you so much for your kind words! We're glad you enjoyed the couscous. Looking forward to serving you again!",
    "repliedAt": "2026-01-15T15:00:00.000Z",
    "createdAt": "2026-01-15T14:00:00.000Z",
    "updatedAt": "2026-01-15T15:00:00.000Z"
  }
}
```

#### Error Responses

- **403 Forbidden**: Can only reply to reviews for your restaurant
- **404 Not Found**: Review not found

---

### 5. Delete Review

**DELETE** `/api/reviews/:id`

Delete a review (owner only).

#### Headers

```
Authorization: Bearer <customer_access_token>
```

#### Success Response (204 No Content)

#### Error Responses

- **403 Forbidden**: Can only delete own reviews
- **404 Not Found**: Review not found

---

### 6. Get Cook Reviews

**GET** `/api/cooks/:id/reviews`

Get all reviews for a specific cook.

#### Query Parameters

- `page` (number, optional): Page number
- `limit` (number, optional): Results per page

#### Example Request

```
GET /api/cooks/507f1f77bcf86cd799439011/reviews?page=1&limit=10
```

#### Success Response (200 OK)

```json
{
  "data": {
    "reviews": [
      {
        "id": "507f1f77bcf86cd799439015",
        "orderId": "507f1f77bcf86cd799439016",
        "cookId": "507f1f77bcf86cd799439011",
        "customerId": "507f1f77bcf86cd799439012",
        "rating": 5,
        "comment": "Excellent food!",
        "reply": "Thank you!",
        "repliedAt": "2026-01-15T15:00:00.000Z",
        "createdAt": "2026-01-15T14:00:00.000Z",
        "updatedAt": "2026-01-15T15:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 120,
      "totalPages": 12
    }
  }
}
```

---

### 7. Get Cook Review Statistics

**GET** `/api/cooks/:cookId/reviews/stats`

Get aggregated review statistics for a cook.

#### Example Request

```
GET /api/cooks/507f1f77bcf86cd799439011/reviews/stats
```

#### Success Response (200 OK)

```json
{
  "data": {
    "averageRating": 4.65,
    "totalReviews": 120,
    "ratingDistribution": {
      "1": 2,
      "2": 3,
      "3": 10,
      "4": 35,
      "5": 70
    }
  }
}
```

#### Response Fields

- `averageRating` (number): Average rating (0-5)
- `totalReviews` (number): Total number of reviews
- `ratingDistribution` (object): Count of reviews by rating (1-5)

---

## Review Rules

### Who Can Review

- Only customers who have completed orders with the cook
- One review per order
- Cannot review the same order twice

### Who Can Reply

- Only the cook who received the review
- One reply per review
- Reply can be updated but not deleted

### Who Can Delete

- Customers can delete their own reviews
- Admins can delete any review

---

## Rating System

### Rating Scale

- **5 stars**: Excellent
- **4 stars**: Very Good
- **3 stars**: Good
- **2 stars**: Fair
- **1 star**: Poor

### Impact on Cook Rating

- Cook's overall rating is calculated as the average of all their reviews
- Total reviews count is displayed alongside the rating
- Rating distribution shows breakdown of 1-5 star reviews

---

## Validation Rules

- **Rating**: Integer between 1-5 (required)
- **Comment**: 3-2000 characters (required)
- **Reply**: 1-2000 characters (required when replying)

---

## Best Practices

### For Customers

- Be honest and constructive
- Review food quality, delivery, and service
- Include specific details
- Update or delete review if issues are resolved

### For Cooks

- Respond professionally and promptly
- Thank customers for positive reviews
- Address concerns in negative reviews
- Keep replies concise and helpful

---

## Notes

- Reviews are public and visible to all users
- Review creation updates the cook's overall rating
- Deleting a review recalculates the cook's rating
- Reviews can only be created after order is delivered
