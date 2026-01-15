# Admin API Documentation

## Overview

The Admin API provides administrative functions for platform management, including user management, analytics, and system oversight.

**Base URL**: `/api/admin`

**Access**: All endpoints require admin role authentication.

---

## Endpoints

### 1. Get Dashboard Statistics

**GET** `/api/admin/stats`

Get overview statistics for the platform.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "totalUsers": 1547,
    "activeUsers": 1432,
    "totalCooks": 245,
    "totalCustomers": 1302,
    "totalOrders": 8934,
    "completedOrders": 8125,
    "revenue": 15687420
  }
}
```

#### Response Fields

- `totalUsers`: Total registered users
- `activeUsers`: Users with active status
- `totalCooks`: Users with cook role
- `totalCustomers`: Users with customer role
- `totalOrders`: Total orders placed
- `completedOrders`: Orders with delivered status
- `revenue`: Total revenue (completed orders with completed payment)

---

### 2. Get Users List

**GET** `/api/admin/users`

Get paginated list of users with filters.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Query Parameters

- `role` (string, optional): Filter by role (customer, cook, admin)
- `isActive` (boolean, optional): Filter by active status
- `search` (string, optional): Search by email or name
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 10)
- `sort` (string, optional): Sort field (default: createdAt)
- `order` (string, optional): Sort order (asc, desc, default: desc)

#### Example Request

```
GET /api/admin/users?role=cook&isActive=true&page=1&limit=20
```

#### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "email": "cook@example.com",
      "name": "John Doe",
      "role": "cook",
      "avatarUrl": "https://example.com/avatar.jpg",
      "isAdmin": false,
      "isVerified": true,
      "isActive": true,
      "createdAt": "2026-01-01T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    }
  ],
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-01-15T14:00:00.000Z",
    "page": 1,
    "limit": 20,
    "total": 245,
    "totalPages": 13,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Users fetched successfully"
}
```

---

### 3. Get User by ID

**GET** `/api/admin/users/:id`

Get detailed user information.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "cook@example.com",
    "name": "John Doe",
    "role": "cook",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isAdmin": false,
    "isVerified": true,
    "isActive": true,
    "createdAt": "2026-01-01T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

---

### 4. Suspend User

**POST** `/api/admin/users/:id/suspend`

Suspend a user account.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "isActive": false,
    ...
  },
  "message": "User suspended"
}
```

---

### 5. Activate User

**POST** `/api/admin/users/:id/activate`

Activate a suspended user account.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "isActive": true,
    ...
  },
  "message": "User activated"
}
```

---

### 6. Delete User

**DELETE** `/api/admin/users/:id`

Permanently delete a user account.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "deleted": true
  },
  "message": "User deleted"
}
```

**Warning**: This action is permanent and cannot be undone.

---

### 7. Get Orders List

**GET** `/api/admin/orders`

Get paginated list of orders with filters.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Query Parameters

- `status` (string, optional): Filter by order status
- `customerId` (string, optional): Filter by customer
- `cookId` (string, optional): Filter by cook
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 10)
- `sort` (string, optional): Sort field (default: createdAt)
- `order` (string, optional): Sort order (asc, desc, default: desc)

#### Example Request

```
GET /api/admin/orders?status=delivered&page=1&limit=50
```

#### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439015",
      "orderNumber": "ORD-L5Z3R9X-A8B2C",
      "customerId": "507f1f77bcf86cd799439016",
      "cookId": "507f1f77bcf86cd799439011",
      "status": "delivered",
      "paymentMethod": "cash",
      "paymentStatus": "completed",
      "total": 4097,
      "createdAt": "2026-01-15T11:00:00.000Z",
      "deliveredAt": "2026-01-15T13:00:00.000Z"
    }
  ],
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-01-15T14:00:00.000Z",
    "page": 1,
    "limit": 50,
    "total": 8934,
    "totalPages": 179,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Orders fetched successfully"
}
```

---

### 8. Get Analytics

**GET** `/api/admin/analytics`

Get platform analytics for the last 30 days.

#### Headers

```
Authorization: Bearer <admin_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "ordersPerDay": [
      {
        "date": "2026-01-15",
        "count": 124,
        "revenue": 215480
      },
      {
        "date": "2026-01-14",
        "count": 118,
        "revenue": 198760
      }
    ],
    "topCooks": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Chef's Kitchen",
        "totalRevenue": 456890,
        "totalOrders": 342
      },
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Mama's Food",
        "totalRevenue": 389450,
        "totalOrders": 298
      }
    ],
    "topDishes": [
      {
        "id": "507f1f77bcf86cd799439013",
        "name": "Traditional Couscous",
        "totalRevenue": 178900,
        "totalOrders": 149
      },
      {
        "id": "507f1f77bcf86cd799439014",
        "name": "Chicken Tajine",
        "totalRevenue": 156780,
        "totalOrders": 136
      }
    ]
  }
}
```

#### Response Fields

- `ordersPerDay`: Daily order count and revenue for last 30 days
- `topCooks`: Top 5 cooks by revenue
- `topDishes`: Top 5 dishes by revenue

---

## Admin Actions

### User Management

- **View all users**: Access complete user list with filtering
- **Suspend users**: Temporarily disable accounts
- **Activate users**: Re-enable suspended accounts
- **Delete users**: Permanently remove accounts (use with caution)

### Order Management

- **View all orders**: Monitor all platform orders
- **Filter orders**: Search by status, customer, or cook
- **Order analytics**: Track platform-wide order trends

### Platform Analytics

- **Dashboard stats**: Quick overview of key metrics
- **Revenue tracking**: Monitor total platform revenue
- **Performance metrics**: Identify top performers
- **Trend analysis**: Daily order and revenue trends

---

## Validation Rules

### Query Parameters

- **page**: Positive integer (min: 1)
- **limit**: Integer between 1-100
- **role**: customer, cook, or admin
- **isActive**: Boolean (true/false)
- **status**: Valid order status value
- **sort**: Valid field name
- **order**: asc or desc

---

## Best Practices

### Security

- Admin endpoints require authentication with admin role
- Log all admin actions for audit trail
- Use caution with delete operations
- Regularly review suspended accounts

### Data Management

- Use pagination for large datasets
- Apply filters to narrow results
- Export analytics regularly for reporting
- Monitor platform health through dashboard stats

### User Management

- Suspend rather than delete when possible
- Document reasons for suspensions
- Communicate with users before taking action
- Review user activity before deletions

---

## Rate Limiting

Admin endpoints have higher rate limits than regular endpoints:

- 1000 requests per 15 minutes per IP

---

## Error Responses

### 401 Unauthorized

User is not authenticated

```json
{
  "error": {
    "message": "Authentication required",
    "statusCode": 401
  }
}
```

### 403 Forbidden

User does not have admin role

```json
{
  "error": {
    "message": "Insufficient permissions",
    "statusCode": 403
  }
}
```

### 404 Not Found

Requested resource not found

```json
{
  "error": {
    "message": "User not found",
    "statusCode": 404
  }
}
```

---

## Notes

- All admin actions are logged for security and auditing
- Deleted users cannot be recovered
- Suspended users can log in but cannot perform actions
- Analytics data is calculated daily at midnight UTC
- Revenue only includes completed orders with completed payments
