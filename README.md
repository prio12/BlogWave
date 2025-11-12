# BlogWave 🌊

**A full-stack social blogging platform with rich text editing, real-time engagement, and personalized content feeds**


> **Solo full-stack project** built from scratch to solve the challenge of fragmented blogging experiences by creating a unified platform that combines powerful content creation with meaningful community engagement.

---

## 🎯 The Problem & Solution

**The Challenge:** Writers need a distraction-free platform that balances content creation with authentic community engagement—most platforms lean too heavily toward either social features or writing tools.

**My Solution:** BlogWave combines a professional rich-text editor with social features like follows, claps (likes), bookmarks, and real-time notifications—all managed through centralized Redux state for optimal performance.

---

## ✨ Key Features

### 📝 Content Creation
- **React Quill Editor** - Professional WYSIWYG with custom toolbar
- **DOMPurify Integration** - XSS protection and content sanitization
- **Draft Management** - Auto-save functionality with localStorage
- **Live Preview** - Real-time content rendering
- **Image Upload** - Seamless media integration
- **Edit Anytime** - Update published blogs with instant updates

### 👥 Social Engagement
- **Follow System** - Build your reading community
- **Clap System** - Express appreciation (Medium-style engagement)
- **Real-time Notifications** - Stay updated with React Hot Toast
- **Personalized Feed** - Content from followed authors
- **Bookmarking** - Save articles for later reading
- **Author Profiles** - Showcase work and build following

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **DaisyUI Components** - Consistent, accessible UI elements
- **Material-UI Integration** - Enhanced components for complex interactions
- **Lottie Animations** - Smooth, performant loading states
- **React Icons** - 10,000+ icons for rich visual experience
- **Reading Time Estimates** - Plan your reading sessions
- **Toast Notifications** - Beautiful feedback with React Hot Toast

### 🔐 User Management
- **Firebase Authentication** - Secure Google OAuth integration
- **React Hook Form** - Performant form handling with validation
- **Profile Customization** - Update avatar, bio, and display name
- **Activity Dashboard** - Track blogs, bookmarks, and engagement
- **Protected Routes** - Role-based access control

---

## 🛠️ Tech Stack

### Frontend
```
React 18.2           → Component-based UI architecture
Redux 4.2 + Thunk    → Centralized state management with async middleware
React Router v6      → Client-side routing & navigation
React Quill          → Rich text WYSIWYG editor
Tailwind CSS         → Utility-first styling framework
DaisyUI              → Pre-built Tailwind components
Material-UI          → Component library for enhanced UI elements
Firebase 10.4        → Authentication & user management
```

### Key Libraries
```
React Hook Form      → Performant form validation
React Hot Toast      → Beautiful notification system
DOMPurify            → XSS protection for user content
Lottie React         → Smooth animations
React Icons          → Comprehensive icon library
```

### Backend
```
Node.js           → Runtime environment
Express.js        → RESTful API framework
MongoDB           → NoSQL database
```

### Development & Testing
```
React Scripts 5.0    → Build tooling and dev server
Jest & RTL           → Unit and integration testing
Redux DevTools       → State debugging
Firebase Hosting     → Production deployment
ESLint               → Code quality and consistency
```

---

## 🏗️ Architecture Highlights

### State Management Strategy
- **Redux 4.2** with vanilla setup (not Redux Toolkit)
- **Redux Thunk 2.4** for asynchronous API operations
- **Redux DevTools** integration for debugging
- **Local State** for component-specific UI interactions
- **Optimistic Updates** for instant user feedback
- **Normalized State Shape** for efficient data management

### Performance Optimizations
- **React 18** features for automatic batching
- **Code Splitting** with React Router lazy loading
- **Image Optimization** and lazy loading strategies
- **Memoized Selectors** to prevent unnecessary re-renders
- **DOMPurify** for safe HTML rendering without performance hits
- **React Hook Form** for uncontrolled components (better performance)

### Code Organization
```
src/
├── components/        # Reusable UI components
├── pages/            # Route-based page components
├── redux/            # Redux store, slices, and thunks
├── utils/            # Helper functions and constants
├── hooks/            # Custom React hooks
└── assets/           # Images and static files
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prio12/BlogWave.git
   cd blogwave-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=your_backend_api_url
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```





## 🎓 Key Learnings & Challenges

### Technical Challenges Solved
1. **Redux State Management**: Implemented vanilla Redux with Thunk middleware to manage complex application state without Redux Toolkit abstraction
2. **XSS Prevention**: Integrated DOMPurify to sanitize user-generated HTML content from React Quill editor
3. **Form Performance**: Used React Hook Form's uncontrolled components approach for better performance in complex forms
4. **Real-time UI Updates**: Implemented optimistic updates with Redux and React Hot Toast for instant feedback
5. **Rich Text Editing**: Customized React Quill toolbar and handled content sanitization for security

### Skills Demonstrated
- ✅ Full-stack MERN development
- ✅ Redux state management (vanilla Redux + Thunk)
- ✅ Firebase authentication & real-time features
- ✅ Form handling with React Hook Form
- ✅ Security-conscious development (XSS prevention)
- ✅ Responsive design with Tailwind + DaisyUI
- ✅ RESTful API integration
- ✅ Component library integration (Material-UI)
- ✅ Performance optimization techniques



## 🤝 Contributing

While this is a solo project for portfolio purposes, suggestions and feedback are always welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---



## 🔗 Related Repositories

- **[BlogWave Server](https://github.com/prio12/blog_wave_server.git)** - Backend API with Node.js & Express


---

<div align="center">

**⭐ If you find this project interesting, please consider giving it a star!**

Made with ❤️ and ☕ by Maksudur Rahman

</div>
