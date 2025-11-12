# BlogWave 🌊

**A full-stack social blogging platform with rich text editing, real-time engagement, and personalized content feeds**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://blog-wave-3c534.web.app/)
[![Frontend](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://github.com/yourusername/blogwave-client)
[![Backend](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://github.com/yourusername/blogwave-server)

> **Solo full-stack project** built from scratch to solve the challenge of fragmented blogging experiences by creating a unified platform that combines powerful content creation with meaningful community engagement.

---

## 🎯 The Problem & Solution

**The Challenge:** Writers need a distraction-free platform that balances content creation with authentic community engagement—most platforms lean too heavily toward either social features or writing tools.

**My Solution:** BlogWave combines a professional rich-text editor with social features like follows, claps (likes), bookmarks, and real-time notifications—all managed through centralized Redux state for optimal performance.

---

## ✨ Key Features

### 📝 Content Creation
- **Rich Text Editor** with custom formatting controls and media embedding
- **Draft Management** - Auto-save functionality (localStorage)
- **Live Preview** - See your content as you write
- **Image Upload** - Seamless media integration
- **Edit Anytime** - Update published blogs with version tracking

### 👥 Social Engagement
- **Follow System** - Build your reading community
- **Clap System** - Express appreciation (Medium-style likes)
- **Real-time Notifications** - Stay updated on follower activity
- **Personalized Feed** - Content from followed authors
- **Bookmarking** - Save articles for later reading

### 🎨 User Experience
- **Responsive Design** - Optimized for all devices
- **Dark/Light Mode** - Comfortable reading experience
- **Reading Time Estimates** - Plan your reading sessions
- **Author Profiles** - Showcase your work and followers
- **Search & Discovery** - Find content and creators

### 🔐 User Management
- **Firebase Authentication** - Secure Google sign-in
- **Profile Customization** - Update avatar, bio, and display name
- **Activity Dashboard** - Track your blogs, bookmarks, and claps
- **Privacy Controls** - Manage your content visibility

---

## 🛠️ Tech Stack

### Frontend
```
React 18          → Component-based UI architecture
Redux Toolkit     → Centralized state management with Thunk middleware
React Router v6   → Client-side routing
Tailwind CSS      → Utility-first styling
Firebase Auth     → Authentication & user management
Axios             → HTTP client for API communication
```

### Backend
```
Node.js           → Runtime environment
Express.js        → RESTful API framework
MongoDB           → NoSQL database
```

### Development Tools
```
Git & GitHub      → Version control
Firebase Hosting  → Production deployment
Vercel/Render     → Backend hosting
```

---

## 🏗️ Architecture Highlights

### State Management Strategy
- **Redux Toolkit** for global state (user, blogs, notifications)
- **Local State** for component-specific UI interactions
- **Thunk Middleware** for asynchronous API calls
- **Optimistic Updates** for instant UI feedback

### Performance Optimizations
- Lazy loading for route-based code splitting
- Image optimization and lazy loading
- Debounced search functionality
- Memoized selectors to prevent unnecessary re-renders

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
   git clone https://github.com/yourusername/blogwave-client.git
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

---

## 📸 Screenshots

> **Note:** Add screenshots of key features here:
> - Homepage with blog feed
> - Rich text editor in action
> - User profile page
> - Notification system
> - Mobile responsive views

---

## 🎓 Key Learnings & Challenges

### Technical Challenges Solved
1. **State Management Complexity**: Implemented Redux Toolkit to manage complex state across user sessions, blog data, and real-time notifications
2. **Real-time Updates**: Built notification system that updates UI instantly when users follow/unfollow
3. **Rich Text Editing**: Integrated and customized a WYSIWYG editor with proper sanitization
4. **Responsive Design**: Ensured seamless experience across devices using Tailwind's utility classes

### Skills Demonstrated
- ✅ Full-stack JavaScript development (MERN stack)
- ✅ RESTful API design and integration
- ✅ Advanced state management with Redux
- ✅ Responsive UI/UX design
- ✅ Authentication & authorization flows
- ✅ Database schema design
- ✅ Git workflow and version control

---

## 🔮 Future Enhancements

- [ ] Add blog categories and tags for better discovery
- [ ] Implement advanced search with filters
- [ ] Add comment/reply threading system
- [ ] Enable collaborative blog editing
- [ ] Add analytics dashboard for authors
- [ ] Implement email notifications
- [ ] Add Markdown support alongside rich text
- [ ] Enable draft sharing with private links

---

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

## 👨‍💻 About the Developer

**Maksudur Rahman** - Full-Stack Developer

Building modern web applications with a focus on clean code, user experience, and scalable architecture.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/maksudur-rahman-full-stack-developer/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5722?style=for-the-badge&logo=google-chrome)](https://your-portfolio-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/yourusername)

---

## 🔗 Related Repositories

- **[BlogWave Server](https://github.com/yourusername/blogwave-server)** - Backend API with Node.js & Express
- **[BlogWave Admin Panel](https://github.com/yourusername/blogwave-admin)** - Content moderation dashboard *(if applicable)*

---

<div align="center">

**⭐ If you find this project interesting, please consider giving it a star!**

Made with ❤️ and ☕ by Maksudur Rahman

</div>
