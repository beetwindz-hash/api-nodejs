# Cooks API Documentation

## Overview

The Cooks API manages cook profiles, including registration, verification, location, delivery settings, and availability.

**Base URL**: `/api/cooks`

---

## Endpoints

### 1. Search Cooks

**GET** `/api/cooks/search`

Search for cooks with filters.

#### Query Parameters

- `cuisines` (string[], optional): Filter by cuisine types (algerian, french, italian, mediterranean, international, other)
- `city` (string, optional): Filter by city
- `maxDistance` (number, optional): Maximum distance in km (0.1-50)
- `minRating` (number, optional): Minimum rating (0-5)
- `latitude` (number, optional): User's latitude for distance calculation
- `longitude` (number, optional): User's longitude for distance calculation
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 10)

#### Example Request

```
GET /api/cooks/search?cuisines=algerian&city=Algiers&minRating=4&page=1&limit=10
```

#### Success Response (200 OK)

```json
{
  "data": {
    "cooks": [
      {
        "id": "507f1f77bcf86cd799439011",
        "userId": "507f1f77bcf86cd799439012",
        "bio": "Passionate about traditional Algerian cuisine",
        "cuisines": ["algerian", "mediterranean"],
        "specialties": ["Couscous", "Tajine"],
        "yearsOfExperience": 10,
        "certifications": ["Food Safety Certificate"],
        "businessName": "Chef's Kitchen",
        "phoneNumber": "+213555123456",
        "location": {
          "address": "123 Main St",
          "city": "Algiers",
          "country": "Algeria",
          "coordinates": {
            "type": "Point",
            "coordinates": [3.0588, 36.7538]
          }
        },
        "deliveryRadius": 10,
        "deliveryFee": 300,
        "minimumOrder": 1500,
        "availability": [...],
        "status": "active",
        "rating": 4.5,
        "totalReviews": 120,
        "totalOrders": 450,
        "isVerified": true,
        "verifiedAt": "2026-01-10T10:00:00.000Z",
        "createdAt": "2026-01-01T10:00:00.000Z",
        "updatedAt": "2026-01-15T10:00:00.000Z"
      }
    ],
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

### 2. Get Cook Profile by ID

**GET** `/api/cooks/:id`

Get detailed cook profile.

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "bio": "Passionate about traditional Algerian cuisine",
    "cuisines": ["algerian", "mediterranean"],
    "specialties": ["Couscous", "Tajine"],
    "yearsOfExperience": 10,
    "certifications": ["Food Safety Certificate"],
    "businessName": "Chef's Kitchen",
    "phoneNumber": "+213555123456",
    "location": {
      "address": "123 Main St",
      "city": "Algiers",
      "state": "Algiers",
      "postalCode": "16000",
      "country": "Algeria",
      "coordinates": {
        "type": "Point",
        "coordinates": [3.0588, 36.7538]
      }
    },
    "deliveryRadius": 10,
    "deliveryFee": 300,
    "minimumOrder": 1500,
    "availability": [
      {
        "day": "monday",
        "startTime": "09:00",
        "endTime": "17:00",
        "isAvailable": true
      }
    ],
    "status": "active",
    "rating": 4.5,
    "totalReviews": 120,
    "totalOrders": 450,
    "isVerified": true,
    "user": {
      "id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "cook@example.com",
      "avatarUrl": "https://example.com/avatar.jpg"
    }
  }
}
```

---

### 3. Create Cook Profile

**POST** `/api/cooks/profile`

Create a new cook profile (cook role required).

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "bio": "Passionate about traditional Algerian cuisine",
  "cuisines": ["algerian", "mediterranean"],
  "specialties": ["Couscous", "Tajine"],
  "yearsOfExperience": 10,
  "certifications": ["Food Safety Certificate"],
  "businessName": "Chef's Kitchen",
  "businessLicense": "BL123456",
  "phoneNumber": "+213555123456",
  "location": {
    "address": "123 Main St",
    "city": "Algiers",
    "state": "Algiers",
    "postalCode": "16000",
    "country": "Algeria",
    "latitude": 36.7538,
    "longitude": 3.0588
  },
  "deliveryRadius": 10,
  "deliveryFee": 300,
  "minimumOrder": 1500,
  "availability": [
    {
      "day": "monday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    }
  ]
}
```

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "status": "pending",
    ...
  },
  "message": "Cook profile created successfully"
}
```

#### Error Responses

- **400 Bad Request**: User must have cook role
- **409 Conflict**: Cook profile already exists

---

### 4. Get My Cook Profile

**GET** `/api/cooks/profile/me`

Get authenticated cook's profile.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

---

### 5. Update Cook Profile

**PATCH** `/api/cooks/profile`

Update cook profile information.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "bio": "Updated bio",
  "cuisines": ["algerian", "french"],
  "specialties": ["Couscous", "Tajine", "Merguez"],
  "yearsOfExperience": 12,
  "businessName": "Updated Chef's Kitchen",
  "phoneNumber": "+213555654321"
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    ...
  },
  "message": "Profile updated successfully"
}
```

---

### 6. Update Location

**PATCH** `/api/cooks/location`

Update cook's location.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "address": "456 New St",
  "city": "Oran",
  "state": "Oran",
  "postalCode": "31000",
  "country": "Algeria",
  "latitude": 35.6969,
  "longitude": -0.6331
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Location updated successfully"
}
```

---

### 7. Update Delivery Settings

**PATCH** `/api/cooks/delivery-settings`

Update delivery configuration.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "deliveryRadius": 15,
  "deliveryFee": 400,
  "minimumOrder": 2000
}
```

#### Success Response (200 OK)

```json
{
  "data": {...},
  "message": "Delivery settings updated successfully"
}
```

---

### 8. Update Availability

**PATCH** `/api/cooks/availability`

Update weekly availability schedule.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "availability": [
    {
      "day": "monday",
      "startTime": "08:00",
      "endTime": "18:00",
      "isAvailable": true
    },
    {
      "day": "tuesday",
      "startTime": "08:00",
      "endTime": "18:00",
      "isAvailable": true
    },
    {
      "day": "sunday",
      "startTime": "00:00",
      "endTime": "00:00",
      "isAvailable": false
    }
  ]
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

### 9. Verify Cook (Admin Only)

**POST** `/api/cooks/:id/verify`

Verify a cook's profile.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "isVerified": true,
    "status": "active",
    "verifiedAt": "2026-01-15T10:30:00.000Z"
  },
  "message": "Cook verified successfully"
}
```

---

## Field Definitions

### Cuisine Types

- `algerian`
- `french`
- `italian`
- `mediterranean`
- `international`
- `other`

### Cook Status

- `pending`: Awaiting verification
- `active`: Verified and accepting orders
- `suspended`: Temporarily disabled
- `inactive`: Not accepting orders

### Days of Week

- `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`

### Time Format

- 24-hour format: `HH:MM` (e.g., "09:00", "17:30")

---

## Validation Rules

- **Delivery Radius**: 0.1-50 km
- **Years of Experience**: 0-100
- **Phone Number**: At least 10 digits
- **Availability**: At least one slot required, start time must be before end time
