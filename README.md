# 🏥 Virtual Health Assistant

> **Your AI-Powered Companion for a Healthier Life.** Integration with Google Fit, Generative AI, and immersive 3D visualizations.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## ✨ Overview

**Virtual Health Assistant** is a cutting-edge web application designed to revolutionize how you manage your health. By leveraging the power of **Google Generative AI** and seamless integration with **Google Cloud's Fitness API**, this assistant provides personalized health insights, workout recommendations, and real-time tracking in a stunning, interactive 3D environment.

Built with performance and aesthetics in mind, the app features a responsive interface, smooth animations powered by **Framer Motion**, and a robust backend utilizing **Express** and **MongoDB**.

## 🚀 Key Features

-   **🤖 AI-Powered Insights**: Personalized health tips and analysis using Google's Generative AI.
-   **⌚ Fitness Tracking**: Real-time synchronization with Google Fit data (steps, calories, activity).
-   **🌍 Immersive 3D UI**: Interactive 3D elements powered by React Three Fiber for a modern user experience.
-   **🔒 Secure Authentication**: Robust user authentication via Firebase.
-   **📊 Data Visualization**: Beautiful charts and easy-to-read dashboards for your health metrics.
-   **⚡ Blazing Fast**: Powered by Vite for instant development server start and lightning-fast HMR.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [MUI (Material UI)](https://mui.com/), [Emotion](https://emotion.sh/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmndrs.assets/react-three-fiber)

### Backend
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB (Mongoose)](https://mongoosejs.com/)
-   **Cloud Integration**: Google Cloud Platform (Fitness API, OAuth), Firebase

## 🏁 Getting Started

Follow these simple steps to set up the project locally.

### Prerequisites
-   Node.js (v18+)
-   MongoDB Atlas account or local instance
-   Google Cloud Project with Fitness API enabled

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/virtual-health-assistant.git
    cd virtual-health-assistant
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_key
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the application**
    
    *Start the Backend Server:*
    ```bash
    cd server
    node server.js
    ```

    *Start the Frontend:*
    ```bash
    # In a new terminal
    npm run dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:5173` to see the app in action!

## 🤝 Contributing

Contributions are always welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<p align="center">
  Made with ❤️ by specific user
</p>
