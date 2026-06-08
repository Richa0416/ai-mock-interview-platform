# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🎤 AI Mock Interview Platform

> An intelligent interview preparation system that simulates technical and behavioural interviews, evaluates responses with AI, and tracks your progress over time.

![Status](https://img.shields.io/badge/status-active%20development-yellow)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20MongoDB-teal)
![Auth](https://img.shields.io/badge/auth-JWT-blue)

---

## ✨ What It Does

AI Mock Interview Platform acts as a personalized interview coach — continuously helping users prepare for placements, internships, and job opportunities.

- 🤖 Practice AI-generated technical & HR interview questions
- 🎙 Interactive mock interview experience
- 📊 Instant AI-based performance feedback & scoring
- 🧠 Communication & confidence analysis
- 📁 Interview history & progress tracking
- 🔐 Secure user authentication
- 🌐 Responsive, modern UI

---

## 🧠 How It Works

1. **Sign in** and select a target role or interview type
2. **AI generates questions** dynamically for your chosen role
3. **Answer in real time** — the system records and evaluates your responses
4. Receive **instant feedback**, a performance score, and improvement suggestions
5. Sessions are **saved automatically** — review and practice again to improve over time

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, Tailwind CSS, React Router, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI | OpenAI API / Gemini API |
| Auth | JWT Authentication |

---

## 📂 Project Structure

```
ai-mock-interview-platform/
├── client/       # React frontend
├── server/       # Node.js backend
├── screenshots/
└── README.md
```

---

## ⚙️ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-mock-interview-platform.git
cd ai-mock-interview-platform
```

### 2. Install dependencies

```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key
```

### 4. Run the project

```bash
# Start backend
cd server && npm run dev

# Start frontend (new terminal)
cd client && npm run dev
```

---

## 📌 Project Status

🛠 **Under Active Development**

Upcoming features:

- 🎥 Video-based mock interviews
- 🗣 Voice interaction support
- 📄 Resume-based interview generation
- 🏢 Company-specific interview rounds
- 📈 Advanced analytics dashboard
- 🌍 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature-name"`
4. Push to GitHub: `git push origin feature-name`
5. Open a Pull Request

---

## 👩‍💻 Author

**Richa Ranjan**

- GitHub: [@Richa0416](https://github.com/Richa0416)
- LinkedIn: [richa-ranjan](https://linkedin.com/in/richa-ranjan)

---

⭐ If you find this project useful, consider giving it a star on GitHub!
