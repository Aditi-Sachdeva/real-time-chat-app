# Real-Time Chat Application

A full-stack real-time messaging application that allows users to communicate through one-to-one conversations. It provides instant message delivery, live online-user status, persistent chat history, profile customization, and multiple UI themes.

## Features

- **User Authentication:** Secure signup, login, and logout functionality using JWT and HTTP-only cookies.
- **Real-Time Messaging:** Send and receive messages instantly using Socket.IO without refreshing the page.
- **Online User Status:** See which users are currently online.
- **Persistent Chat History:** Store and retrieve conversations using MongoDB.
- **Profile Management:** Update profile information and upload profile pictures.
- **Image Uploads:** Store uploaded images using Cloudinary.
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

Follow these steps to run the project locally.

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

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

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

The backend will run on:

`http://localhost:5001`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

`http://localhost:5173`

## Application API

The backend provides REST API endpoints for authentication, profile management, user discovery, and messaging.

| Module | Functionality |
|---|---|
| Authentication | Signup, login, logout, session verification |
| User Management | Fetch users and update profiles |
| Messaging | Send messages and retrieve conversations |

Real-time message delivery and online-user updates are handled through Socket.IO.

## Real-Time Communication

Socket.IO enables bidirectional communication between connected clients.

- Authenticated users establish socket connections.
- Online-user information is updated when users connect or disconnect.
- New messages are delivered instantly to the intended recipient.
- Message history is persisted in MongoDB.

## Build

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

The production-ready files are generated in the `frontend/dist` directory.

## Security

- Password hashing using bcrypt.
- JWT-based authentication.
- HTTP-only authentication cookies.
- Protected backend routes.
- Environment variables for sensitive configuration.

## Future Deployment

The application is prepared for production deployment. The live application URL will be added here after deployment.

## Author

**Aditi Sachdeva**

GitHub: [Aditi-Sachdeva](https://github.com/Aditi-Sachdeva)

---

If you found this project useful, consider giving the repository a star!