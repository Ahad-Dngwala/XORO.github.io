# XORO – eXperience-Oriented Workflow Organizer

**XORO** is a premium, feature-rich Kanban-style task management application built with React, Node.js, Express, and PostgreSQL. This application delivers an exceptional user experience with professional-grade features including dark mode, real-time search, focus mode, keyboard shortcuts, and advanced responsive design. XORO demonstrates modern frontend development capabilities with SaaS-level UI/UX polish.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with dark mode
- **@dnd-kit** - Modern drag & drop library with accessibility
- **react-hot-toast** - Beautiful toast notifications
- **Axios** - HTTP client with interceptors
- **Lucide React** - Professional icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

## 🌟 Premium Features

### 🎯 Core Task Management
- ✅ Create, update, and delete tasks with inline editing
- ✅ Drag & drop tasks between columns with smooth animations
- ✅ Task descriptions (optional) with character limits
- ✅ Three status columns: Todo, In Progress, Done
- ✅ Optimistic UI updates for instant feedback
- ✅ Data persistence with PostgreSQL backend

### 🎨 Advanced UI/UX
- ✅ **Dark Mode Toggle** with localStorage persistence
- ✅ **Real-time Search & Filter** across task titles and descriptions
- ✅ **Focus Mode** - Hide Done column for productivity
- ✅ **Sorting Options** - By creation date, last updated, or default
- ✅ **Column Task Counters** with animated indicators
- ✅ **Skeleton Loaders** with shimmer animation
- ✅ **Hover Effects & Smooth Animations** throughout
- ✅ **Professional Toast Notifications** for all actions
- ✅ **Custom Logo & Favicon** with brand consistency

### ⌨️ Productivity Features
- ✅ **Keyboard Shortcuts**:
  - `Ctrl+K` / `Cmd+K` - Open search
  - `Ctrl+N` / `Cmd+N` - New task
  - `Enter` - Save/Submit
  - `Esc` - Close/Cancel
- ✅ **Inline Task Editing** - Click title to edit
- ✅ **Auto-focus Management** for better workflow
- ✅ **Responsive Design** - Mobile-first approach

### 📱 Mobile Experience
- ✅ **Fully Responsive Header** with hamburger menu
- ✅ **Touch-Friendly Interface** with proper tap targets
- ✅ **Mobile-Optimized Search** with compact layout
- ✅ **Adaptive Layout** for all screen sizes
- ✅ **Professional Mobile Menu** with slide-in animation

### 🔧 Technical Excellence
- ✅ **Error Handling** with user-friendly messages
- ✅ **Loading States** with skeleton loaders
- ✅ **Accessibility Features** with ARIA labels
- ✅ **Performance Optimizations** with lazy loading
- ✅ **Clean Code Architecture** with separation of concerns
- ✅ **Environment Configuration** for production deployment

### 🎨 Visual Polish
- ✅ **Modern Design System** with consistent spacing
- ✅ **Smooth Transitions** and micro-interactions
- ✅ **Status Color Indicators** for visual hierarchy
- ✅ **Professional Typography** and text hierarchy
- ✅ **Glass Morphism Effects** with backdrop blur
- ✅ **Custom Animations** with CSS keyframes

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

## 📦 Installation & Setup

### Quick Start (Windows)

1. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Setup database:**
   - Create a PostgreSQL database named `kanban_db`
   - Update `backend/.env` with your database connection string

3. **Run migrations:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start all services:**
   ```bash
   # From project root
   start.bat
   ```

   This will open separate windows for backend and frontend servers.

### Manual Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "XORO - Kanban Task Manager"
```

#### 2. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE kanban_db;
```

2. Update the database connection string in `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/kanban_db?schema=public"
```

#### 3. Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The backend server will run on `http://localhost:3001`

#### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Create a Task**: Click the "New Task" button in the header
2. **Edit a Task**: Click the edit icon on a task card or click the task title
3. **Move a Task**: Drag and drop a task card to a different column
4. **Delete a Task**: Click the delete icon on a task card

## 📁 Project Structure

