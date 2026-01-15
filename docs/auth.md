# Authentication API Documentation

## Overview

The Authentication API handles user registration, login, token refresh, password reset, and user profile retrieval.

**Base URL**: `/api/auth`

---

## Endpoints

### 1. Register New User

**POST** `/api/auth/register`

Register a new user account.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "role": "customer"
}
```

#### Fields

- `email` (string, required): Valid email address
- `password` (string, required): Minimum 8 characters, must contain uppercase, lowercase, and number
- `name` (string, required): Minimum 2 characters
- `role` (string, required): Either "customer" or "cook"

#### Success Response (201 Created)

```json
{
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer",
      "isAdmin": false,
      "isVerified": false,
      "isActive": true,
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Registration successful"
}
```

#### Error Responses

- **400 Bad Request**: Validation errors
- **409 Conflict**: Email already registered

---

### 2. Login

**POST** `/api/auth/login`

Authenticate user and receive tokens.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer",
      "isAdmin": false,
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Login successful"
}
```

#### Error Responses

- **400 Bad Request**: Invalid email format
- **401 Unauthorized**: Invalid credentials or inactive account

---

### 3. Refresh Access Token

**POST** `/api/auth/refresh`

Generate new access token using refresh token.

#### Request Body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Token refreshed successfully"
}
```

#### Error Responses

- **400 Bad Request**: Refresh token missing
- **401 Unauthorized**: Invalid or expired refresh token

---

### 4. Logout

**POST** `/api/auth/logout`

Invalidate user's refresh token.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Logged out successfully"
}
```

#### Error Responses

- **401 Unauthorized**: No token or invalid token

---

### 5. Get Current User

**GET** `/api/auth/me`

Retrieve authenticated user's profile.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isAdmin": false,
    "isVerified": false,
    "isActive": true,
    "createdAt": "2026-01-15T10:30:00.000Z",
    "updatedAt": "2026-01-15T10:30:00.000Z"
  }
}
```

#### Error Responses

- **401 Unauthorized**: No token or invalid token
- **404 Not Found**: User not found

---

### 6. Forgot Password

**POST** `/api/auth/forgot-password`

Request password reset email.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Password reset email sent"
}
```

**Note**: Returns success even if email doesn't exist (security measure)

---

### 7. Reset Password

**POST** `/api/auth/reset-password`

Reset password using token from email.

#### Request Body

```json
{
  "token": "abc123def456",
  "password": "NewSecurePass123",
  "confirmPassword": "NewSecurePass123"
}
```

#### Fields

- `token` (string, required): Reset token from email
- `password` (string, required): New password meeting requirements
- `confirmPassword` (string, required): Must match password

#### Success Response (200 OK)

```json
{
  "data": null,
  "message": "Password reset successfully"
}
```

#### Error Responses

- **400 Bad Request**: Passwords don't match
- **404 Not Found**: Invalid or expired token

---

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Rate Limiting

Authentication endpoints are rate limited to prevent brute force attacks:

- 100 requests per 15 minutes per IP address

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Token Expiration

- **Access Token**: 1 hour
- **Refresh Token**: 7 days
- **Password Reset Token**: 1 hour
