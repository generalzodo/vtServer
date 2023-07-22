// app.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import winston from 'winston';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config(); 
import { Todo, User,Error } from './schemas.js';
import todoRoutes from './routes/todo.route.js';
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err.message));

app.use(bodyParser.json());

// Logging with Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// HTTP Request Logging with Morgan
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '{{Sample}} API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Error, 
          Todo, // Imported from the schemas.js file
          User, // Imported from the schemas.js file
          // Add other imported schemas as needed
        }
      }
    },
    apis: ['./routes/*.js'], // Path to the API routes files
  };
  
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Use Todo routes
app.use('/api', todoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});