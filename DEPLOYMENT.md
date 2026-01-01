# Deployment Guide for XORO Kanban Application

## 🚀 Quick Deployment Options

### Option 1: Railway + Vercel (Recommended - Free Tier)

#### Backend (Railway)
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and deploy
cd backend
railway login
railway init
railway add postgresql
railway variables set PORT=3001
railway variables set FRONTEND_URL=https://your-app.vercel.app
railway up
```

#### Frontend (Vercel)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd frontend
vercel --prod
vercel env add VITE_API_URL production
# Set value to: https://your-backend.railway.app/api
```

### Option 2: Render.com (All-in-One)

1. Push code to GitHub
2. Create **Web Service** for backend:
   - Build: `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
   - Start: `cd backend && npm start`
   - Add PostgreSQL database
3. Create **Static Site** for frontend:
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/dist`

### Option 3: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: kanban_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/kanban_db
      PORT: 3001
      FRONTEND_URL: http://localhost:3000
    depends_on:
      - postgres
    ports:
      - "3001:3001"

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
DATABASE_URL="postgresql://user:password@host:5432/database_name?schema=public"
FRONTEND_URL=https://your-production-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 📋 Pre-Deployment Checklist

- [ ] Update CORS settings for production domains
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Test database migrations
- [ ] Build and test frontend locally
- [ ] Set up monitoring/logging
- [ ] Configure SSL certificates

## 🐳 Docker Deployment Commands

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database (optional)
docker-compose exec backend npm run seed
```

## 🚀 Production Optimizations

### Backend
- Enable compression middleware
- Set up proper logging
- Configure rate limiting
- Add health checks

### Frontend
- Enable gzip compression
- Set up CDN
- Configure caching headers
- Optimize bundle size

## 🔍 Post-Deployment Testing

1. Test all CRUD operations
2. Verify drag & drop functionality
3. Check mobile responsiveness
4. Test error handling
5. Verify data persistence
6. Check CORS configuration
7. Test database connections
