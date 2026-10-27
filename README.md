# iMovies — Entertainment Booking Platform

A full-stack movie ticket booking web application built using the MERN stack. iMovies allows users to explore movies, check showtimes, select seats, make demo payments, and manage their bookings through a simple and interactive interface.

## 🚀 Features

### 👤 Customer Features
- User registration, login, and logout
- Secure authentication using JWT and HTTP-only cookies
- Browse and search movies
- Filter movies by genre, language, and release status
- Sort and explore Now Showing and Coming Soon movies
- Movie details, cast, ratings, and showtimes
- Select city, date, showtime, and seats using an interactive seat map
- Real-time seat availability and temporary seat reservation
- 10-minute seat hold with countdown
- Simulated payments through Card, UPI, Net Banking, and Wallet
- Digital e-ticket with booking ID and print option
- View booking history and cancel eligible bookings
- Movie reviews and star ratings
- Favourites and watchlist management
- Email notifications for watchlisted movie showtimes, when configured
- Profile management and password updates

### 🛠️ Admin Features
- Separate admin login and dashboard
- Dashboard statistics for revenue, tickets sold, popular movies, and recent activity
- Add, edit, and delete movies
- Manage theatres and screens
- Configure custom seat layouts
- Schedule movie shows and set seat-category pricing
- Prevent overlapping show schedules
- View and cancel bookings
- Activate, deactivate, and delete user accounts

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend user interface |
| Vite | Frontend development and build tool |
| React Router | Client-side navigation |
| JavaScript (JSX) | Application logic |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | Database modelling |
| JWT | Authentication |
| HTTP-only Cookies | Authentication token storage |

## 📁 Project Structure

```text
iMovies-Entertainment-Booking-Platform/
├── client/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: The exact folders inside `client/` and `server/` may vary depending on the implementation.*

## ⚙️ Prerequisites

Before running the project, install:

- **Node.js 18 or newer**
- **npm**, included with Node.js
- **MongoDB Community Server** or a MongoDB Atlas cluster
- **Git** (optional, for version control)

Check your Node.js and npm versions:

```bash
node -v
npm -v
```

## 🔧 Installation and Setup

### 1. Clone or Open the Project

If the project is hosted on GitHub:

```bash
git clone <your-repository-url>
cd iMovies-Entertainment-Booking-Platform
```

Alternatively, open your existing project folder in VS Code.

### 2. Configure the Backend

Open a terminal in the project root:

```bash
cd server
npm install
```

Create or update `server/.env` with your local configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Add any other environment variables required by your implementation, such as email configuration.

**Important:** Use your own MongoDB connection string and a strong secret. Never upload `.env` files or real credentials to a public repository.

### 3. Seed Sample Data

If the project provides a seed script, run:

```bash
npm run seed
```

This may create sample movies, theatres, shows, and a demo admin account in an empty database.

Use the credentials configured by your seed script. Avoid assuming default credentials if you have changed them.

### 4. Start the Backend

In the `server` directory:

```bash
npm run dev
```

The backend API should run at:

`http://localhost:5000`

If your project provides a health endpoint, check:

`http://localhost:5000/api/health`

Opening `http://localhost:5000/` may return a route-not-found response if the root route is not defined. This does not necessarily mean the backend is broken.

### 5. Start the Frontend

Open a **second terminal** in VS Code:

```bash
cd client
npm install
npm run dev
```

Open the URL displayed by Vite, usually:

`http://localhost:5173`

Keep both frontend and backend terminals running while using the application.

## 🎬 How to Use

### Customer Workflow

1. Open the application in your browser.
2. Register a new account or log in.
3. Browse, search, or filter available movies.
4. Open a movie and select a city, date, and showtime.
5. Choose available seats from the seat map.
6. Proceed to checkout and complete the simulated payment.
7. View your booking details and e-ticket in your booking history.

### Admin Workflow

1. Open `/admin/login`.
2. Log in using the admin credentials configured for your application.
3. Access the dashboard.
4. Manage movies, theatres, screens, shows, users, and bookings.

## 💳 Demo Payment Information

The payment gateway is simulated for demonstration purposes. No real payment is processed.

- **Card:** Test card numbers are accepted according to the application's validation rules.
- **UPI:** Use a test UPI ID in the format supported by the application.
- **Net Banking / Wallet:** Follow the application's demo payment flow.

Payment validation and failure conditions depend on the implementation.

## 🔌 API Overview

The backend exposes REST API endpoints under `/api`.

| Module | Example Endpoints |
|---|---|
| Authentication | `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me` |
| Admin | `/admin/login`, `/admin/dashboard`, `/admin/users`, `/admin/bookings` |
| Movies | `/movies`, `/movies/:id` |
| Theatres | `/theatres`, `/theatres/:id` |
| Shows | `/shows`, `/shows/:id` |
| Bookings | `/bookings`, `/bookings/my`, `/bookings/:id/pay` |
| Reviews | `/reviews/movie/:movieId`, `/reviews` |
| Favourites | `/favourites` |

*Note: These are representative routes. Refer to the backend route files for the complete endpoint list and supported HTTP methods.*

## 🏗️ Production Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

The generated files are typically available in:

```text
client/dist/
```

Deploy the frontend and backend using your preferred hosting providers. Configure production environment variables, the API URL, and secure cookie settings according to your deployment environment. Use HTTPS in production.

## 🐛 Troubleshooting

| Issue | Possible Solution |
|---|---|
| MongoDB connection error | Verify that MongoDB is running and `MONGO_URI` is correct. |
| Movies are not loading | Confirm that the backend is running and the database contains movie data. |
| Login or registration fails | Check the browser console, backend logs, and authentication configuration. |
| Vite proxy error | Ensure the backend is running on the configured port. |
| Port 5000 is already in use | Change the backend port and update the Vite proxy configuration accordingly. |
| No upcoming shows | Create new shows through the admin panel and verify their scheduled dates. |
| Seed command fails | Check the seed script, database connection, and existing data. |

## 🔐 Security Notes

- Keep environment variables and secrets out of source control.
- Use strong, unique secrets for JWT authentication.
- Validate and sanitize user input on the backend.
- Enforce authorization checks for admin-only operations.
- Use HTTPS and secure cookie settings in production.
- Never use real payment details in the simulated payment flow.

## 🔮 Future Improvements

- Integration with a real payment gateway
- Automated email notifications
- Movie recommendations based on user preferences
- Improved mobile responsiveness
- Automated testing for critical booking flows
- Deployment with a production database and monitoring

## 👨‍💻 Project Information

**Project:** iMovies — Entertainment Booking Platform  
**Category:** Full-Stack Web Development  
**Architecture:** MERN Stack  
**Language:** JavaScript  
**Purpose:** Movie discovery, show scheduling, and online ticket booking simulation

---

*Built as a full-stack web development project using the MERN stack.*
