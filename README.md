# Mini Event Scheduler with AI Categorization

A full-stack event scheduling application built with React, TypeScript, Tailwind CSS on the frontend, and Node.js, Express, TypeScript, MongoDB (Mongoose) on the backend.

Users can create, view, update (archive), and delete events such as meetings or reminders. Each event is automatically categorized as **Work**, **Personal**, or **Other** based on keywords in the title or notes, demonstrating simple AI/LLM-inspired integration.

## 🔗 Live Demo

Frontend: [https://minieventfrontend.vercel.app](https://minieventfrontend.vercel.app)  
Backend API: [https://minieventapi.onrender.com](https://minieventapi.onrender.com)


---

## Features

- Create, read, update (archive), and delete events (CRUD)
- AI-like categorization based on keyword matching
- Responsive, clean UI styled with Tailwind CSS
- Filter events by category (Work, Personal, Other)
- Basic error handling and notifications on the frontend
- Backend environment variable support
- Unit tests for the categorization logic using Jest

---

## Technology Stack

| Frontend                        | Backend                       |
| -------------------------------|------------------------------|
| React with TypeScript           | Node.js with TypeScript       |
| Tailwind CSS                   | Express.js                   |
| Vite (bundler & dev server)    | MongoDB with Mongoose ODM    |
| Jest (testing)                 | Jest (testing)               |

---

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios (for API calls)
- React Hook Form (for forms)
- Date-fns (for date handling)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (with Mongoose)
- CORS (for cross-origin requests)


---

---

## 🚀 API Endpoints

| Method | Endpoint         | Description                                  |
|--------|------------------|----------------------------------------------|
| GET    | `/events`        | Retrieves the list of all events             |
| POST   | `/events`        | Creates a new event                          |
| PUT    | `/events/:id`    | Updates the archive status of an event       |
| DELETE | `/events/:id`    | Deletes a specific event                     |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mhrhabibdev/minieventscheduler.git
cd minieventscheduler

2. Install client dependencies
cd client
npm install

3. Install server dependencies
cd ../server
npm install

4. Set environment variables
Create a .env file in /server directory:
PORT=8000
DATABASE_URL=your_mongodb_connection_string

Create a .env file in /client directory:
VITE_API_BASE_URL=http://localhost:8000

5. Run the development servers

In one terminal, run the backend:
cd server
npm run dev

In another terminal, run the frontend: 
cd client
npm run dev

6. Visit the app
Open your browser and go to:
http://localhost:5173

```

### 📁 Folder Structure

```
MINI-EVENT-SCHEDULER/
├── client/                        # Frontend (React + TypeScript + Vite)
│   ├── public/                    # Static files
│   └── src/
│       ├── assets/                # Images or static assets
│       ├── components/            # Reusable components
│       │   ├── Event/
│       │   ├── ManageEvents/
│       │   ├── Navbar/
│       │   └── ui/
│       ├── lib/                   # Utility functions or helpers
│       ├── pages/                 # Main route pages
│       ├── services/              # API integration (axios, etc.)
│       ├── types/                 # TypeScript types/interfaces
│       ├── App.tsx
│       └── index.css
│
├── server/                        # Backend (Express + TypeScript + MongoDB)
│   └── src/
│       ├── app/
│       │   ├── config/            # App configuration (DB, env)
│       │   ├── errors/            # Custom error handling
│       │   ├── interface/         # TypeScript interfaces
│       ├── middlewares/          # Express middlewares
│       ├── modules/
│       │   └── events/            # Event module
│       │       ├── event.constants.ts
│       │       ├── event.controller.ts
│       │       ├── event.interface.ts
│       │       ├── event.model.ts
│       │       ├── event.route.ts
│       │       ├── event.service.ts
│       │       └── event.validation.ts
│       ├── utils/                 # Helper utilities
│       ├── app.ts                 # Main app entry
│       └── server.ts              # Server bootstrap
```
###  Extra Features (Beyond Project Requirements)

- 🌙🔆 **Light/Dark Mode Support**
  - Integrated using `shadcn/ui` and `next-themes`.
  - Users can toggle between dark and light themes.

- 🧭 **Responsive Navbar**
  - Mobile-first responsive navigation bar.
  - Automatically highlights the current active route.

- 📦 **Footer Section**
  - Includes branding and useful links.
  - Fully responsive and matches the theme mode.

- 📋 **Event Management Table**
  - Displays all events in a well-structured table.
  - Users can view, edit, archive/unarchive, or delete events directly.

- 📄 **Pagination in Events Table**
  - Server-side pagination implemented for better performance.
  - Efficiently handles a large number of events without lag.
  - Includes `Previous` and `Next` buttons along with page numbers.


---
### Contact
For questions or support, please contact:
📧 mhrhabibdev@gmail.com
---





