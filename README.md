# Real-Time Chat Application

A full-stack real-time messaging application that enables users to communicate through one-to-one conversations. It features instant message delivery, live online-user status, persistent chat history, profile customization, and multiple UI themes.

## Live Demo

**[Open Real-Time Chat Application](https://real-time-chat-app-hmg9.onrender.com)**

## Features

- **User Authentication:** Secure signup, login, and logout using JWT and HTTP-only cookies.
- **Real-Time Messaging:** Send and receive messages instantly using Socket.IO without refreshing the page.
- **Online User Status:** View users who are currently online.
- **Persistent Chat History:** Store and retrieve conversations using MongoDB.
- **Profile Management:** Update profile information and upload profile pictures.
- **Image Uploads:** Store and manage uploaded images using Cloudinary.
- **Theme Customization:** Choose from multiple application themes.
- **Protected Routes:** Restrict access to authenticated users.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS, DaisyUI |
| State Management | Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Real-Time Communication | Socket.IO |
| Authentication | JWT, bcrypt, HTTP-only cookies |
| Image Storage | Cloudinary |
| HTTP Client | Axios |

## Project Structure

```text
real-time-chat-app/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── seeds/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── lib/
│       ├── pages/
│       └── store/
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- Node.js and npm
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/Aditi-Sachdeva/real-time-chat-app.git
cd real-time-chat-app
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the following environment variables:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

The backend will run at `http://localhost:5001`.

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Application API

The backend provides REST API endpoints for authentication, profile management, user discovery, and messaging.

| Module | Functionality |
|---|---|
| Authentication | Signup, login, logout, and session verification |
| User Management | Fetch users and update profiles |
| Messaging | Send messages and retrieve conversations |

Real-time message delivery and online-user updates are handled through Socket.IO.

## Real-Time Communication

Socket.IO enables bidirectional communication between connected clients.

- Authenticated users establish socket connections.
- Online-user information is updated when users connect or disconnect.
- New messages are delivered instantly to the intended recipient.
- Message history is persisted in MongoDB.

## Production Build

To generate an optimized production build of the frontend:

```bash
cd frontend
npm run build
```

The generated production files are stored in `frontend/dist`.

## Deployment

The application is deployed on **Render** as a single web service.

- The React frontend is built using Vite.
- The Express backend serves the production frontend build.
- REST API requests and Socket.IO connections are handled by the backend.
- MongoDB Atlas provides persistent database storage.
- Cloudinary handles image storage.

**Live Application:** [https://real-time-chat-app-hmg9.onrender.com](https://real-time-chat-app-hmg9.onrender.com)

## Security

- Password hashing using bcrypt.
- JWT-based authentication.
- HTTP-only authentication cookies.
- Protected backend routes.
- Environment variables for sensitive configuration.

## Author

**Aditi Sachdeva**

- **GitHub:** [Aditi-Sachdeva](https://github.com/Aditi-Sachdeva)
- **Repository:** [Real-Time Chat Application](https://github.com/Aditi-Sachdeva/real-time-chat-app)

---

If you found this project useful, consider giving the repository a star!