# 📦 Feedback Collection Tool – Full Stack Project

A full-featured feedback collection platform built using the **MERN stack** (MongoDB, Express, React, Node.js).

It enables users to submit anonymous feedback with star ratings, and provides an **admin panel** to view, filter, sort, and visualize the feedback in real-time.

---

## 🚀 Features

### 🧑‍💻 User Side:

* Anonymous feedback form
* Fields: Name (optional), Email (optional), Product (required), Feedback (required), Rating (1–5)
* Form validation using Yup + React Hook Form
* Displays thank-you message and auto-redirects to home
* Clean UI using plain CSS (no Tailwind)

### 🛠 Admin Panel:

* Secure JWT login
* View all feedback entries
* Search by product name
* Sort by date, rating, product name
* Pagination support (5 per page)
* Charts (Bar + Pie) showing average rating and feedback counts
* Logout functionality
* Real-time updates via Socket.IO

---

## 🗂 Folder Structure

```
frontend/
├── src/
│   ├── components/          # FeedbackForm, StarRating, AdminCharts
│   ├── contexts/            # AuthContext for token management
│   ├── pages/               # Home, FeedbackPage, LoginPage, AdminDashboard
│   ├── services/            # API layer (axios)
│   ├── App.js               # Route setup
│   ├── index.css            # Global styling
│   └── index.js             # CRA entry
├── .env                     # REACT_APP_API_URL
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/feedback-tool.git
cd feedback-tool
```

### 2. Set up backend (in `/backend` folder)

```bash
npm install
npm run dev
```

Make sure `.env` includes:

```
MONGO_URI=<your mongodb url>
JWT_SECRET=<your_jwt_secret>
```

### 3. Set up frontend (in `/frontend` folder)

```bash
npm install
npm start
```

Add a `.env` in `frontend/`:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🧪 Testing

* Visit `http://localhost:3000` to start
* Use `/feedback` for user form
* Use `/login` for admin login
* Use `/admin` to access admin dashboard

Create an admin in your database manually:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

> 🔐 Passwords are stored in plaintext for demo. Use bcrypt in production.

---

## 📊 Dependencies

### Frontend:

* React, React Router DOM
* Axios, Socket.IO-Client
* Chart.js, react-chartjs-2
* react-hook-form, yup

### Backend:

* Express, Mongoose, dotenv
* JWT, bcrypt (optional)
* Socket.IO

---

## 📦 Deployment Suggestions

* **Frontend**: Vercel or Netlify
* **Backend**: Render, Railway, or cyclic.sh
* Add CORS and production base URL in `.env` files

---

## 🙏 Credits

Developed by \[Your Name] as part of the Shelfex Internship Full-Stack Task Series.

---

## 📃 License

This project is open-source and free to use under the MIT License.
