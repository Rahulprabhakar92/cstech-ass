# Full-Stack Project: Next.js (Frontend) & Express.js (Backend)

## Project Overview
This repository contains a **full-stack application** with:
- **Frontend:** Next.js (React-based framework)
- **Backend:** Express.js (Node.js framework)

The frontend and backend are in separate directories but work together seamlessly.

## Folder Structure
```
/my-fullstack-app
   /frontend  (Next.js Application)
   /backend   (Express.js API Server)
```

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/Rahulprabhakar92/cstech-asso.git
```

---

## Frontend (Next.js Setup)

### 1. Navigate to the `frontend` folder
```sh
cd frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Development Server
```sh
npm run dev
```
- The Next.js app will run at `http://localhost:3000`

### 4. Build for Production
```sh
npm run build
npm start
```

---

## Backend (Express.js Setup)

### 1. Navigate to the `backend` folder
```sh
cd ../backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Server
```sh
node index.js
```
- The Express API will run at `http://localhost:5000`

### 4. Run with Nodemon (for auto-restart on file changes)
```sh
npm install -g nodemon
nodemon index.js
```

---

## Connecting Frontend & Backend
1. Update API calls in Next.js to point to the backend server (e.g., `http://localhost:5000/api/...`).
2. Use **CORS** middleware in Express.js to allow frontend requests:
```js
const cors = require('cors');
app.use(cors());
```

---

## Deployment
### Deploy Frontend (Next.js)
- **Vercel:** `vercel deploy`
- **Netlify:** `netlify deploy`

### Deploy Backend (Express.js)
- **Render:** `render.com`
- **Heroku:** `git push heroku main`

---

## Author
-Gprahul
- GitHub: [RahulPrabhakar92](https://github.com/Rahulprabhakar92)

---

## License
This project is licensed under the MIT License.

