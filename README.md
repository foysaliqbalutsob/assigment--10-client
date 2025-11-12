# Pet WarmWow – Pet Care in Winter

**Assignment Category:** Assignment-09_category_rose  



---

**Pet WarmWow** Project Overview :

# is a cozy winter companion platform for pet owners. It helps users ensure their furry friends stay warm, safe, and healthy during the cold season. The application allows users to:

- Explore local winter pet care services  
- View winter pet clothing and grooming options  
- Access expert tips and consultations
- consult with doctor 



---

## 💻 Technologies & Packages Used

- **Frontend:** React, React Router, DaisyUI, Tailwind CSS  
- **Authentication & Backend:** Firebase Authentication  
- **Animations:** AOS, React Spring  
- **Notifications:** React Toastify  
- **Slider/Carousel:** Swiper.js  
- **Icons:** React Icons (FontAwesome)  

---

##  Key Features

### General Features
- Fully responsive design for mobile, tablet, and desktop  
-  persistent Navbar and Footer across routes  
- Toast notifications for success and error messages  
- JSON-based service data to display winter pet services  

### Authentication
- **Sign Up:** Name, Email, Photo-URL, Password  
  - Password validation: Uppercase, lowercase, special character, min 6 characters  
  - Google Sign-In integration  
- **Login:** Email and password with validation  
- **Forgot Password:** Redirect to Gmail for reset  
- **Profile Page:** Displays user info with an **Update Profile** button  

### Home Page
- Hero slider showcasing pets in winter outfits (Swiper.js + DaisyUI)  
- Popular Winter Care Services loaded from JSON file  
- “Winter Care Tips for Pets” section  
- “Meet Our Expert Vets” section  
- Extra homepage section for seasonal pet care tips  

### Service Details Page
- Protected route: requires login  
- Shows full JSON data of the selected service  
- Book Service form: Name, Email, and “Book Now” button  

---


