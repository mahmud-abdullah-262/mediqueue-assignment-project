# MediQueue — Step-by-Step Project Plan

## ডিজাইন সারসংক্ষেপ

| বিষয় | বিবরণ |
|---|---|
| **Font Family** | Outfit |
| **Primary Color** | #7C3AED (বেগুনি) |
| **Secondary Color** |rgb(199, 167, 249) |
| **Accent Color** | #22C55E (সবুজ) |
| **Background** | #FAF5FF (হালকা বেগুনি-সাদা) |
| **Text Color** | #1E1B4B (গাঢ় নেভি) |

### পেজ তালিকা (Figma থেকে)
1. Home Page
2. Tutors Page
3. Tutor Details Page
4. Booking Page (Modal/Page)
5. Login & Signup Page
6. Add a Tutor Page
7. Profile Page
8. 404 Not Found Page

---

## Phase 1 — Project Setup (দিন ১)

### Step 1.1 — Client Side Setup
```
npx create-vite@latest mediqueue-client --template react
cd mediqueue-client
npm install
```

**Install করতে হবে:**
```
npm install react-router-dom
npm install firebase
npm install axios
npm install react-hot-toast
npm install sweetalert2
npm install react-datepicker
npm install swiper
npm install react-icons
npm install @tanstack/react-query
```

**Tailwind CSS install:**
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js-এ Outfit font ও custom color যোগ করো:**
```js
theme: {
  extend: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
    },
    colors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#22C55E',
      bgLight: '#FAF5FF',
      textDark: '#1E1B4B',
    }
  }
}
```

