import express from 'express';
import dotenv from 'dotenv';
import { connectMongo } from '#@/databases/connect-mongo.js';
import routes from '#@/routes/index.js';

dotenv.config();

const app = express();


app.use(express.json());

// Routes
app.use('/api', routes);


connectMongo();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
