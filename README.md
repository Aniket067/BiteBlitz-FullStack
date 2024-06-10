# BiteBlitz

Welcome to **BiteBlitz**, a full-featured food delivery platform built with the MERN stack. This application not only provides a delightful and interactive customer experience but also includes an admin panel for effective restaurant and order management.

## Key Features

### Customer Features
- **Dynamic Home Page**: Features categories of cuisines and top-rated meals.
- **Secure Authentication**: Robust login/signup functionality.
- **Interactive Menu**: Users can browse, search, and filter a variety of dishes.
- **Advanced Cart System**: Supports modifications, additions, and deletions in real-time.
- **Checkout Process**: Integrated with Stripe for secure and straightforward payments.
- **Real-time Order Tracking**: Updates on order status, including preparation, dispatch, and delivery stages.

### Admin Features
- **Admin Dashboard**: Provides stats and access to manage orders, users, and menu items.
- **Manage Orders**: Update statuses from new, to in-progress, to completed.
- **Product Management**: Add, edit, and remove menu items with ease, including descriptions, prices, and images.

## Technology Stack

- **Frontend**: React.js with Vite for faster development and optimized builds.
- **Backend**: Node.js and Express.js, creating a robust API.
- **Database**: MongoDB with Mongoose, for scalable data storage.
- **Authentication**: JWT (JSON Web Tokens) ensures secure data transmission.
- **File Storage**: Multer for handling image uploads.
- **API Testing**: Postman to test and manage APIs.
- **Payment Processing**: Stripe for handling secure payment transactions.
- **Additional Security and Middleware**:
  - **bcrypt**: Used for hashing and comparing hashed passwords.
  - **body-parser**: Middleware to parse incoming request bodies.
  - **cors**: Enables cross-origin resource sharing.
  - **dotenv**: Manages environment variables.
  - **validator**: Validates and sanitizes strings.

## Getting Started

Follow these instructions to get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/BiteBlitz.git
   cd BiteBlitz

   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**

 To run BiteBlitz locally, you need to set up some environment variables. Create a `.env` file in the root directory of your project and populate it with the following keys:

```makefile
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_api_key
```
Replace your_mongodb_uri, your_jwt_secret, and your_stripe_api_key with your actual MongoDB URI, JWT secret, and Stripe API key respectively.

4. **Start the servers-frontend and admin seperately:**
   ```bash
   npm run dev
   ```
5. **Run Backend server:**
   ```bash
   npm run server
   ```

Visit localhost:5173 and 5174 for frontend and for backend localhost:4000
