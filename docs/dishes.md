# Dishes API Documentation

## Overview

The Dishes API manages dish listings, including creation, updates, pricing, images, and availability.

**Base URL**: `/api/dishes`

---

## Endpoints

### 1. Search Dishes

**GET** `/api/dishes/search`

Search for dishes with various filters.

#### Query Parameters

- `cookId` (string, optional): Filter by cook
- `category` (string, optional): appetizer, main_course, dessert, beverage, snack, side_dish
- `cuisine` (string, optional): algerian, french, italian, mediterranean, international, other
- `minPrice` (number, optional): Minimum price
- `maxPrice` (number, optional): Maximum price
- `spiceLevel` (string, optional): none, mild, medium, hot, very_hot
- `isVegetarian` (boolean, optional): Vegetarian filter
- `isVegan` (boolean, optional): Vegan filter
- `isGlutenFree` (boolean, optional): Gluten-free filter
- `isDairyFree` (boolean, optional): Dairy-free filter
- `isHalal` (boolean, optional): Halal filter
- `minRating` (number, optional): Minimum rating (0-5)
- `tags` (string[], optional): Filter by tags
- `search` (string, optional): Text search in name/description
- `sort` (string, optional): newest, popular, rating, price_low, price_high
- `page` (number, optional): Page number
- `limit` (number, optional): Results per page (1-100)

#### Example Request

```
GET /api/dishes/search?category=main_course&cuisine=algerian&isHalal=true&sort=rating&page=1&limit=20
```

#### Success Response (200 OK)

```json
{
  "data": {
    "dishes": [
      {
        "id": "507f1f77bcf86cd799439011",
        "cookId": "507f1f77bcf86cd799439012",
        "name": "Traditional Couscous",
        "description": "Authentic Algerian couscous with vegetables and meat",
        "category": "main_course",
        "cuisine": "algerian",
        "price": 1200,
        "originalPrice": 1500,
        "preparationTime": 45,
        "servings": 4,
        "portionSize": "large",
        "spiceLevel": "mild",
        "images": [
          "https://example.com/couscous1.jpg",
          "https://example.com/couscous2.jpg"
        ],
        "ingredients": ["Couscous", "Lamb", "Chickpeas", "Vegetables"],
        "dietaryInfo": {
          "isVegetarian": false,
          "isVegan": false,
          "isGlutenFree": false,
          "isDairyFree": true,
          "isNutFree": true,
          "isHalal": true,
          "allergens": [],
          "calories": 650
        },
        "nutritionalInfo": {
          "calories": 650,
          "protein": 35,
          "carbs": 75,
          "fat": 20,
          "fiber": 12,
          "sugar": 8,
          "sodium": 800
        },
        "tags": ["traditional", "family-meal"],
        "isAvailable": true,
        "status": "active",
        "rating": 4.8,
        "totalReviews": 95,
        "totalOrders": 340,
        "viewCount": 1250,
        "featured": true,
        "discountPercentage": 20,
        "canOrder": true,
        "createdAt": "2026-01-01T10:00:00.000Z",
        "updatedAt": "2026-01-15T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

### 2. Get Dish by ID

**GET** `/api/dishes/:id`

Get detailed dish information.

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cookId": "507f1f77bcf86cd799439012",
    "name": "Traditional Couscous",
    "description": "Authentic Algerian couscous with vegetables and meat",
    "category": "main_course",
    "cuisine": "algerian",
    "price": 1200,
    "originalPrice": 1500,
    "preparationTime": 45,
    "servings": 4,
    "portionSize": "large",
    "spiceLevel": "mild",
    "images": ["https://example.com/couscous1.jpg"],
    "ingredients": ["Couscous", "Lamb", "Chickpeas", "Vegetables"],
    "dietaryInfo": {...},
    "nutritionalInfo": {...},
    "tags": ["traditional", "family-meal"],
    "isAvailable": true,
    "status": "active",
    "maxOrdersPerDay": 20,
    "currentOrdersToday": 5,
    "rating": 4.8,
    "totalReviews": 95,
    "totalOrders": 340,
    "viewCount": 1251,
    "cook": {
      "id": "507f1f77bcf86cd799439012",
      "businessName": "Chef's Kitchen",
      "rating": 4.5,
      "totalReviews": 120,
      "location": {
        "address": "123 Main St",
        "city": "Algiers",
        "country": "Algeria"
      }
    }
  }
}
```

---

### 3. Create Dish

**POST** `/api/dishes`