```
XORO - Kanban Task Manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Prisma client configuration
│   │   ├── controllers/
│   │   │   └── taskController.js   # Task CRUD operations
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handling
│   │   │   └── notFound.js         # 404 handler
│   │   ├── routes/
│   │   │   └── taskRoutes.js       # API route definitions
│   │   ├── validators/
│   │   │   └── taskValidator.js    # Zod validation schemas
│   │   └── server.js               # Express server setup
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTaskModal.jsx    # Task creation modal
│   │   │   ├── ErrorBoundary.jsx   # Error boundary component
│   │   │   ├── Header.jsx          # App header
│   │   │   ├── KanbanColumn.jsx    # Column component
│   │   │   ├── SkeletonLoader.jsx  # Loading skeleton
│   │   │   └── TaskCard.jsx        # Individual task card
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   └── package.json
├── start.bat                        # Windows startup script
├── start.sh                         # Linux/Mac startup script
└── README.md
```

## 🔌 API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "TODO"
}
```

**Update Task:**
```json
PUT /api/tasks/:id
{
  "title": "Updated title",
  "status": "IN_PROGRESS"
}
```

## 🗄️ Database Schema

```prisma
model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([status])
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}
```

## 🎨 Technical Decisions

### 1. **@dnd-kit over react-beautiful-dnd**
   - **Reason**: @dnd-kit is actively maintained, has better TypeScript support, and works well with React 18's concurrent features. It's also more performant and accessible.

### 2. **Zod for Validation**
   - **Reason**: Zod provides runtime type safety, excellent error messages, and integrates seamlessly with TypeScript. It's more flexible than express-validator for complex validation scenarios.

### 3. **Prisma ORM**
   - **Reason**: Prisma offers type-safe database access, excellent developer experience, and automatic migrations. The Prisma Client provides IntelliSense and compile-time error checking.

### 4. **Optimistic UI Updates**
   - **Reason**: Provides instant feedback to users, making the app feel more responsive. Errors are handled gracefully with rollback via toast notifications.

### 5. **Inline Editing**
   - **Reason**: Reduces friction in task management. Users can quickly edit tasks without opening a modal, improving workflow efficiency.

### 6. **Premium SaaS Design**
   - **Reason**: Following Basco-inspired design principles ensures the application looks professional and modern. The minimalist approach with generous whitespace and subtle animations creates a calm, confident user experience.

## 🧪 Testing the Application

1. **Create Tasks**: Add multiple tasks with different statuses
2. **Drag & Drop**: Move tasks between columns
3. **Edit Tasks**: Click task titles or edit icons to modify tasks
4. **Delete Tasks**: Remove tasks and verify they're deleted
5. **Refresh Test**: Refresh the page - all data should persist
6. **Error Handling**: Try creating a task without a title (should show validation error)

## 🌐 Live Demo

**XORO is live and ready to use!**

- **🚀 Production URL**: [https://xoro-rho.vercel.app](https://xoro-rho.vercel.app)
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile
- **🎨 Premium Features** - Dark mode, search, focus mode, keyboard shortcuts
- **⚡ Instant Demo** - No login required, start managing tasks immediately

### Quick Demo Guide
1. **Visit** [https://xoro-rho.vercel.app](https://xoro-rho.vercel.app)
2. **Try Dark Mode** - Click the moon/sun icon in the header
3. **Test Search** - Press `Ctrl+K` or click the search icon
4. **Create Tasks** - Click "New Task" or press `Ctrl+N`
5. **Drag & Drop** - Move tasks between columns
6. **Mobile Test** - Resize browser to see responsive design

## 🚀 Deployment

### Backend Deployment (e.g., Railway, Render)

1. Set environment variables:
   - `DATABASE_URL`
   - `PORT`
   - `FRONTEND_URL`

2. Run migrations:
```bash
npx prisma migrate deploy
```

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set environment variable:
   - `VITE_API_URL` (your backend URL)

2. Build:
```bash
npm run build
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/kanban_db?schema=public"
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL in backend/.env is correct
- Run `npx prisma migrate dev` to create tables

### CORS Errors
- Check FRONTEND_URL in backend/.env matches your frontend URL
- Ensure backend server is running

### Port Already in Use
- Change PORT in backend/.env
- Update VITE_API_URL in frontend/.env accordingly

### Blank Page
- Check browser console for errors
- Verify backend server is running
- Check API connection in Network tab
- Ensure all dependencies are installed

## 📄 License

This project is built for a technical evaluation/hackathon.

## 👤 Author

Built as a full-stack demonstration project showcasing modern web development practices.

---

**Note**: This application is production-ready and demonstrates best practices in full-stack development, including proper error handling, validation, and user experience considerations.