**index.css-এ Google Font import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
body { font-family: 'Outfit', sans-serif; }
```

### Step 1.2 — Server Side Setup
```
mkdir mediqueue-server
cd mediqueue-server
npm init -y
npm install express cors dotenv mongodb jsonwebtoken
npm install -D nodemon
```

**Folder structure (server):**
```
mediqueue-server/
├── index.js
├── .env
└── package.json
```

### Step 1.3 — Environment Variables

**.env (client):**
```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_SERVER_URL=http://localhost:5000
```

**.env (server):**
```
DB_USER=
DB_PASS=
JWT_SECRET=
PORT=5000
```

### Step 1.4 — Firebase Setup
- Firebase console-এ নতুন project তৈরি করো
- Authentication enable করো (Email/Password + Google)
- `src/firebase/firebase.config.js` ফাইল তৈরি করো

---

## Phase 2 — Folder Structure ও Routing (দিন ১-২)

```
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── TutorCard.jsx
│   ├── Spinner.jsx
│   └── Modal/
│       ├── BookingModal.jsx
│       ├── UpdateTutorModal.jsx
│       └── DeleteConfirmModal.jsx
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Banner.jsx
│   │   ├── AvailableTutors.jsx
│   │   └── ExtraSections/
│   ├── Tutors/
│   │   └── Tutors.jsx
│   ├── TutorDetails/
│   │   └── TutorDetails.jsx
│   ├── AddTutor/
│   │   └── AddTutor.jsx
│   ├── MyTutors/
│   │   └── MyTutors.jsx
│   ├── MyBookedSessions/
│   │   └── MyBookedSessions.jsx
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Profile/
│   │   └── Profile.jsx
│   └── NotFound/
│       └── NotFound.jsx
├── providers/
│   └── AuthProvider.jsx
├── hooks/
│   └── useAxiosSecure.js
├── routes/
│   ├── router.jsx
│   └── PrivateRoute.jsx
├── firebase/
│   └── firebase.config.js
└── main.jsx
```

**router.jsx:**
```jsx
const router = createBrowserRouter([
  { path: '/', element: <MainLayout/>, children: [
    { path: '/', element: <Home/> },
    { path: '/tutors', element: <Tutors/> },
    { path: '/tutor/:id', element: <PrivateRoute><TutorDetails/></PrivateRoute> },
    { path: '/add-tutor', element: <PrivateRoute><AddTutor/></PrivateRoute> },
    { path: '/my-tutors', element: <PrivateRoute><MyTutors/></PrivateRoute> },
    { path: '/my-booked-sessions', element: <PrivateRoute><MyBookedSessions/></PrivateRoute> },
    { path: '/profile', element: <PrivateRoute><Profile/></PrivateRoute> },
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/> },
    { path: '*', element: <NotFound/> },
  ]},
]);
```

---

## Phase 3 — Authentication (দিন ২-৩)

### Step 3.1 — AuthProvider তৈরি করো
- `createUserWithEmailAndPassword`
- `signInWithEmailAndPassword`
- `signInWithPopup` (Google)
- `signOut`
- `onAuthStateChanged`
- `updateProfile` (name + photo)

### Step 3.2 — Login Page (Figma: split layout — বাম ফর্ম, ডান ছবি)
- Email field
- Password field (show/hide toggle)
- Forgot password link
- Login button (primary color #7C3AED)
- Google login button
- Register link

### Step 3.3 — Register Page
- Name, Email, Photo URL, Password fields
- Password validation:
  - Uppercase letter আছে কিনা
  - Lowercase letter আছে কিনা
  - কমপক্ষে ৬ অক্ষর
- সফল হলে Login পেজে redirect

### Step 3.4 — JWT Token
- Login/Google login সফল হলে server-এ POST করো
- Server থেকে JWT token নাও
- localStorage-এ save করো
- Axios interceptor-এ header-এ পাঠাও

### Step 3.5 — PrivateRoute
```jsx
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} />;
  return children;
};
```

---

## Phase 4 — Navbar ও Footer (দিন ৩)

### Navbar
- Logo: "MediQueue" (Outfit font, primary color)
- Links: Home, Tutors
- Logged-in হলে: Add Tutor, My Tutors, My Booked Sessions
- Logged-in না হলে: Login/Register বাটন
- User profile image → dropdown (Profile, Logout)
- Dark/Light theme toggle বাটন
- Responsive hamburger menu (mobile)

### Footer (Figma অনুযায়ী ৪ কলাম)
- Logo + description (কলাম ১)
- Useful Links (কলাম ২)
- Our Company (কলাম ৩)
- Get Contact + Social (কলাম ৪)
- Social: শুধু X (নতুন Twitter লোগো), Facebook, LinkedIn, Instagram

---

## Phase 5 — Home Page (দিন ৪-৫)

### Banner Section
- Swiper carousel (কমপক্ষে ৩টি slide)
- প্রতিটি slide-এ: heading, subtext, CTA button → /tutors

### Available Tutors Section (6টি কার্ড)
- MongoDB `$limit: 6` ব্যবহার করো
- TutorCard component (Figma অনুযায়ী কার্ড লেআউট)
- "Book Session" বাটন → Tutor Details page-এ redirect

### Extra Section 1 — Stats/Counter
- "+500h Learners", "+800h Courses", "+1,000h Certified Students", "+100h Registered"
- Figma-এর HiStudy design অনুসরণ করো

### Extra Section 2 — Testimonials / Why Choose Us
- ৩টি testimonial card
- অথবা "Why Use MediQueue?" feature grid

---

## Phase 6 — Tutors Page (দিন ৫-৬)

### Layout
- 3-column grid (Figma অনুযায়ী কার্ড)
- প্রতিটি কার্ডে: Photo, Subject badge (accent color), Rating, Tutor name, Price, Lessons count, "Book Session" বাটন

### Search Feature
- Input দিয়ে tutor name search
- Backend-এ `$regex` operator, case-insensitive

### Filter Feature
- Start date ও End date picker
- Backend-এ `$gte` ও `$lte` দিয়ে sessionStartDate filter

---

## Phase 7 — Tutor Details Page (Private, দিন ৬)

### তথ্য দেখাবে
- Photo, Name, Subject, Available Days/Time
- Hourly Fee, Total Slot, Session Start Date
- Institution, Experience, Location, Teaching Mode

### Book Session বাটন logic
- `totalSlot === 0` → বাটন disabled + "No available slots left."
- `currentDate < sessionStartDate` → disabled + "Booking is not available yet."
- অন্যথায় → Modal/Page খুলবে

### Booking Modal/Page (Figma: multi-step form layout)
- Student Name (auto)
- Phone (input)
- Tutor ID (auto)
- Tutor Name (auto)
- Student Email (auto)
- Status (auto: "pending")
- Submit → totalSlot -1 করো (PATCH request)

---

## Phase 8 — Add Tutor Page (Private, দিন ৭)

### Form Fields (Figma: multi-tab form)
- Tutor Name
- Photo URL (imgbb বা postimage)
- Subject/Category (dropdown)
- Available Days + Time slot
- Hourly Fee
- Total Slot
- Session Start Date (date picker)
- Institution, Experience
- Location
- Teaching Mode (dropdown: Online/Offline/Both)

### Submit হলে
- Database-এ save + user email যোগ করো
- Success toast দেখাও

---

## Phase 9 — My Tutors Page (Private, দিন ৮)

### Table Layout
- Tutor photo, name, subject, fee, slots
- Update বাটন → Modal খুলবে (pre-filled form)
- Delete বাটন → Confirm modal → DELETE request

### Empty State
- "আপনি এখনো কোনো tutor যোগ করেননি" — friendly message

---

## Phase 10 — My Booked Sessions (Private, দিন ৮)

### Table Layout
- Tutor Name, Student Name, Email, Status, Cancel বাটন

### Cancel বাটন
- Confirm modal দেখাও
- PATCH request → status: "cancelled"

### Empty State
- Friendly message দেখাও

---

## Phase 11 — Profile Page (দিন ৯)

### Figma অনুযায়ী
- Cover/banner background (gradient: #FAB → #FAF5FF)
- Round profile image
- নাম, email
- Share Profile বাটন

---

## Phase 12 — Backend API (দিন ৭-৯)

### MongoDB Collections
- `tutors`
- `bookings`
- `users` (optional)

### API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /tutors | সব tutor (search + filter সহ) |
| GET | /tutors/:id | একটি tutor |
| GET | /tutors/user/:email | নির্দিষ্ট user-এর tutors |
| POST | /tutors | নতুন tutor যোগ |
| PUT | /tutors/:id | Tutor update |
| DELETE | /tutors/:id | Tutor delete |
| GET | /bookings/:email | User-এর bookings |
| POST | /bookings | নতুন booking |
| PATCH | /bookings/:id | Status update (cancel) |
| POST | /jwt | JWT token তৈরি |

### Search ও Filter (GET /tutors)
```js
const query = {};
if (search) query.tutorName = { $regex: search, $options: 'i' };
if (startDate && endDate) {
  query.sessionStartDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
}
```

### JWT Middleware
```js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Forbidden' });
    req.decoded = decoded;
    next();
  });
};
```

---

## Phase 13 — Dark/Light Theme (দিন ৯)

```jsx
// Navbar-এ toggle button
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
```

Tailwind `dark:` class ব্যবহার করো প্রতিটি component-এ।

---

## Phase 14 — Additional Features (দিন ১০)

### Dynamic Title
```jsx
// প্রতিটি পেজে
useEffect(() => {
  document.title = 'Home | MediQueue';
}, []);
```

### Spinner
```jsx
if (loading) return <div className="flex justify-center items-center h-screen">
  <span className="loading loading-spinner loading-lg text-primary"></span>
