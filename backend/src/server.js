import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: ['https://xoro-production.up.railway.app', 'https://xoro-rho.vercel.app', FRONTEND_URL, 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize Prisma Client
const prisma = new PrismaClient();

// Seed database if empty
async function seedDatabaseIfNeeded() {
  try {
    const taskCount = await prisma.task.count();
    if (taskCount === 0) {
      console.log('🌱 Database is empty, seeding dummy tasks...');
      
      const dummyTasks = [
        { title: 'Design user interface mockups', description: 'Create wireframes and high-fidelity designs', status: 'TODO' },
        { title: 'Set up development environment', description: 'Install all required dependencies', status: 'DONE' },
        { title: 'Implement authentication system', description: 'Add user login and session management', status: 'IN_PROGRESS' },
        { title: 'Write API documentation', description: 'Document all API endpoints and usage examples', status: 'TODO' },
        { title: 'Optimize database queries', description: 'Improve performance of database operations', status: 'IN_PROGRESS' },
        { title: 'Add unit tests', description: 'Write comprehensive test suite', status: 'TODO' },
        { title: 'Deploy to production', description: 'Deploy application to production server', status: 'DONE' },
        { title: 'Code review and refactoring', description: 'Review code quality and refactor as needed', status: 'DONE' },
        { title: 'Implement drag and drop', description: 'Add drag and drop functionality for tasks', status: 'TODO' },
        { title: 'Add dark mode support', description: 'Implement dark mode theme', status: 'TODO' },
        { title: 'Create user onboarding flow', description: 'Design and implement user onboarding', status: 'IN_PROGRESS' },
        { title: 'Performance optimization', description: 'Optimize application performance', status: 'DONE' }
      ];

      await prisma.task.createMany({ data: dummyTasks });
      console.log(`✅ Created ${dummyTasks.length} dummy tasks`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Start server
async function startServer() {
  await seedDatabaseIfNeeded();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api/tasks`);
  });
}

startServer();

