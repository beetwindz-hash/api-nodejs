# Orders API Documentation

## Overview

The Orders API manages order creation, status updates, and order lifecycle management.

**Base URL**: `/api/orders`

---

## Endpoints

### 1. Create Order

**POST** `/api/orders`

Create a new order (customer only).

#### Headers

```
Authorization: Bearer <customer_access_token>
```

#### Request Body

```json
{
  "cookId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "dishId": "507f1f77bcf86cd799439012",
      "quantity": 2,
      "specialInstructions": "Extra spicy please"
    },
    {
      "dishId": "507f1f77bcf86cd799439013",
      "quantity": 1
    }
  ],
  "deliveryAddressId": "507f1f77bcf86cd799439014",
  "paymentMethod": "cash",
  "notes": "Please call when arrived"
}
```

#### Fields

- `cookId` (string, required): Cook's ID
- `items` (array, required): At least one item
  - `dishId` (string, required): Dish ID
  - `quantity` (number, required): 1-20
  - `specialInstructions` (string, optional): Max 500 chars
- `deliveryAddressId` (string, required): Address ID from user's addresses
- `paymentMethod` (string, required): cash, card, mobile_wallet
- `notes` (string, optional): Max 1000 chars

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD-L5Z3R9X-A8B2C",
    "customerId": "507f1f77bcf86cd799439016",
    "cookId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "dishId": "507f1f77bcf86cd799439012",
        "dishName": "Traditional Couscous",
        "quantity": 2,
        "price": 1200,
        "specialInstructions": "Extra spicy please"
      },
      {
        "dishId": "507f1f77bcf86cd799439013",
        "dishName": "Baklava",
        "quantity": 1,
        "price": 500
      }
    ],
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "Algiers",
      "state": "Algiers",
      "postalCode": "16000",
      "country": "Algeria",
      "phone": "+213555123456",
      "instructions": "Second floor, ring twice"
    },
    "status": "pending",
    "paymentMethod": "cash",
    "paymentStatus": "pending",
    "subtotal": 2900,
    "deliveryFee": 300,
    "serviceFee": 290,
    "tax": 607,
    "discount": 0,
    "total": 4097,
    "estimatedPreparationTime": 60,
    "estimatedDeliveryTime": "2026-01-15T12:30:00.000Z",
    "notes": "Please call when arrived",
    "timeInCurrentStatus": 0,
    "totalItemCount": 3,
    "canCancelByCustomer": true,
    "canCancelByCook": true,
    "isActive": true,
    "createdAt": "2026-01-15T11:00:00.000Z",
    "updatedAt": "2026-01-15T11:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

#### Error Responses

- **400 Bad Request**: Validation errors, minimum order not met
- **404 Not Found**: Cook, dish, or address not found

---

### 2. Get Order by ID

**GET** `/api/orders/:id`

