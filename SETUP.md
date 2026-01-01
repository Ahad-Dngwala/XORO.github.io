# Quick Setup Guide

## Prerequisites Check
- [ ] Node.js (v18+) installed
- [ ] PostgreSQL (v14+) installed and running
- [ ] Database `kanban_db` created

## Step-by-Step Setup

### 1. Database Setup
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE kanban_db;

-- Exit
\q
```

### 2. Backend Setup (Terminal 1)
```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# DATABASE_URL="postgresql://username:password@localhost:5432/kanban_db?schema=public"
# PORT=3001
# FRONTEND_URL=http://localhost:5173

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start server
npm run dev
```

### 3. Frontend Setup (Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/tasks
- Health Check: http://localhost:3001/health

## Troubleshooting

### Database Connection Error
```bash
# Verify PostgreSQL is running
# Windows: Check Services
# Mac/Linux: sudo service postgresql status

# Test connection
psql -U username -d kanban_db
```

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` if needed

### Prisma Migration Issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or create fresh migration
npx prisma migrate dev
```

## Verification Checklist
- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Can create a task via UI
- [ ] Can drag & drop tasks between columns
- [ ] Can edit tasks inline
- [ ] Can delete tasks
- [ ] Data persists after page refresh

