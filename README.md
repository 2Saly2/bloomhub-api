🌸 BloomHub API

A modular REST API built with Express.js and MongoDB, designed for authentication and role-based authorization.
It follows a clean, service-driven architecture using import aliases for better structure and scalability.

🚀 Features

🔐 User Authentication (JWT) — Register and login securely

🧩 Modular Architecture — Organized by modules for maintainability

👥 Role-Based Access Control — Admins and Members with scoped permissions

⚙️ Import Aliases Support — Clean paths using #@/ prefix

🧠 Centralized Error Handling — Clear and consistent API responses

🗄️ MongoDB Integration — Mongoose ODM for schema and data management

🛠 Tech Stack

Backend: Node.js + Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT (jsonwebtoken)

Security: bcrypt for password hashing

Development Tools: Nodemon for hot reload

⚙️ Setup Instructions
# Clone the repository
git clone https://github.com/2Saly2/bloomhub-api.git
cd bloomhub-api

# Install dependencies
npm install

# Create a .env file and add the following:
MONGO_URI=mongodb://localhost:27017/bloomhub_db
PORT=5000
JWT_SECRET=your_super_secret_key

# Start the development server
npm run dev


🌐 Server runs on http://localhost:5000

🔐 Authentication & Roles
Method	Endpoint	Description	Auth	Role
POST	/auth/register	Register a new user	❌	Any
POST	/auth/login	Login and get JWT token	❌	Any
GET	/admin-only	Access admin route	✅	Admin
GET	/member-only	Access member route	✅	Member

Example Login Request:

{
  "email": "user@example.com",
  "password": "mypassword123"
}


Authorization Header:

Authorization: Bearer <your_token_here>

📁 Project Structure
src/
 ├── main.js                     # App entry point
 ├── databases/
 │   └── connect-mongo.js        # MongoDB connection
 ├── middlewares/
 │   ├── auth.js                 # JWT verification
 │   └── roles.js                # Role authorization
 ├── routes/
 │   ├── auth.js                 # Auth routes
 │   └── index.js                # Global router
 └── modules/
     └── auth/
         ├── model/
         ├── service/
         ├── controller/
         └── routes/

📊 Example Responses

✅ Success Response

{
  "success": true,
  "message": "Welcome Admin 🌸"
}


❌ Error Response

{
  "success": false,
  "message": "Unauthorized"
}

🧪 Testing

You can test all routes using Postman or REST Client (VS Code extension).
Make sure MongoDB is running locally on port 27017 before starting the API.

📜 License

This project is licensed under the MIT License.
Built with ❤️ using Express + MongoDB, as part of backend learning practice.