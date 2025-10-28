# Movie & TV Show Dashboard

A full-stack web application built for an internship assignment. It allows users to manage a list of their favorite movies and TV shows with a feature-rich dashboard, infinite scrolling, and full CRUD functionality.

![Your App Screenshot Here](https://i.imgur.com/70809c.png)

---

## 🚀 Live Demo

You can view a live demo of the frontend here:
**[https://your-frontend-demo-url.com](https://your-frontend-demo-url.com)**

### ⚠️ A Note on the Live Demo Database

* This project was developed and tested using **MySQL** as per the assignment requirements.
* For the live demo, a **free Postgres (Neon)** database is used as a substitute, as free hosted MySQL instances are no longer readily available.
* The backend code is configured for **MySQL** by default. To run this project locally, please follow the MySQL setup instructions below.

---

## ✨ Features

* **Dashboard:** View quick statistics on your collection (Total Entries, Total Movies, Total TV Shows).
* **Full CRUD:** Add, Edit, and Delete entries with user-friendly modals.
* **True Infinite Scroll:** The table automatically fetches new entries as you scroll, using `react-intersection-observer` to detect scroll position and display skeleton loaders.
* **Duplicate Prevention:** The backend API checks for duplicate entries (based on title and year) before creating a new one.
* **Robust Validation:** Both frontend (with `React Hook Form` + `Zod`) and backend (with `Zod`) validation for all user input.
* **Modern UI:** Built with **Shadcn UI** and Tailwind CSS, including dark mode support.
* **Real-time Feedback:** Uses `sonner` (toast notifications) for all user actions (create, update, delete, error).

---

## 🛠️ Tech Stack

### Backend
* **Node.js**
* **Express**
* **MySQL** (Primary Database)
* **Prisma** (ORM)
* **Zod** (Schema Validation)

### Frontend
* **React (Vite)**
* **TypeScript**
* **Tailwind CSS v4**
* **Shadcn UI** (Component Library)
* **TanStack Query (React Query)** (Data Fetching & Caching)
* **React Hook Form** (Form Management)
* **Axios** (API Requests)

---

## 📦 Setup and Installation

This project is in two parts: `backend` and `frontend`. You must run both locally.

### 1. Backend (Local MySQL Setup)

**This is the required setup for the assignment.**

1.  **Navigate to the `backend` folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your MySQL Database:**
    * Make sure you have a local MySQL server running (e.g., MySQL Workbench, XAMPP).
    * Create a new, empty database named `movie_db`.

4.  **Configure Environment:**
    * Create a new file named `.env` in the `backend` folder.
    * Copy the contents of `.env.example` (if it exists) or use the template below.
    * Edit your `.env` file with your MySQL connection string:

    ```env
    # .env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/movie_db"
    
    # Example for a default local MySQL:
    # DATABASE_URL="mysql://root:your_password_here@localhost:3306/movie_db"
    ```

5.  **Run Database Migration:**
    This command will create all the tables in your `movie_db`.
    ```bash
    npx prisma migrate dev
    ```

6.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    ✅ The server will be running at `http://localhost:3001`

### 2. Frontend

1.  **Open a new terminal.**
2.  **Navigate to the `frontend` folder:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment:**
    * The `.env` file in the `frontend` folder is already set up to connect to your local backend. Its contents should be:
    ```env
    VITE_BACKEND_URL=http://localhost:3001/api
    ```

5.  **Start the Frontend Server:**
    ```bash
    npm run dev
    ```
    ✅ The app will be running at `http://localhost:5173`

You can now open `http://localhost:5173` in your browser and use the full application.

---

## 🌐 API Endpoints

The backend provides the following RESTful endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/entries/stats` | Get dashboard statistics (total counts). |
| `GET` | `/api/entries` | Get a paginated list of all entries (for infinite scroll). |
| `POST` | `/api/entries` | Create a new entry. |
| `PUT` | `/api/entries/:id` | Update an existing entry by its ID. |
| `DELETE` | `/api/entries/:id` | Delete an entry by its ID. |