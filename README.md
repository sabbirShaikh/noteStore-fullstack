# 📘 noteStore – MERN Stack Notes Management App

A full-stack notes management application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
noteStore allows users to **create, view, update, and delete notes** with a secure authentication system and a responsive UI.

## 🚀 Features

### ✅ User Authentication

- Signup & Login
- JWT-based secure authentication
- Protected routes

### 📝 Notes Management

- Create notes
- Edit notes
- Delete notes
- View all notes
- Markdown/text support (if applicable)

### 🎨 UI/UX

- Responsive React frontend
- Theme support (Light/Dark)
- Clean dashboard layout
- Highlights for completed/incompleted notes

### ⚙️ Backend Features

- REST API using Express
- MongoDB database
- Proper validation & error handling
- Environment variable security using `.env`

## 🧰 Tech Stack

### Frontend

- React.js
- React Router
- TailwindCSS / Bootstrap
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB / Mongoose

### Tools

- Git & GitHub
- Postman
- Vite 

## 📂 Folder Structure

```
noteStore/
  ├── backend/
  ├── frontend/
  ├── README.md
  └── .gitignore
```

## ⚙️ Environment Variables

```
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=8000
```

## 🚀 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/sabbirShaikh/noteStore-fullstack.git
cd noteStore
```

### 2. Install backend dependencies

```
cd backend
npm install
npm run dev
```

### 3. Install frontend dependencies

```
cd ../frontend
npm install
npm start
```

## 📡 API Endpoints

### Auth

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login user          |

### Notes

| Method   | Endpoint              | Description   |
| -------  | --------------------- | ------------- |
| GET      | /api/notes            | Get all notes |
| POST     | /api/notes            | Create a note |
| PUT      | /api/notes/:id        | Update a note |
| DELETE   | /api/notes/update/:id | Delete a note |
| COMPLETE | /api/notes/:id        | Delete a note |

## 📌 Future Improvements

- Add categories/labels
- Add search & filters
- Add cloud sync
- Add drag-and-drop UI
- Add reminder notifications

## 🤝 Contributing

Pull requests are welcome.

## 📜 License

MIT License.
