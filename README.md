# DSA Sheet Tracker (MERN Stack)

A full-stack web application to help users systematically track their progress while solving Data Structures and Algorithms problems. Built using MongoDB, Express.js, React.js, and Node.js.

---

## 🚀 Live Demo

> 🔗 [Frontend Live](https://apna-college-assignment.netlify.app/)  
> 🔗 [Backend API](https://dsa-assign-be-production.up.railway.app)

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** with Vite
- **React Router** for routing
- **Axios** for HTTP requests

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **bcryptjs** for password hashing

---

## ✨ Features

- ✅ User Authentication (Login)
- ✅ Track Topics → Subtopics (Problems)
- ✅ Mark Subtopics as completed
- ✅ Track Completion Progress of Subtopics
- ✅ Fully connected RESTful API
- ✅ JWT-secured protected routes
- ✅ Responsive UI

---

## 📁 Folder Structure

```bash

DSA-ASSIGN-FE/         # Frontend (React)
├── src/
│   ├── app/          
│   ├── features/      
│   ├── pages/         # Login, Dashboard, progress
│   └── components/    # UI Components

DSA-ASSIGN-BE/         # Backend (Node.js + Express)
├── routes/            # API Routes
├── controllers/       # Logic for routes
├── models/            # Mongoose schemas
├── middleware/        # Auth middleware
└── seed.js            # Seed mock data to DB

```

```bash
# Clone frontend project
$ git clone https://github.com/Rahul1905-sk/DSA-ASSIGN-FE.git

# Access
$ cd assign-fe

# Install dependencies
$ npm i 

# .env
Add VITE_BE_URL =  (backend url)


# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:5173>

# Mock Credentials

$ email: rahul@gmail.com
$ password: Rahul@123

```

```bash
# Clone backend project
$ git clone https://github.com/Rahul1905-sk/DSA-ASSIGN-BE.git

# Access
$ cd assign-be

# Install dependencies
$ npm i 

# .env
Add mongoUrl and PORT = 8080 

# To save dummy data in mongoDB
$ node seed.js


# Run the project
$ node index.js

# The server will initialize in the <http://localhost:5173>
```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/Rahul1905-sk" target="_blank">Rahul Singh Kushwah</a>

&#xa0;

<a href="#top">Back to top</a>
