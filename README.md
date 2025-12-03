# Wellora – A Personal Fitness and Exercise Dashboard

## Problem Statement
In today’s digital age, many individuals struggle to maintain consistent fitness habits and access reliable workout content. Most fitness platforms either lack personalization or fail to combine data-driven tracking with engaging workout resources.

**Wellora** aims to help users stay motivated and healthy by providing an all-in-one dashboard for tracking fitness goals, exploring exercise videos (via YouTube integration), and monitoring personal progress through visual analytics and insights.

---

## System Architecture
**Flow:** Frontend → Backend (API) → Database

*   **Frontend:** Next.js (React framework) with dynamic routing, Tailwind CSS for styling, and Recharts for data visualization.
*   **Backend:** Node.js + Express.js REST API.
*   **Database:** MongoDB with Mongoose ODM.
*   **Authentication:** JWT-based secure login/signup.

### Hosting
*   **Frontend:** Vercel
*   **Backend:** Render
*   **Database:** MongoDB Atlas

---

## Key Features

### Authentication & Authorization
Secure user registration, login, and logout with encrypted passwords and JWT session handling.

### Exercise Video Integration
Embedded YouTube workout and fitness videos fetched dynamically using the YouTube Data API.

### Fitness Tracking
Log and view exercise sessions, calories burnt, and daily activity summaries.

### Dynamic Fetching
Real-time fetching of data across pages for exercises, analytics, and progress reports.

### Searching, Sorting, Filtering, Pagination
Users can search for workouts, filter by category (e.g., Yoga, Cardio, Strength), sort by popularity or duration, and browse results with pagination.

### Data Visualization
Recharts-based graphs showing progress over time — calories, workout duration, frequency.

### Analytics Dashboard
Summary cards for average daily activity, best-performing workouts, and goal progress.

### Frontend Routing
Pages: Home, Login, Register, Dashboard, Workouts, Analytics, Profile.

### Reminders (Future Enhancement)
Optional reminders for workouts or hydration goals.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT |
| **Video Integration** | YouTube Data API |
| **Charts & Visualization** | Recharts / Chart.js |
| **Hosting** | Frontend: Vercel, Backend: Render, Database: MongoDB Atlas |

---

## API Overview

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/workouts` | GET | Fetch all workouts (with search, filter, sort, pagination) | Authenticated |
| `/api/workouts/:id` | GET | Get workout details | Authenticated |
| `/api/logs` | POST | Add workout log | Authenticated |
| `/api/logs/:id` | PUT | Update workout log | Authenticated |
| `/api/logs/:id` | DELETE | Delete workout log | Authenticated |
| `/api/user/profile` | GET | Get user profile details | Authenticated |
