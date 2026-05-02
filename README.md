
# Campus Notifications App

A responsive React application built for the Affordmed Campus Hiring Evaluation. This project displays campus notifications such as placements, results, and events using the provided API. It includes a Priority Inbox, filtering, search, pagination, and read/unread tracking.

---

## Features

### All Notifications Page
- View all notifications
- Filter by:
  - All
  - Placement
  - Result
  - Event
  - New
  - Viewed
- Search notifications
- Pagination
- Mark notifications as viewed on click

### Priority Notifications Page
Displays the top 10 most important unread notifications based on:

```text
Placement > Result > Event
```

If priority is the same, the latest notification is shown first.

### UI Features
- Responsive layout
- Material UI styling
- Clean dashboard interface
- Hover effects
- Modern navbar

### Logging Middleware
All important actions are logged using the required logging middleware:
- Page opened
- API fetch success
- API fetch failure
- Notification clicked

---

## Tech Stack
- React
- React Router DOM
- Material UI
- JavaScript
- Vite

---

## Project Structure

```text
src/
│── App.jsx
│── config.js
│── logger.js
│
├── pages/
│   ├── AllNotifications.jsx
│   └── PriorityNotifications.jsx
│
└── main.jsx
```

## Installation

1. Clone repository

```bash
git clone <your-github-repo-link>
cd <project-folder>
```

2. Install dependencies

```bash
npm install
```

3. Run project
```bash
npm run dev
```

Application runs on:

```text
http://localhost:3000
```

### Required Packages

```bash
npm install react-router-dom
npm install @mui/material
npm install @emotion/react
npm install @emotion/styled
npm install @mui/icons-material
```
## API Used

### Notifications API
`GET /evaluation-service/notifications`

Protected route using Bearer token.

### Logs API
`POST /evaluation-service/logs`

---

## Authentication

Access token is stored in:

```js
// src/config.js
export const token = "YOUR_ACCESS_TOKEN";
```
## Priority Logic

Weights assigned:

| Type      | Weight |
|-----------|--------|
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

Sorting rules:
1. Higher priority first
2. Latest timestamp first

Then the top 10 notifications are displayed.

---

## Responsive Design

| Device  | Layout            |
|---------|-------------------|
| Mobile  | 1 card per row    |
| Tablet  | 2 cards per row   |
| Desktop | 3 cards per row   |

---

## Screenshots

Add screenshots here before submission:

- `screenshots/home.png`
![Home Screen](home.png)
- `screenshots/priority.png`
![Priority Inbox](priority.png)
---

## Submission Notes
- Built using React only
- Material UI used for styling
- Logging middleware integrated
- Priority inbox implemented
- Clean and responsive UI


