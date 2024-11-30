# 🎬 CineTrack

**CineTrack** is a modern web application designed to help users manage their personal movie and TV show watchlists. Track what you've watched, rate and review your favorite content, and discover new recommendations effortlessly. Built with cutting-edge technologies like Next.js, TypeScript, Tailwind CSS, Node.js, and MongoDB, CineTrack offers a seamless and responsive user experience.

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
- **State Management**: React Context API or Redux (optional) - Manage global state efficiently.
- **API Integration**: Axios or Fetch API - Handle HTTP requests to the backend and external APIs.

### Backend

- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime for building scalable network applications.
- **Framework**: [Express.js](https://expressjs.com/) - Minimalist web framework for Node.js.
- **Database**: [MongoDB](https://www.mongodb.com/) (via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) - NoSQL database for flexible data modeling.
- **ODM**: [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.

### External Services

- **TMDB API**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) - Fetch movie and TV show data, including details, images, and trailers.
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Implement JWT for secure authentication (if opting for JWT over cookies).

### Authentication

- **Cookie-Based Authentication**
  - **Session Management**: Use HTTP-only cookies to store session tokens securely.
  - **Security**: Implement measures to prevent CSRF and XSS attacks.
- **Libraries**:
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - For hashing user passwords.
  - [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse and manage cookies in Express.js.

---
