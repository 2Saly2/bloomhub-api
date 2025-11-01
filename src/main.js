import express from 'express';
import dotenv from 'dotenv';
import { connectMongo } from '#@/databases/connect-mongo.js';
import routes from '#@/routes/index.js';
import { populateUser } from '#@/middlewares/populateUser.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(expressLayouts);
app.set('layout', 'layout');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// populate user from cookie before routes so views can access `user`
app.use(populateUser);

// Routes
app.use('/', routes);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
connectMongo()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Close the process using the port or set a different PORT env var.`);
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
