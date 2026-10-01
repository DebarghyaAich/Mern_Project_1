# MERN Practice Project

A full-stack practice project built using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js). This repository contains the backend and API foundation configured with Express and Mongoose.

---

## 🚀 Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/)
- **Backend Framework:** [Express.js](https://expressjs.com/) (v5.x)
- **Database Object Modeling:** [Mongoose](https://mongoosejs.com/) (v9.x) / [MongoDB](https://www.mongodb.com/)
- **Frontend:** React *(Upcoming)*

---

## 📁 Project Structure

```text
Mern_practice_project/
├── public/              # Static files and assets
├── src/                 # Application source code
│   ├── app.js           # Express app configuration
│   ├── constants.js     # Project constants
│   └── index.js         # Server entry point
├── .env.sample          # Environment variables sample
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency lockfile
└── README.md            # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (v9.x or later)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DebarghyaAich/Mern_Project_1.git
   cd Mern_Project_1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern_practice
   ```

---

## 📌 Development Roadmap

- [x] Project initialization & environment setup
- [x] Express & Mongoose dependency configuration
- [x] Git repository setup
- [ ] Server entry point (`src/index.js`) and database connection
- [ ] RESTful API routes & controllers
- [ ] User authentication (JWT & bcrypt)
- [ ] React frontend setup & integration

---

## 👤 Author

**Debarghya Aich**
- GitHub: [@DebarghyaAich](https://github.com/DebarghyaAich)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
