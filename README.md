# ReWear – Community Clothing Exchange

**Team: Team 2729**

## 🌱 Overview

ReWear is a web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Our mission is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

## 🎯 Problem Statement

The fashion industry generates massive textile waste, with millions of tons of clothing ending up in landfills each year. ReWear addresses this by creating a community-driven platform where users can give their clothes a second life through sustainable trading and swapping.

## ✨ Features

### 🔐 User Authentication
- Email/password signup and login
- Social authentication (Google, Facebook, Twitter/X)

### 🏠 Landing Page
- Platform introduction and mission
- Calls-to-action: "Start Swapping", "Browse Items", "List an Item"
- Featured items carousel
- Community statistics and testimonials

### 📊 User Dashboard
- Profile details and points balance
- Uploaded items overview
- Ongoing and completed swaps list
- Transaction history
- User preferences and settings

### 📝 Item Detail Page
- Image gallery and full item description
- Uploader information and ratings
- Options: "Swap Request" or "Redeem via Points"
- Item availability status
- Similar items recommendations

### ➕ Add New Item Page
- Upload multiple images
- Enter comprehensive item details:
  - Title and description
  - Category and type
  - Size and condition
  - Tags for better discoverability
- Submit to list item for community access

### 👑 Admin Role
- Moderate and approve/reject item listings
- Remove inappropriate or spam items
- Lightweight admin panel for platform oversight
- User management and reporting tools

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
OdooHackthon/
  backend/      # Node.js/Express API, MongoDB, authentication, admin, business logic
  frontend/     # React app, Vite, Tailwind CSS, user interface
```

- **backend/**: Express.js server, API routes, authentication, admin, MongoDB models, business logic
- **frontend/**: React app (Vite), UI, state management, API calls, user flows

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Clerk account for authentication

### 1. Clone the repository
```bash
git clone <repo-url>
cd OdooHackthon
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with the following:
```env
PORT=8004
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

#### Start the backend server
```bash
npm start
# or
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### Start the frontend dev server
```bash
npm run dev
```

> **Note:**
> - The frontend does **not** require a `.env` file by default. All API URLs are hardcoded to `http://localhost:8004/api`.
> - If you want to make the API URL configurable, create a `.env` file in `frontend/` with:
>   ```env
>   VITE_API_BASE_URL=http://localhost:8004/api
>   ```
>   And update your API calls to use `import.meta.env.VITE_API_BASE_URL`.

---

## 👥 Team

**Development Team:**
- **Samadhan Erande** - [202352327@vadodara.ac.in](mailto:202352327@vadodara.ac.in)
- **Shantanu Sawant** - [202352332@vadodara.ac.in](mailto:202352332@vadodara.ac.in)
- **Atharva Patil** - [202351014@vadodara.ac.in](mailto:202351014@vadodara.ac.in)
- **Harsha Agrawal** - [202351045@vadodara.ac.in](mailto:202351045@vadodara.ac.in)

## 📄 License

This project is developed for educational purposes as part of the Odoo Hackathon.

## 📞 Support

For support and inquiries, please contact any of our team members listed above.

---

**Built with ❤️ for sustainable fashion and a greener future** 🌍
