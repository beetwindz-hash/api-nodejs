# Users API Documentation

## Overview

The Users API manages user profiles and delivery addresses.

**Base URL**: `/api/users`

---

## Endpoints

### 1. Get My Profile

**GET** `/api/users/profile`

Get authenticated user's profile.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+213555123456",
    "avatarUrl": "https://example.com/avatar.jpg",
    "role": "customer",
    "address": {
      "street": "123 Main St",
      "city": "Algiers",
      "state": "Algiers",
      "postalCode": "16000",
      "country": "Algeria",
      "isDefault": true,
      "phone": "+213555123456",
      "instructions": "Second floor",
      "latitude": 36.7538,
      "longitude": 3.0588
    },
    "preferences": {
      "language": "en",
      "notifications": true,
      "newsletter": false
    },
    "createdAt": "2026-01-01T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

---

### 2. Update Profile

**PATCH** `/api/users/profile`

Update user profile information.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "name": "John Smith",
  "phone": "+213555654321",
  "address": {
    "street": "456 New St",
    "city": "Oran",
    "state": "Oran",
    "postalCode": "31000",
    "country": "Algeria",
    "isDefault": true,
    "phone": "+213555654321",
    "instructions": "Third floor, apartment 5",
    "latitude": 35.6969,
    "longitude": -0.6331
  },
  "preferences": {
    "language": "fr",
    "notifications": true,
    "newsletter": true
  }
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    ...
  },
  "message": "Profile updated successfully"
}
```

---

### 3. Upload Avatar

**POST** `/api/users/avatar`

Upload user avatar image.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

Form-data with image file

#### Success Response (200 OK)

```json
{
  "data": {
    "avatarUrl": "https://example.com/avatars/user123.jpg"
  },
  "message": "Avatar uploaded successfully"
}
```

---

### 4. Delete Avatar

**DELETE** `/api/users/avatar`

Remove user avatar.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Avatar deleted successfully"
}
```

---

### 5. Get All Addresses

**GET** `/api/users/addresses`

Get all delivery addresses for authenticated user.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439012",
      "label": "Home",
      "street": "123 Main St",
      "city": "Algiers",
      "state": "Algiers",
      "postalCode": "16000",
      "country": "Algeria",
      "isDefault": true,
      "phone": "+213555123456",
      "instructions": "Second floor",
      "latitude": 36.7538,
      "longitude": 3.0588,
      "createdAt": "2026-01-01T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439012",
      "label": "Office",
      "street": "789 Work Ave",
      "city": "Algiers",
      "state": "Algiers",
      "postalCode": "16001",
      "country": "Algeria",
      "isDefault": false,
      "phone": "+213555123456",
      "instructions": "Reception desk",
      "latitude": 36.764,
      "longitude": 3.06,
      "createdAt": "2026-01-05T14:00:00.000Z",
      "updatedAt": "2026-01-05T14:00:00.000Z"
    }
  ]
}
```

---

### 6. Create Address

**POST** `/api/users/addresses`

Add a new delivery address.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "label": "Home",
  "street": "123 Main St",
  "city": "Algiers",
  "state": "Algiers",
  "postalCode": "16000",
  "country": "Algeria",
  "isDefault": true,
  "phone": "+213555123456",
  "instructions": "Second floor, ring twice",
  "latitude": 36.7538,
  "longitude": 3.0588
}
```

#### Fields

- `label` (string, required): Address label (e.g., "Home", "Office")
- `street` (string, required): Street address
- `city` (string, required): City name
- `state` (string, optional): State/Province
- `postalCode` (string, optional): Postal code
- `country` (string, required): Country name
- `isDefault` (boolean, optional): Set as default address
- `phone` (string, optional): Contact phone for this address
- `instructions` (string, optional): Delivery instructions
- `latitude` (number, optional): GPS latitude
- `longitude` (number, optional): GPS longitude

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439012",
    "label": "Home",
    "street": "123 Main St",
    "city": "Algiers",
    "country": "Algeria",
    "isDefault": true,
    ...
  },
  "message": "Address created successfully"
}
```

---

### 7. Update Address

**PATCH** `/api/users/addresses/:id`

Update an existing address.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "label": "Updated Home",
  "street": "123 Main St, Apt 5",
  "instructions": "New instructions"
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439013",
    ...
  },
  "message": "Address updated successfully"
}
```

---

### 8. Delete Address

**DELETE** `/api/users/addresses/:id`

Delete a delivery address.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Address deleted successfully"
}
```

---

### 9. Set Default Address

**POST** `/api/users/addresses/:id/default`

Set an address as the default delivery address.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "isDefault": true,
    ...
  },
  "message": "Default address set successfully"
}
```

---

### 10. Get User by ID

**GET** `/api/users/:id`

Get public user profile (limited information).

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "role": "customer",
    "createdAt": "2026-01-01T10:00:00.000Z"
  }
}
```

---

## Field Definitions

### Languages

- `ar`: Arabic
- `fr`: French
- `en`: English

### Roles

- `customer`: Regular customer
- `cook`: Food provider
- `admin`: Administrator

---

## Validation Rules

### Profile

- **Name**: Minimum 2 characters
- **Phone**: Valid mobile phone number

### Address

- **Label**: Required, not empty
- **Street**: Required, not empty
- **City**: Required, not empty
- **Country**: Required, not empty
- **Latitude**: Valid number (-90 to 90)
- **Longitude**: Valid number (-180 to 180)

---

## Notes

- Setting an address as default automatically unsets other default addresses
- Deleting the default address will not automatically set another address as default
- Phone numbers should be in international format (e.g., +213555123456)
