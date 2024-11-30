# 🎬 CineTrack

**CineTrack** is a modern web application designed to help users manage their personal movie and TV show watchlists. Track what you've watched, rate and review your favorite content, and discover new recommendations effortlessly. Built with cutting-edge technologies like Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and Firebase, CineTrack offers a seamless and responsive user experience.

![CineTrack Banner](docs/images/banner.webp)

---

## 📋 Table of Contents

- [🎬 CineTrack](#-cinetrack)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
    - [🎥 Core Features](#-core-features)
    - [🔍 Discover Features](#-discover-features)
    - [🔎 Search & Explore](#-search--explore)
    - [📊 User Dashboard](#-user-dashboard)
    - [🔐 Authentication](#-authentication)
    - [🌐 Optional Additions](#-optional-additions)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [External Services](#external-services)
    - [Authentication](#authentication)
  - [📂 Repository Structure](#-repository-structure)
  - [⚙️ Setup Instructions](#️-setup-instructions)
    - [📋 Prerequisites](#-prerequisites)
    - [🚀 Frontend Setup](#-frontend-setup)
    - [🚀 Backend Setup](#-backend-setup)
    - [🛠️ Running the Project](#️-running-the-project)
  - [📚 API Documentation](#-api-documentation)
    - [🔐 Authentication Endpoints](#-authentication-endpoints)
    - [📋 Watchlist Endpoints](#-watchlist-endpoints)
    - [🔍 Recommendation Endpoints](#-recommendation-endpoints)
    - [🔎 Search Endpoints](#-search-endpoints)
  - [📸 Screenshots and Demos](#-screenshots-and-demos)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📝 Acknowledgements](#-acknowledgements)

---

## 🚀 Features

### 🎥 Core Features

- **Watchlist Management**
  - **Add/Remove Content**: Easily add movies and TV shows to your watchlist or remove them as desired.
  - **Mark as Watched/Unwatched**: Keep track of what you've already watched and what’s pending.
  - **Rate & Review**: Provide ratings and write reviews for your favorite content.
  - **Progress Tracking**: For TV shows, track your progress per season and episode.
  - **Filter & Sort**: Organize your watchlist by genre, rating, watch status, and more.

### 🔍 Discover Features

- **Personalized Recommendations**: Get suggestions based on your ratings, genres, and viewing history.
- **Trending Content**: Explore the latest trending movies and TV shows fetched from the TMDB API.

### 🔎 Search & Explore

- **Advanced Search**: Search for movies and TV shows by title with autocomplete suggestions.
- **Detailed Information**: View comprehensive details about each movie or TV show, including cast, synopsis, and trailers.

### 📊 User Dashboard

- **Personal Statistics**
  - **Total Watched**: See the total number of movies and shows you've watched.
  - **Top Genres**: Discover which genres you watch the most.
- **Recent Activity**: Quickly access your recently watched content.
- **Wishlist Overview**: View and manage your pending watchlist items.

### 🔐 Authentication

- **Secure Login/Signup**: Create an account or log in using email and password with secure cookie-based sessions.
- **Protected Routes**: Ensure that only authenticated users can access and manage their watchlists.
- **Password Management**: Implement password hashing and validation for enhanced security.

### 🌐 Optional Additions

- **Social Features**
  - **Share Watchlists**: Share your watchlist with friends or the community.
  - **Follow Users**: Follow other users to see their watchlists and reviews.
- **Admin Panel**
  - **Manage Content**: Admins can add, update, or remove genres, movies, and TV shows.
  - **Moderate Reviews**: Oversee user reviews and ratings to maintain content quality.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) - Server-side rendering and static site generation.
- **Language**: TypeScript - Strongly typed JavaScript for better code quality.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Manage global state efficiently.
- **Data Fetching**: [React Query](https://react-query.tanstack.com/) - Fetch, cache, and update data in React applications.
- **UI Components**:
  - [Headless UI](https://headlessui.com/) - Accessible and unstyled UI components.
  - [React Icons](https://react-icons.github.io/react-icons/) - Include popular icons in your React projects.
- **Form Management**: [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) - Handle forms and validation seamlessly.
- **API Integration**: Axios or Fetch API - Handle HTTP requests to the backend and external APIs.
- **Image Handling**: [Next/Image](https://nextjs.org/docs/api-reference/next/image) - Optimized image handling for better performance.

### Backend

- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime for building scalable network applications.
- **Framework**: [Express.js](https://expressjs.com/) - Minimalist web framework for Node.js.
- **Database**: [MongoDB](https://www.mongodb.com/) (via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) - NoSQL database for flexible data modeling.
- **ODM**: [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- **Storage**: [Firebase Storage](https://firebase.google.com/products/storage) - Store and serve user-uploaded content.
- **Encryption**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - For hashing user passwords. Additional encryption libraries as needed.

### External Services

- **TMDB API**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) - Fetch movie and TV show data, including details, images, and trailers.
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Implement JWT for secure authentication (if opting for JWT over cookies).

### Authentication

- **Cookie-Based Authentication**
  - **Session Management**: Use [cookies-next](https://github.com/martinus/cookies-next) for handling cookies in Next.js.
  - **Security**: Implement measures to prevent CSRF and XSS attacks.
- **Libraries**:
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - For hashing user passwords.
  - [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse and manage cookies in Express.js.

---

## 📂 Repository Structure

---

## ⚙️ Setup Instructions

### 📋 Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Firebase** account for storage
- **TMDB API Key**

### 🚀 Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the `frontend` directory with the following variables:

   ```env
   NEXT_PUBLIC_.......
   NEXT_PUBLIC_.......
   NEXT_PUBLIC_.......
   ```

4. **Run the Frontend**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be available at `http://localhost:3000`.

### 🚀 Backend Setup

1. **Navigate to Backend Directory**

   ```bash
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the Backend**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The backend API will be available at `http://localhost:5000/api`.

### 🛠️ Running the Project

1. **Start Both Frontend and Backend**

   - Open two terminal windows or tabs.
   - In the first terminal, start the backend:

     ```bash
     cd backend
     npm run dev
     ```

   - In the second terminal, start the frontend:

     ```bash
     cd frontend
     npm run dev
     ```

2. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to access CineTrack.

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

- **POST** `/api/auth/signup`

  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    - **201 Created**: User registered successfully.
    - **400 Bad Request**: Validation errors.

- **POST** `/api/auth/login`

  - **Description**: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    - **200 OK**: Logged in successfully, sets authentication cookie.
    - **401 Unauthorized**: Invalid credentials.

- **POST** `/api/auth/logout`
  - **Description**: Log out the current user.
  - **Response**:
    - **200 OK**: Logged out successfully.

### 📋 Watchlist Endpoints

- **GET** `/api/watchlist`

  - **Description**: Retrieve the user's watchlist.
  - **Authentication**: Required.
  - **Response**:
    - **200 OK**: Returns an array of watchlist items.

- **POST** `/api/watchlist`

  - **Description**: Add a new item to the watchlist.
  - **Authentication**: Required.
  - **Request Body**:
    ```json
    {
      "tmdbId": "123456",
      "type": "movie",
      "status": "unwatched"
    }
    ```
  - **Response**:
    - **201 Created**: Item added successfully.
    - **400 Bad Request**: Validation errors.

- **PUT** `/api/watchlist/:id`

  - **Description**: Update a watchlist item.
  - **Authentication**: Required.
  - **Request Body**: Fields to update (e.g., status, rating, review).
  - **Response**:
    - **200 OK**: Item updated successfully.
    - **404 Not Found**: Item not found.

- **DELETE** `/api/watchlist/:id`
  - **Description**: Remove an item from the watchlist.
  - **Authentication**: Required.
  - **Response**:
    - **200 OK**: Item removed successfully.
    - **404 Not Found**: Item not found.

### 🔍 Recommendation Endpoints

- **GET** `/api/recommendations`
  - **Description**: Get personalized recommendations for the user.
  - **Authentication**: Required.
  - **Response**:
    - **200 OK**: Returns an array of recommended items.

### 🔎 Search Endpoints

- **GET** `/api/search`
  - **Description**: Search for movies and TV shows.
  - **Query Parameters**:
    - `query` (string): The search term.
    - `type` (string): 'movie' or 'tv'.
  - **Response**:
    - **200 OK**: Returns search results with autocomplete suggestions.

---

## 📸 Screenshots and Demos

_Screenshots and GIFs showcasing different parts of the application._

![Watchlist](docs/images/preview_1.webp)
![User Dashboard](docs/images/preview_2.webp)
![Search and Explore](docs/images/preview_3.webp)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📝 Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
- [Headless UI](https://headlessui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://react-query.tanstack.com/)

---
