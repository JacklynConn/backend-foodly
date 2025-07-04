# API Reference Guide

## Base URL
```
http://localhost:6013
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## User Roles
- **Client**: Regular customers
- **Admin**: System administrators
- **Vendor**: Restaurant owners
- **Driver**: Delivery personnel

---

## Authentication Endpoints

### Register User
```http
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "userType": "Client"
}
```

### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "userType": "Client"
  }
}
```

---

## Restaurant Endpoints

### Get Random Restaurants by Code
```http
GET /api/restaurant/{code}
```

### Get All Nearby Restaurants
```http
GET /api/restaurant/all/{code}
```

### Get Restaurant by ID
```http
GET /api/restaurant/byId/{restaurant_id}
```

### Add Restaurant (Vendor/Admin only)
```http
POST /api/restaurant
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pizza Palace",
  "time": "30-45 mins",
  "imageUrl": "https://example.com/image.jpg",
  "owner": "owner_name",
  "code": "US001",
  "logoUrl": "https://example.com/logo.jpg",
  "coords": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main St, New York, NY",
    "title": "Pizza Palace Location"
  }
}
```

---

## Food Endpoints

### Get Foods by Restaurant
```http
GET /api/foods/restaurant/{restaurant_id}
```

### Get Foods by Category and Code
```http
GET /api/foods/{category}/{code}
```

### Search Foods
```http
GET /api/foods/search/{search_term}
```

### Get Random Foods by Category and Code
```http
GET /api/foods/random/{category}/{code}
```

---

## Cart Endpoints

### Add Product to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "food_item_id",
  "quantity": 2,
  "totalPrice": 15.99,
  "additives": ["extra_cheese", "bacon"]
}
```

### Get Cart Items
```http
GET /api/cart
Authorization: Bearer <token>
```

### Get Cart Count
```http
GET /api/cart/count
Authorization: Bearer <token>
```

### Remove Cart Item
```http
DELETE /api/cart/{cart_item_id}
Authorization: Bearer <token>
```

### Decrement Product Quantity
```http
PATCH /api/cart/decrement/{cart_item_id}
Authorization: Bearer <token>
```

---

## Order Endpoints

### Place Order
```http
POST /api/order
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [
    {
      "foodId": "food_id",
      "quantity": 2,
      "price": 12.99,
      "additives": ["extra_sauce"],
      "instructions": "No onions please"
    }
  ],
  "orderTotal": 25.98,
  "deliveryFee": 3.99,
  "grandTotal": 29.97,
  "deliveryAddress": "address_id",
  "paymentMethod": "credit_card",
  "restaurantId": "restaurant_id",
  "restaurantCoords": [-74.0060, 40.7128],
  "recipientCoords": [-74.0050, 40.7130],
  "notes": "Please ring doorbell"
}
```

### Get User Orders
```http
GET /api/order
Authorization: Bearer <token>

# Optional query parameters:
GET /api/order?paymentStatus=Completed&orderStatus=Delivered
```

---

## Address Endpoints

### Add Address
```http
POST /api/address
Authorization: Bearer <token>
Content-Type: application/json

{
  "addressLine1": "123 Main Street, Apt 4B",
  "postalCode": "10001",
  "default": true,
  "deliveryInstructions": "Leave at door",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### Get User Addresses
```http
GET /api/address
Authorization: Bearer <token>
```

### Set Default Address
```http
PATCH /api/address/default/{address_id}
Authorization: Bearer <token>
```

### Get Default Address
```http
GET /api/address/default
Authorization: Bearer <token>
```

### Delete Address
```http
DELETE /api/address/{address_id}
Authorization: Bearer <token>
```

---

## Rating Endpoints

### Add Rating
```http
POST /api/rating
Authorization: Bearer <token>
Content-Type: application/json

{
  "ratingType": "Restaurant", // or "Food"
  "product": "restaurant_id_or_food_id",
  "rating": 4.5
}
```

### Check User Rating
```http
GET /api/rating/check?ratingType=Restaurant&product=restaurant_id
Authorization: Bearer <token>
```

---

## User Endpoints

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

---

## Response Format

All API responses follow this general format:

### Success Response
```json
{
  "status": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "status": false,
  "message": "Error description"
}
```

---

## Error Codes

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Missing or invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error - Server-side error

---

## Query Parameters

### Common Query Parameters

#### Pagination
```http
GET /api/endpoint?page=1&limit=10
```

#### Filtering
```http
GET /api/orders?paymentStatus=Completed&orderStatus=Delivered
```

#### Sorting
```http
GET /api/foods?sort=rating&order=desc
```

---

## Rate Limiting

The API may implement rate limiting to prevent abuse. If rate limited, you'll receive a `429 Too Many Requests` response.

---

## Testing the API

You can test the API using tools like:
- **Postman**: Import the endpoints and test interactively
- **cURL**: Command-line testing
- **Insomnia**: REST client for API testing

### Example cURL Request
```bash
curl -X POST http://localhost:6013/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "userType": "Client"
  }'
```

---

## Notes

1. All timestamps are in ISO 8601 format
2. Coordinates are stored as [longitude, latitude] arrays
3. Prices are stored as numbers (not strings)
4. Image URLs should be publicly accessible
5. Email verification may be required for certain operations
6. Location codes are used for geographical filtering