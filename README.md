# 📝 Notes Application - MERN Stack

A full-stack notes management application built with MongoDB, Express.js, React, and Node.js. Users can create, edit, delete, and search their personal notes with a beautiful, modern interface.

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing

### 📝 Note Management
- Create new notes with title, content, and tags
- Edit existing notes
- Delete notes with confirmation dialog
- Search notes by title, content, or tags
- Pre-selected popular tags for quick selection

### 🎨 User Interface
- Modern, responsive design
- Dark mode support
- Beautiful note cards with visual indicators
- Professional modal dialogs
- Loading states and error handling
- Mobile-friendly interface

### 🔍 Advanced Features
- Real-time search functionality
- Tag-based organization
- Note sorting by creation/update date
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing
- **Lucide React** - Icons

## 📁 Project Structure

```
RafayPojectMernStackDeveloper/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # Database configuration
│   │   ├── controllers/
│   │   │   ├── noteController.ts  # Note CRUD operations
│   │   │   └── Usercontroller.ts  # User authentication
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts  # JWT authentication
│   │   ├── models/
│   │   │   ├── Note.ts            # Note schema
│   │   │   └── Usermodel.ts       # User schema
│   │   ├── routes/
│   │   │   ├── noteRoutes.ts      # Note API routes
│   │   │   └── userRoutes.ts      # User API routes
│   │   └── server.ts              # Express server setup
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # Reusable UI components
│   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteModal.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx      # Main notes page
│   │   │   ├── Login.tsx          # Login page
│   │   │   └── signup.tsx         # Registration page
│   │   ├── services/
│   │   │   ├── api.ts             # Axios configuration
│   │   │   ├── authService.ts     # Authentication API
│   │   │   └── noteService.ts     # Notes API
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RafayPojectMernStackDeveloper
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=7000
   MONGODB_URI=mongodb://localhost:27017/notesapp
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

5. **Database Setup**
   
   Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env` to your MongoDB Atlas connection string.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:7000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Notes Endpoints

All note endpoints require authentication. Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Notes
```
GET /api/notes
```

#### Create Note
```
POST /api/notes
Content-Type: application/json

{
  "title": "My Note Title",
  "content": "Note content here...",
  "tags": ["important", "work", "personal"]
}
```

#### Update Note
```
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["updated", "modified"]
}
```

#### Delete Note
```
DELETE /api/notes/:id
```

#### Search Notes
```
GET /api/notes/search?q=search_term
```

## 🎯 Usage Guide

### 1. Registration/Login
- Create a new account or login with existing credentials
- JWT token is automatically stored and managed

### 2. Creating Notes
- Click "Create Note" button
- Fill in title and content
- Add tags using the input field or click popular tags
- Pre-selected tags: "important", "work", "personal"

### 3. Managing Notes
- View all notes on the dashboard
- Edit notes by clicking the edit button
- Delete notes with confirmation dialog
- Search notes using the search bar

### 4. Search Functionality
- Search by note title, content, or tags
- Real-time filtering as you type
- Case-insensitive search

## 🔧 Development

### Backend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🗄️ Database Schema

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required, hashed)
  createdAt: Date
  updatedAt: Date
}
```

### Note Model
```typescript
{
  title: string (required, 1-200 characters)
  content: string (required, min 1 character)
  tags: string[] (optional, max 50 chars per tag)
  userId: ObjectId (required, references User)
  createdAt: Date
  updatedAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🎨 UI Components

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Automatic theme detection
- **Loading States**: User feedback during API calls
- **Error Handling**: Graceful error messages
- **Confirmation Dialogs**: Prevent accidental deletions
- **Toast Notifications**: Success/error feedback

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rafay**
- Full Stack Developer
- MERN Stack Specialist

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solutions
- Express.js for the powerful backend framework
- Tailwind CSS for beautiful styling utilities

---

**Happy Note Taking! 📝✨**