Create a new dish (cook only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "name": "Traditional Couscous",
  "description": "Authentic Algerian couscous with vegetables and meat",
  "category": "main_course",
  "cuisine": "algerian",
  "price": 1200,
  "originalPrice": 1500,
  "preparationTime": 45,
  "servings": 4,
  "portionSize": "large",
  "spiceLevel": "mild",
  "ingredients": ["Couscous", "Lamb", "Chickpeas", "Vegetables", "Spices"],
  "dietaryInfo": {
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "isNutFree": true,
    "isHalal": true,
    "allergens": [],
    "calories": 650
  },
  "nutritionalInfo": {
    "calories": 650,
    "protein": 35,
    "carbs": 75,
    "fat": 20,
    "fiber": 12,
    "sugar": 8,
    "sodium": 800
  },
  "tags": ["traditional", "family-meal"],
  "maxOrdersPerDay": 20
}
```

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "status": "draft",
    "isAvailable": false,
    ...
  },
  "message": "Dish created successfully"
}
```

---

### 4. Get My Dishes

**GET** `/api/dishes/my/dishes`

Get all dishes created by authenticated cook.

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Query Parameters

- `page` (number, optional): Page number
- `limit` (number, optional): Results per page

#### Success Response (200 OK)

```json
{
  "data": {
    "dishes": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

### 5. Update Dish

**PATCH** `/api/dishes/:id`

Update dish details (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "name": "Updated Couscous",
  "description": "Updated description",
  "category": "main_course",
  "cuisine": "algerian",
  "preparationTime": 50,
  "servings": 6,
  "portionSize": "family",
  "spiceLevel": "medium"
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Dish updated successfully"
}
```

---

### 6. Update Pricing

**PATCH** `/api/dishes/:id/pricing`

Update dish price (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "price": 1300,
  "originalPrice": 1600
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Pricing updated successfully"
}
```

---

### 7. Upload Dish Image

**POST** `/api/dishes/:id/images`

Upload dish image (cook owner only, max 5 images).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "images": ["https://example.com/dish1.jpg", "https://example.com/dish2.jpg"]
  },
  "message": "Image uploaded successfully"
}
```

---

### 8. Delete Dish Image

**DELETE** `/api/dishes/:id/images`

Delete a dish image (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "imageUrl": "https://example.com/dish1.jpg"
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Image deleted successfully"
}
```

---

### 9. Update Ingredients

**PATCH** `/api/dishes/:id/ingredients`

Update dish ingredients (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "ingredients": [
    "Couscous",
    "Lamb",
    "Chickpeas",
    "Vegetables",
    "Spices",
    "Olive Oil"
  ]
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Ingredients updated successfully"
}
```

---

### 10. Update Dietary Info

**PATCH** `/api/dishes/:id/dietary-info`

Update dietary information (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "isVegetarian": false,
  "isVegan": false,
  "isGlutenFree": false,
  "isDairyFree": true,
  "isNutFree": true,
  "isHalal": true,
  "allergens": [],
  "calories": 650
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Dietary info updated successfully"
}
```

---

### 11. Publish Dish

**POST** `/api/dishes/:id/publish`

Publish dish (make it active and available for orders).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "status": "active",
    "isAvailable": true,
    ...
  },
  "message": "Dish published successfully"
}
```

#### Requirements for Publishing

- At least one image
- Complete description (min 10 characters)
- Valid price
- Preparation time specified
- At least one ingredient

---

### 12. Toggle Availability

**PATCH** `/api/dishes/:id/availability`

Toggle dish availability (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "isAvailable": false
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Availability updated successfully"
}
```

---

### 13. Delete Dish

**DELETE** `/api/dishes/:id`

Delete a dish (cook owner only).

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Dish deleted successfully"
}
```

---

## Field Definitions

### Categories

- `appetizer`, `main_course`, `dessert`, `beverage`, `snack`, `side_dish`

### Portion Sizes

- `small`, `medium`, `large`, `family`

### Spice Levels

- `none`, `mild`, `medium`, `hot`, `very_hot`

### Status

- `draft`: Not published
- `active`: Available for orders
- `inactive`: Temporarily unavailable
- `out_of_stock`: Sold out

---

## Validation Rules

- **Name**: 3-100 characters
- **Description**: 10-2000 characters
- **Price**: Greater than 0
- **Preparation Time**: 1-300 minutes
- **Servings**: 1-20
- **Ingredients**: 1-50 items
- **Images**: Maximum 5 images per dish
