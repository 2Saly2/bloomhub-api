🌸 BloomHub API

A modular RESTful API built with Express.js and MongoDB, designed for managing users with authentication and role-based access control. It follows a clean modular architecture using import maps for better scalability and code organization.

🚀 Features

🔐 JWT Authentication – Secure login and registration

👥 Role-Based Authorization – Admin and member permissions

🧩 Modular Structure – Each feature is self-contained and reusable

🗂️ MongoDB Integration – Data persistence using Mongoose

⚙️ Environment Configuration – Easy setup via .env file

🧠 Error Handling & Validation – Centralized middleware system

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Auth: JWT (jsonwebtoken)

Security: bcrypt for password hashing

Dev Tools: Nodemon for live reloading

⚙️ Setup Instructions
# Clone repository
git clone https://github.com/2Saly2/bloomhub-api.git
cd bloomhub-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Then update MONGO_DB_URI, PORT, and JWT_SECRET

# Start development server
npm run dev


Server runs at: http://localhost:4000

🔐 Authentication Flow
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login and receive JWT token
GET	/admin-only	Access admin route (admin role required)
GET	/member-only	Access member route (member role required)

Example Login Request:

{
  "email": "user@example.com",
  "password": "mypassword123"
}


Include token in requests:
Authorization: Bearer <your_token_here>

📁 Project Structure
src/
 ├── main.js                # Entry point
 ├── databases/connect-mongo.js
 ├── middlewares/
 │    ├── auth.js
 │    └── roles.js
 ├── modules/
 │    └── auth/
 │         ├── model/
 │         ├── controller/
 │         ├── service/
 │         └── routes/
 └── routes/index.js

🧪 Testing (Optional)

You can test endpoints using Postman or REST Client in VS Code.
Make sure to include your JWT token in the headers for protected routes.

📜 License

This project is licensed under the MIT License.
Built with ❤️ for learning and real-world backend experience.