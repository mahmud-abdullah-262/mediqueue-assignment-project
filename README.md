# MediQueue — Tutor Booking System

**MediQueue** is a full-stack tutor booking web application where students can browse verified tutors, book online or offline learning sessions, and manage their scheduled classes — all from one place.

🌐 **Live Site:** [https://mediqueue-assignment-project.vercel.app/](https://mediqueue.vercel.app)

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password registration with strict password validation (uppercase, lowercase, minimum 6 characters) and one-click Google Sign-in, both secured with JWT tokens stored on the client side.

- 📅 **Smart Session Booking** — Students can book tutor sessions directly from the Tutor Details page. The system automatically validates slot availability and session start dates before confirming a booking, and decreases the slot count in real time after each successful booking.

<!-- - 🔍 **Search & Filter Tutors** — Find the right tutor instantly using case-insensitive name search powered by MongoDB `$regex`, or filter by session date range using `$gte` and `$lte` operators. -->

- 🧑‍🏫 **Tutor Management Dashboard** — Logged-in users can add new tutors, update existing tutor information through a pre-filled modal form, and delete tutors with a confirmation prompt — all without page reloads.

- 📋 **My Booked Sessions** — Each user has a personal sessions dashboard showing all their bookings with live status. Sessions can be cancelled at any time through a confirmation modal, which sends a PATCH request to update the booking status in the database.

<!-- - 🌙 **Dark / Light Theme** — A smooth theme toggle in the navbar applies across the entire application, with preference persisted in localStorage. -->

- ⚡ **Fully Responsive** — Optimized layout for mobile, tablet, and desktop screens across all pages.

---

## 🛠️ Tech Stack

### Client
- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroUI](https://www.heroui.com/)
- [Gravity UI Icons](https://gravity-ui.com/)
- [BetterAuth Authentication](https://better-auth.com/) (Email/Password + Google)
- [React DatePicker](https://reactdatepicker.com/)

### Server
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/) 
- [JSON Web Token (JWT)](https://jwt.io/)
- [CORS](https://www.npmjs.com/package/cors) + [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project (Authentication enabled)

### Client

```bash
git clone https://github.com/your-username/mediqueue-client
cd mediqueue-client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

```bash
npm run dev
```

### Server

```bash
git clone https://github.com/your-username/mediqueue-server
cd mediqueue-server
npm install
```

Create a `.env` file:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm run dev
```

---

## 🔐 Environment Variables

> ⚠️ Never commit `.env` or `.env.local` files to GitHub. Both are included in `.gitignore`.

---

## 📄 Pages Overview

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home with banner, tutors, and extra sections |
| `/tutors` | Public | Browse all tutors with search & filter |
| `/tutor/:id` | Private | Tutor details & booking |
| `/add-tutor` | Private | Add a new tutor |
| `/my-tutors` | Private | Manage your added tutors |
| `/my-booked-sessions` | Private | View & cancel your bookings |
| `/login` | Public | Login with email or Google |
| `/register` | Public | Register a new account |
| `/profile` | Private | View your profile |
| `*` | Public | 404 Not Found page |

---

## 🚀 Deployment

- **Client** → [Vercel](https://vercel.com/)
- **Server** → [Vercel](https://vercel.com/)



## 📁 Repository Links

- 🖥️ **Client:** [github.com/mediqueue-client](https://github.com/mahmud-abdullah-262/mediqueue-assignment-project)
- 🛠️ **Server:** [github.com/mediqueue-server](https://github.com/mahmud-abdullah-262/mediqueue-assignment-server)

---

## 👨‍💻 Author : Abdullah Al Mahmud

Built with ❤️ as part of **CAT_02** assignment in Complete Web Development BootCamp by Programing Here.
