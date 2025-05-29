## Install all dependencies at once:
```sh
npm install
```

## Alternative: Install dependencies individually:
If you want to install them one by one, you can use:

```sh
npm install body-parser@^1.20.2
npm install compression@^1.7.4
npm install crypto-js@^4.1.1
npm install dotenv@^16.3.1
npm install express@^4.18.2
npm install firebase-admin@^11.11.0
npm install jsonwebtoken@^9.0.2
npm install mongoose@^7.6.3
npm install nodemailer@^6.9.7
npm install nodemon@^3.0.1
```

## Running your project:
After installing the dependencies, you can start your backend server using the script:

```sh
npm start
```

This will run `nodemon server.js` as configured in your package.json scripts section.

**Note:** Make sure you have Node.js and npm installed on your system before running these commands

Here's what each dependency in your package.json is used for:

## Core Framework & Server
- **express**: Web framework for Node.js to build REST APIs and handle HTTP requests/responses
- **body-parser**: Middleware to parse incoming request bodies (JSON, URL-encoded data)
- **compression**: Middleware to compress HTTP responses (gzip) for better performance

## Database & Data Management
- **mongoose**: MongoDB object modeling library for Node.js - handles database operations
- **crypto-js**: Cryptographic library for hashing passwords, encryption/decryption

## Authentication & Security
- **jsonwebtoken**: Creates and verifies JSON Web Tokens (JWT) for user authentication
- **firebase-admin**: Server-side Firebase SDK for push notifications, user management, etc.

## Configuration & Environment
- **dotenv**: Loads environment variables from `.env` file (database URLs, API keys, secrets)

## Email Services
- **nodemailer**: Sends emails (verification emails, password reset, notifications)

## Development Tools
- **nodemon**: Development tool that automatically restarts the server when code changes

## Typical Use Case for Food Delivery App:
This dependency stack is commonly used for building a **food delivery backend** that handles:
- User registration/login with JWT authentication
- Restaurant and menu management
- Order processing and tracking
- Email notifications for orders
- Push notifications via Firebase
- Secure password storage
- Database operations for users, restaurants, orders

All dependencies work together to create a complete backend API for a food delivery application.
