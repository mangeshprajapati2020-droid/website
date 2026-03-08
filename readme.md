# Website Project

A modern **Full Stack Web Application** built using JavaScript technologies.  
This project demonstrates authentication, API integration, and responsive UI design.

---

## 🚀 Features

- User Authentication using JWT
- Secure Login & Registration
- Responsive UI Design
- REST API Integration
- Protected Routes
- Modern Component-Based Frontend
- Backend API with Express

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)

---

## 📂 Project Structure

```
website/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1 Clone the repository

```bash
git clone https://github.com/mangeshprajapati2020-droid/website.git
```

### 2 Go to project directory

```bash
cd website
```

### 3 Install dependencies

```bash
npm install
```

### 4 Start the server

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🔐 Authorization Example

Send JWT token in request headers:

```
Authorization: Bearer <your_token>
```

Example using Axios:

```javascript
axios.get("/api/user", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

## 📸 Screenshots

Add screenshots of your application here.

```
/screenshots/home.png
/screenshots/dashboard.png
```

---

## 📈 Future Improvements

- Payment Gateway Integration
- Admin Dashboard
- Order Management
- Email Verification
- Deployment Setup

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

## 👨‍💻 Author

**Mangesh Prajapati**

GitHub:  
https://github.com/mangeshprajapati2020-droid

---

⭐ If you like this project, please give it a star on GitHub.