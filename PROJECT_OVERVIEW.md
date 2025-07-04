# Backend-Foodly Project Overview

## 🍔 Project Description

**Backend-Foodly** is a comprehensive Node.js backend application designed for a food delivery platform. It provides a complete REST API solution that powers mobile and web applications for food ordering and delivery services, similar to popular platforms like Uber Eats, DoorDash, or Grubhub.

## 🏗️ Architecture

The application follows the **MVC (Model-View-Controller)** architectural pattern with clear separation of concerns:

- **Models**: Data schemas and database interactions
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions and middleware
- **Middleware**: Authentication, authorization, and request processing

## 🛠️ Technology Stack

### Core Framework & Server
- **Express.js**: Web framework for building REST APIs
- **Node.js**: JavaScript runtime environment
- **Body-parser**: Middleware for parsing request bodies
- **Compression**: HTTP response compression for better performance

### Database & Data Management
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Object Document Mapper (ODM) for MongoDB

### Authentication & Security
- **JSON Web Tokens (JWT)**: Stateless authentication
- **Crypto-js**: Password hashing and encryption
- **Role-based Access Control**: Multiple user types with different permissions

### Communication & Notifications
- **Firebase Admin SDK**: Push notifications and user management
- **Nodemailer**: Email service for notifications and verification

### Development & Configuration
- **Nodemon**: Development server with auto-restart
- **Dotenv**: Environment variable management

## 👥 User Roles & Permissions

The system supports four distinct user types with different access levels:

1. **Client**: End customers who place orders
2. **Admin**: System administrators with full access
3. **Vendor**: Restaurant owners who manage their establishments
4. **Driver**: Delivery personnel who handle order fulfillment

## 📊 Data Models

### User Model
```javascript
{
  username: String,
  email: String (unique),
  password: String (encrypted),
  verification: Boolean,
  phone: String,
  phoneVerification: Boolean,
  address: ObjectId (ref: Address),
  userType: Enum ['Client', 'Admin', 'Vendor', 'Driver'],
  profile: String (image URL)
}
```

### Restaurant Model
```javascript
{
  title: String,
  time: String,
  imageUrl: String,
  foods: Array,
  pickup: Boolean,
  delivery: Boolean,
  isAvailable: Boolean,
  owner: String,
  code: String,
  logoUrl: String,
  rating: Number (0-5),
  ratingCount: String,
  verification: Enum ['Pending', 'Verified', 'Rejected'],
  coords: {
    latitude: Number,
    longitude: Number,
    address: String,
    title: String
  }
}
```

### Food Model
```javascript
{
  title: String,
  time: String,
  foodTags: Array,
  category: String,
  foodType: Array,
  code: String,
  isAvailable: Boolean,
  restaurant: ObjectId (ref: Restaurant),
  rating: Number (1-5),
  ratingCount: String,
  description: String,
  price: Number,
  additives: Array,
  imageUrl: Array
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  orderItems: [{
    foodId: ObjectId (ref: Food),
    quantity: Number,
    price: Number,
    additives: Array,
    instructions: String
  }],
  orderTotal: Number,
  deliveryFee: Number,
  grandTotal: Number,
  deliveryAddress: ObjectId (ref: Address),
  paymentMethod: String,
  paymentStatus: Enum ['Pending', 'Completed', 'Failed'],
  orderStatus: Enum ['Placed', 'Preparing', 'Manual', 'Delivered', 'Cancelled', 'Ready', 'Out_for_Delivery'],
  restaurantId: ObjectId (ref: Restaurant),
  restaurantCoords: [Number],
  recipientCoords: [Number],
  driverId: String,
  rating: Number (1-5),
  feedback: String,
  promocode: String,
  discountAmount: Number,
  notes: String
}
```

## 🛣️ API Endpoints

### Authentication Routes (`/`)
- `POST /register` - User registration
- `POST /login` - User authentication

### User Management (`/api/users`)
- User profile management and operations

### Restaurant Management (`/api/restaurant`)
- `POST /` - Add new restaurant (requires authentication)
- `GET /byId/:id` - Get restaurant by ID
- `GET /:code` - Get random restaurants by area code
- `GET /all/:code` - Get all nearby restaurants

### Food Management (`/api/foods`)
- Food catalog management
- Search functionality
- Category-based filtering
- Restaurant menu management

### Category Management (`/api/category`)
- Food category operations

### Cart Operations (`/api/cart`)
- Add/remove items from cart
- Update quantities
- Get cart contents and count

### Order Processing (`/api/order`)
- Place new orders
- Order tracking and status updates
- Order history

### Address Management (`/api/address`)
- Multiple delivery addresses per user
- Default address settings
- Location coordinates

### Rating System (`/api/rating`)
- Rate restaurants and food items
- Calculate average ratings
- Check existing user ratings

## 🔒 Security Features

1. **JWT Authentication**: Stateless token-based authentication
2. **Password Encryption**: Secure password hashing using crypto-js
3. **Role-based Access Control**: Different permissions for each user type
4. **Token Verification Middleware**: Protects sensitive endpoints
5. **Input Validation**: Request validation and sanitization

## 🌍 Location-Based Services

The application includes sophisticated location features:
- **Coordinate Storage**: Latitude/longitude for restaurants and addresses
- **Area Code System**: Location-based restaurant filtering
- **Delivery Zones**: Restaurant availability by location
- **Distance Calculations**: For delivery fees and restaurant recommendations

## 📱 Features Overview

### For Customers (Clients)
- User registration and profile management
- Browse restaurants by location
- View menus and food items
- Add items to cart with customizations
- Place and track orders
- Rate restaurants and food
- Manage multiple delivery addresses
- Receive email and push notifications

### For Restaurant Owners (Vendors)
- Restaurant profile management
- Menu and food item management
- Order management and status updates
- Rating and review monitoring
- Availability controls

### For Delivery Drivers
- Order assignment and tracking
- Delivery status updates
- Location services integration

### For Administrators
- Complete system management
- User and restaurant verification
- System monitoring and analytics
- Content moderation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Firebase project (for push notifications)
- Email service credentials

### Installation
```bash
# Clone the repository
git clone https://github.com/JacklynConn/backend-foodly.git

# Navigate to project directory
cd backend-foodly

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm start
```

### Environment Variables
```
PORT=6013
MONGOURL=mongodb://localhost:27017/foodly
JWT_SECRET=your_jwt_secret
AUTH_EMAIL=your_email@example.com
AUTH_PASSWORD=your_email_password
```

## 🔧 Development

The application uses **Nodemon** for development, which automatically restarts the server when code changes are detected.

```bash
npm start  # Starts the server with nodemon
```

The server runs on `http://localhost:6013` by default.

## 📈 Scalability Considerations

The application is designed with scalability in mind:
- **Database Indexing**: Optimized queries with proper indexing
- **Modular Architecture**: Easy to extend and maintain
- **Stateless Authentication**: JWT tokens for horizontal scaling
- **Location-based Partitioning**: Area codes for geographical distribution
- **Aggregation Pipelines**: Efficient data processing with MongoDB

## 🔄 Future Enhancements

Potential areas for expansion:
- Real-time order tracking with WebSocket
- Advanced recommendation engine
- Multi-language support
- Payment gateway integration
- Analytics dashboard
- Mobile app SDK
- Third-party delivery service integration

## 📋 API Documentation

For detailed API documentation, refer to the individual route files in the `/routes` directory. Each endpoint includes:
- Request/response formats
- Authentication requirements
- Parameter descriptions
- Example usage

## 🤝 Contributing

This project follows standard Node.js development practices:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is available under the ISC license as specified in the package.json file.