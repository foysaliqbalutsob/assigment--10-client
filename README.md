# Community Cleanliness & Issue Reporting Portal

A MERN stack web application where users can report community cleanliness issues, track their own reports, contribute to cleanup activities, and download contribution reports. The system includes secure authentication, protected routes, issue filtering, and a fully responsive UI.

---

## Features

- Firebase Authentication (Email/Password + Google Login)  
- Add, Update & Delete Issues (Private & Protected Routes)  
- Contribution System with PDF Report Download  
- All Issues Page with Category & Status Filtering  
- Home Page with Categories, Latest Issues, Stats & CTA Section  
- Dark/Light Mode Toggle  
- Toast / SweetAlert Notifications  
- 404 Not Found Page  
- Loading Spinners during API requests  
- Fully Responsive UI (Tailwind CSS)  
- Protected Routes (no redirect after refresh)

---

## Main Pages

- Home – Banner, categories, recent issues, stats  
- All Issues – Grid view, filters, details page  
- Add Issue – Private form for submitting issues  
- Issue Details – Full description + contribution modal  
- My Issues – User-specific issues (update/delete)  
- My Contribution – User’s payments + PDF report  
- Login / Register – Firebase Authentication  
- Profile & Logout – Via navbar  

---

## Technologies Used

### Frontend
React, React Router, Firebase Auth, Tailwind CSS, Axios, Lottie/Typewriter/Awesome Reveal, jsPDF  

### Backend
Node.js, Express.js, MongoDB Atlas, Mongoose, CORS  

### Deployment
Client: Netlify / Firebase / Surge  
Server: Vercel  

---

## Database Summary

### Issues Collection
- title  
- category  
- location  
- description  
- image  
- amount  
- email  
- date  
- status  

### Contributions Collection
- issueId  
- amount  
- name  
- email  
- phone  
- address  
- date  

---


