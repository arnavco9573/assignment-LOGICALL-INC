# Movie & TV Show Dashboard

A full-stack web application built for an internship assignment. It allows users to manage a list of their favorite movies and TV shows with a feature-rich dashboard, infinite scrolling, and full CRUD functionality.

The project is contained in this monorepo with two folders:
* `/backend`: The Express, Prisma, and MySQL API.
* `/frontend`: The React, Vite, and Shadcn UI.

---

## 🚀 Live Demo

A live demo of the frontend is deployed on **Vercel**:

**[https://your-frontend-demo-url.com](https://your-frontend-demo-url.com)**
*(You will need to deploy your frontend to Vercel/Netlify and paste the link here)*

### ⚠️ A Note on the Live Demo Database

* This project's assignment requirement is to use **MySQL**. The backend code in this repository is configured for **MySQL**.
* For the live demo, a **free Postgres (Neon)** database is being used as a substitute, as free hosted MySQL instances are no longer readily available.
* To run this project as intended, please follow the **Local Setup** instructions below to use MySQL.

---

## ✨ Features

* **Dashboard:** View quick statistics on your collection (Total Entries, Total Movies, Total TV Shows).
* **Full CRUD:** Add, Edit, and Delete entries with user-friendly modals.
* **True Infinite Scroll:** The table automatically fetches new entries as you scroll, using `react-intersection-observer` to display skeleton loaders.
* **Duplicate Prevention:** The API checks for duplicate entries (based on title and year) before creating a new one.
* **Robust Validation:** Both frontend (`React Hook Form` + `Zod`) and backend (`Zod`) validation for all user input.
* **Modern UI:** Built with **Shadcn UI** and Tailwind CSS, including dark mode support.
* **Real-time Feedback:** Uses `sonner` (toast notifications) for all user actions.

---

## 🛠️ Tech Stack

| Backend | Frontend |
| :--- | :--- |
| Node.js | React (Vite) |
| Express | TypeScript |
| **MySQL** | **Tailwind CSS v4** |
| Prisma (ORM) | **Shadcn UI** |
| Zod (Validation) | TanStack Query (React Query) |
| | React Hook Form |

---

## 📦 Local Setup & Installation

To run this project, you will need to run both the `backend` and `frontend` servers in two separate terminals.

### 1. Backend (Requires Local MySQL)

1.  **Navigate to the `backend` folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your MySQL Database:**
    * Make sure you have a local MySQL server running.
    * Create a new, empty database named `movie_db`.

4.  **Configure Environment:**
    * Create a new file named `.env` in the `backend` folder.
    * Add your MySQL connection string:

    ```env
    # backend/.env
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
    ✅ **Server will be running at `http://localhost:3001`**

### 2. Frontend

1.  **Open a new terminal.**
2.  **Navigate to the `frontend` folder from the root:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment:**
    * Create a new file named `.env` in the `frontend` folder.
    * Add the following line to connect to your local backend:
    ```env
    # frontend/.env
    VITE_BACKEND_URL=http://localhost:3001/api
    ```

5.  **Start the Frontend Server:**
    ```bash
    npm run dev
    ```
    ✅ **App will be running at `http://localhost:5173`**

You can now open `http://localhost:5173` in your browser.