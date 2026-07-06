# RepoHub Frontend 🚀

A modern, high-performance, and visually stunning web application for browsing, searching, and managing a large-scale GitHub code dataset. Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, this application serves as the frontend interface for the [GitHub Dataset API](../backend/README.md).

---

## 🎨 Design & UX Features

RepoHub is designed with modern web aesthetics in mind, incorporating:
- **🌓 Dynamic Theme Toggle:** Seamless switching between responsive dark and light modes using a context-based state manager.
- **✨ Smooth Animations:** Powered by **Framer Motion** for polished micro-interactions, page transitions, and card load sequences.
- **📱 Responsive Layout:** Mobile-friendly layouts with a collapsible navigation menu (`MobileMenu.jsx`) for seamless viewing on all device sizes.
- **📦 Lucide Iconography:** Clean SVG-based indicators for categories, file types, programming languages, and operations.

---

## 🛠️ Core Functionality

### 1. Dataset Explorer
- **Dynamic Search & Filtering:** Filter datasets on-the-fly by programming language, development framework, category, entry type, and search queries using `FilterBar.jsx`.
- **Paginated Browsing:** High-performance pagination to effortlessly browse through thousands of dataset records.
- **Detail Inspection:** Dive into a specific dataset item to view full code instructions, input payloads, and output solutions with copy-to-clipboard functionality.

### 2. User Authentication & Authorization
- **Secure Sessions:** JWT-based user authentication stored securely in localStorage, with Axios interceptors managing token injection and token expiration.
- **Route Guards:**
  - `ProtectedRoute`: Prevents unauthenticated users from accessing profile and management pages.
  - `GuestRoute`: Redirects authenticated users away from login, signup, and password reset views.
- **Password Recovery:** Comprehensive OTP-based password retrieval workflow (Request OTP -> Reset Password).

### 3. User Dashboard & Profile
- **Account Settings:** Allows users to view and update their profile details (Name, Email).
- **Security Control:** Dedicated UI to change the account password safely with old password validation.

---

## 📁 Project Structure

The project code is organized as follows:

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── auth/            # Auth-related forms (Login, Signup, Reset Password)
│   │   ├── layout/          # Layout wrappers (Navbar, Footer, Protected/Guest Routes)
│   │   ├── sections/        # Section-specific components (Hero, Features, DatasetGrid, CTA)
│   │   └── ui/              # Reusable base components (Buttons, Inputs, Cards)
│   ├── context/             # AuthContext and ThemeContext providers
│   ├── data/                # Static UI constants and mock lists
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Core utilities (Axios client, Framer Motion settings, React Query client)
│   ├── pages/               # Top-level route views (Home, About, Profile, Datasets, etc.)
│   ├── App.jsx              # Main routing and provider setup
│   ├── index.css            # Global CSS, Tailwind setup, and theme variables
│   └── main.jsx             # React entry mount point
├── .env.example             # Example environment variables file
├── package.json             # NPM dependencies & scripts config
└── vite.config.js           # Vite development and bundler configuration
```

---

## 💻 Tech Stack

- **Framework:** React 19 (Functional components, hooks, Context API)
- **Build Tool:** Vite 8 (Ultra-fast HMR and building)
- **Styling:** Tailwind CSS v4 + Vanilla CSS custom variables
- **Router:** React Router DOM v7
- **State Management:** TanStack React Query v5 (Caching, automatic re-fetching)
- **HTTP Client:** Axios (With custom header & response interceptors)
- **Animation:** Framer Motion v12

---

## 🚀 Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) and the [GitHub Dataset API](../backend/README.md) running.

### 1. Install Dependencies
Navigate to the `frontend` folder and install NPM packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the `frontend` folder:
```bash
cp .env.example .env
```
Open `.env` and set the backend API address:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Run Development Server
Start the Vite local development server:
```bash
npm run dev
```
The application will be accessible at [http://localhost:5173](http://localhost:5173).

---

## 📦 Available NPM Scripts

| Command | Action |
|---|---|
| `npm run dev` | Runs the application in development mode with HMR |
| `npm run build` | Bundles the application into production-ready static assets in `/dist` |
| `npm run lint` | Runs ESLint check across all codebase |
| `npm run preview` | Serves the production build folder locally for verification |

---

## 🔒 Security & Best Practices

- **Session Handling:** Authentication tokens (`repohub_token`) and user metadata (`repohub_user`) are securely persisted. The app detects standard `401 Unauthorized` responses and logs the user out automatically.
- **Routing Safety:** Layout-level route checks prevent flash of unauthenticated contents before user validation completes.
- **API Optimization:** TanStack React Query handles client-side caching of dataset lists, details, and analytics parameters to minimize redundant backend network traffic.
