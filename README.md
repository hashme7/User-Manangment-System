# User-Authentication-and-Management-system-MERN
# User Management System

This is a User Management System built with React,React-Redux, RTK Query for state management, JWT for authentication, Node js (express) for backend and Cloudinary for storing user profile pictures.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT
- Secure storage of user profile pictures using Cloudinary
- User registration and login
- Profile management
- Responsive design with Tailwind CSS
- State management using React-Redux and RTK Query

## Installation

### Prerequisites

- Node.js and npm installed
- Cloudinary account for storing profile pictures

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/user-management-system.git
    cd user-management-system/backend
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory with the following variable:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

1. Register a new user by visiting the `/register` route.
2. Login with the registered user credentials at the `/login` route.
3. After logging in, you can manage your profile and upload a profile picture.

## Configuration

### Cloudinary

To use Cloudinary for storing profile pictures, ensure you have the following in your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT
For JWT authentication, configure your JWT secret in the .env file:

env
Copy code
JWT_SECRET=your_jwt_secret
Folder Structure
arduino
Copy code
user-management-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── app/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── store.js
│   │   └── .env
│   ├── public/
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
