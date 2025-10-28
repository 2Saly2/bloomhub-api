🌸 BloomHub API

BloomHub API is a modular RESTful backend built with Express.js and MongoDB, designed for user authentication and role-based access control.
It follows a clean, scalable architecture using import aliases and service-driven modules.

🚀 Features

🔐 JWT Authentication — Secure user login and registration

👥 Role-Based Authorization — Admin and Member roles with scoped access

🧩 Modular Architecture — Organized and maintainable folder structure

🗄️ MongoDB Integration — Using Mongoose for data modeling

⚙️ Import Aliases — Clean imports using #@/ prefix

🧠 Centralized Error Handling — Unified API responses

🛠 Tech Stack

Backend: Node.js + Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT (jsonwebtoken)

Security: bcrypt for password hashing

Development: Nodemon for hot reload

⚙️ Setup
# Clone the repository
git clone https://github.com/2Saly2/bloomhub-api.git
cd bloomhub-api

# Install dependencies
npm install

# Create a .env file and add:
MONGO_URI=mongodb://localhost:27017/bloomhub_db
PORT=5000
JWT_SECRET=your_secret_key

# Run the development server
npm run dev


🌐 Server runs on http://localhost:5000

🔐 Authentication & Roles
Method	Endpoint	Description	Auth	Role
POST	/auth/register	Register new user	❌	Any
POST	/auth/login	Login and receive token	❌	Any
GET	/admin-only	Admin access route	✅	Admin
GET	/member-only	Member access route	✅	Member

Example Login Request:

{
  "email": "user@example.com",
  "password": "mypassword123"
}


Use token in header:
Authorization: Bearer <your_token_here>

📁 Project Structure
src/
 ├── main.js                 # App entry point
 ├── databases/
 │   └── connect-mongo.js    # MongoDB connection
 ├── middlewares/
 │   ├── auth.js             # JWT authentication
 │   └── roles.js            # Role-based permissions
 ├── routes/
 │   ├── auth.js             # Auth routes
 │   └── index.js            # Main router
 └── modules/
     └── auth/
         ├── model/
         ├── service/
         ├── controller/
         └── routes/

🧪 Example Responses

✅ Success

{ "success": true, "message": "Welcome Admin 🌸" }


❌ Error

{ "success": false, "message": "Unauthorized" }

💡 Project Type

This project represents a Client Project Tracker API, where:

Admins can manage users and data globally

Members can access only their own information

📜 License

Licensed under the MIT License.
Built with ❤️ using Express.js + MongoDB as part of backend learning and architecture practice.