</div>;
```

### Toast (react-hot-toast)
- Add Tutor → "Tutor added successfully!"
- Update → "Tutor updated!"
- Delete → "Tutor deleted!"
- Booking → "Session booked!"
- Cancel → "Booking cancelled."
- Login error → error toast

### 404 Page (Figma: dark background + isometric 404 illustration)
- "Page Not Found" heading
- Home-এ ফেরার বাটন

---

## Phase 15 — Deployment (দিন ১০-১১)

### Client — Vercel
1. GitHub-এ push করো
2. Vercel-এ import করো
3. Environment variables যোগ করো
4. `vercel.json` তৈরি করো (reload fix):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Server — Render
1. GitHub-এ push করো
2. Render-এ নতুন Web Service তৈরি করো
3. Environment variables যোগ করো

### Firebase Authorized Domain
- Vercel domain-টি Firebase console > Authentication > Authorized domains-এ যোগ করো

---

## Phase 16 — GitHub Commits Plan

### Client (কমপক্ষে ১৫টি)
1. Initial React + Tailwind setup
2. Firebase config and AuthProvider
3. Router setup with PrivateRoute
4. Navbar and Footer components
5. Home page Banner/Carousel
6. Available Tutors section
7. Extra sections (Stats + Testimonials)
8. Login and Register pages
9. Google login + JWT token
10. Tutors page with cards
11. Search and filter feature
12. Tutor Details page + slot validation
13. Booking modal functionality
14. Add Tutor page with form
15. My Tutors page (update + delete)
16. My Booked Sessions page (cancel)
17. Profile page
18. Dark/Light theme toggle
19. 404 page + Dynamic title
20. Deployment config (vercel.json)

### Server (কমপক্ষে ৮টি)
1. Initial Express server setup
2. MongoDB connection
3. Tutors CRUD routes
4. Bookings routes
5. JWT token route + middleware
6. Search and filter query implementation
7. totalSlot auto-decrement on booking
8. CORS + env config for production

---

## Readme.md Template (Client)

```markdown
# MediQueue — Tutor Booking System

Live Site: [https://mediqueue.vercel.app](https://mediqueue.vercel.app)

## Features
- 🔐 Secure authentication with Email/Password and Google Sign-in
- 📅 Real-time session booking with automatic slot management
- 🔍 Search tutors by name and filter by session date range
- 🌙 Dark/Light theme toggle for comfortable viewing
- 🎫 Digital session token generation for every booking
```

---

## সংক্ষিপ্ত টাইমলাইন

| দিন | কাজ |
|---|---|
| ১ | Setup (Client + Server + Firebase) |
| ২ | AuthProvider + Login + Register |
| ৩ | JWT + PrivateRoute + Navbar + Footer |
| ৪-৫ | Home Page (Banner + Tutors + Extra) |
| ৫-৬ | Tutors Page + Search/Filter |
| ৬ | Tutor Details + Booking Modal |
| ৭ | Add Tutor Page + Backend APIs |
| ৮ | My Tutors + My Booked Sessions |
| ৯ | Profile + Dark Mode + Backend JWT |
| ১০ | Polish + Toast + Spinner + 404 |
| ১১ | Deployment + README + Final commits |