Get detailed order information.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD-L5Z3R9X-A8B2C",
    "customerId": "507f1f77bcf86cd799439016",
    "cookId": "507f1f77bcf86cd799439011",
    "items": [...],
    "deliveryAddress": {...},
    "status": "confirmed",
    "paymentMethod": "cash",
    "paymentStatus": "pending",
    "subtotal": 2900,
    "deliveryFee": 300,
    "serviceFee": 290,
    "tax": 607,
    "discount": 0,
    "total": 4097,
    "estimatedPreparationTime": 60,
    "estimatedDeliveryTime": "2026-01-15T12:30:00.000Z",
    "confirmedAt": "2026-01-15T11:05:00.000Z",
    "customer": {
      "id": "507f1f77bcf86cd799439016",
      "name": "John Doe",
      "email": "customer@example.com"
    },
    "cook": {
      "id": "507f1f77bcf86cd799439011",
      "businessName": "Chef's Kitchen",
      "phone": "+213555123456"
    },
    "createdAt": "2026-01-15T11:00:00.000Z",
    "updatedAt": "2026-01-15T11:05:00.000Z"
  }
}
```

---

### 3. Get My Orders (Customer)

**GET** `/api/orders/my`

Get all orders for authenticated customer.

#### Headers

```
Authorization: Bearer <customer_access_token>
```

#### Query Parameters

- `page` (number, optional): Page number
- `limit` (number, optional): Results per page

#### Success Response (200 OK)

```json
{
  "data": {
    "orders": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

---

### 4. Get Cook Orders

**GET** `/api/orders/cook`

Get all orders for authenticated cook.

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
    "orders": [...],
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

### 5. Search Orders

**GET** `/api/orders/search`

Search orders with filters.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Query Parameters

- `status` (string, optional): Order status
- `startDate` (ISO string, optional): Start date filter
- `endDate` (ISO string, optional): End date filter
- `minTotal` (number, optional): Minimum total amount
- `maxTotal` (number, optional): Maximum total amount
- `page` (number, optional): Page number
- `limit` (number, optional): Results per page

#### Example Request

```
GET /api/orders/search?status=confirmed&startDate=2026-01-01&endDate=2026-01-31&page=1
```

#### Success Response (200 OK)

```json
{
  "data": {
    "orders": [...],
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

### 6. Confirm Order (Cook)

**POST** `/api/orders/:id/confirm`

Confirm a pending order.

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "status": "confirmed",
    "confirmedAt": "2026-01-15T11:05:00.000Z",
    "estimatedDeliveryTime": "2026-01-15T12:30:00.000Z",
    ...
  },
  "message": "Order confirmed successfully"
}
```

#### Error Responses

- **400 Bad Request**: Only pending orders can be confirmed
- **403 Forbidden**: Not your order

---

### 7. Update Order Status (Cook)

**PATCH** `/api/orders/:id/status`

Update order status through workflow.

#### Headers

```
Authorization: Bearer <cook_access_token>
```

#### Request Body

```json
{
  "status": "preparing"
}
```

#### Valid Status Transitions

- `pending` → `confirmed`
- `confirmed` → `preparing`
- `preparing` → `ready`
- `ready` → `delivering`
- `delivering` → `delivered`

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "status": "preparing",
    "preparingAt": "2026-01-15T11:10:00.000Z",
    ...
  },
  "message": "Order status updated successfully"
}
```

#### Error Responses

- **400 Bad Request**: Invalid status transition
- **403 Forbidden**: Not your order

---

### 8. Cancel Order

**POST** `/api/orders/:id/cancel`

Cancel an order (customer or cook).

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "reason": "Customer requested cancellation due to change of plans"
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "status": "cancelled",
    "cancelReason": "Customer requested cancellation due to change of plans",
    "cancelledBy": "customer",
    "cancelledAt": "2026-01-15T11:15:00.000Z",
    ...
  },
  "message": "Order cancelled successfully"
}
```

#### Cancellation Rules

- **Customer**: Can cancel `pending` or `confirmed` orders
- **Cook**: Can cancel `pending`, `confirmed`, or `preparing` orders
- **Admin**: Can cancel any order except `delivered`

---

## Order Lifecycle

### Status Flow

```
pending → confirmed → preparing → ready → delivering → delivered
   ↓         ↓           ↓          ↓         ↓
                    cancelled
```

### Status Definitions

- **pending**: Order placed, awaiting cook confirmation
- **confirmed**: Cook accepted the order
- **preparing**: Cook is preparing the food
- **ready**: Food is ready for pickup/delivery
- **delivering**: Order is out for delivery
- **delivered**: Order successfully delivered
- **cancelled**: Order cancelled

### Payment Status

- **pending**: Awaiting payment
- **completed**: Payment successful
- **failed**: Payment failed
- **refunded**: Payment refunded

---

## Pricing Breakdown

### Calculation

```javascript
subtotal = sum(item.price * item.quantity)
serviceFee = subtotal * 0.10 (10%)
tax = (subtotal + serviceFee - discount) * 0.19 (19% VAT)
deliveryFee = cook's delivery fee (free if subtotal ≥ 3000 DZD)
total = subtotal + serviceFee + tax + deliveryFee - discount
```

### Example

```
Subtotal: 2900 DZD
Service Fee (10%): 290 DZD
Tax (19%): 607 DZD
Delivery Fee: 300 DZD
Discount: 0 DZD
─────────────────────
Total: 4097 DZD
```

---

## Validation Rules

- **Quantity**: 1-20 per item
- **Special Instructions**: Max 500 characters
- **Order Notes**: Max 1000 characters
- **Cancel Reason**: 3-500 characters
- **Minimum Order**: Defined by cook (typically 1500 DZD)
