🎓 InternView AI — AI-Powered Interview Preparation Platform
React Node.js Express.js SQLite Hugging Face Vite Tailwind CSS

🚀 InternView AI is an AI-powered interview preparation companion designed to help candidates practice, refine, and ace their job interviews. It allows users to launch customized preparation sessions tailored to targeted roles, experience levels, and topics, generating hyper-focused interview questions, storing candidate notes, and providing real-time AI-powered concept explanations.

🎯 Problem Statement
Preparing for technical and behavioral interviews is often overwhelming due to the vast range of potential topics and a lack of structured, role-specific practice resources. Candidates need an interactive way to simulate realistic, personalized interview questions and get instant, detailed feedback/explanations without expensive coaching platforms.

💡 Our Solution
InternView AI modernizes interview prep by providing:

| Feature | Description |
| :--- | :--- |
| 🤖 AI Question Generator | Powered by Hugging Face serverless inference (`Qwen-2.5-7B-Instruct`), generating 10 tailored interview questions per session. |
| 💡 Real-time Explanation | Instant, detailed answers and key concept explanations for any interview question to review best practices. |
| 📌 Pinning & Custom Notes | Pin challenging questions to review later and save custom candidate notes or practice answers directly in-app. |
| 📁 Session Trackers | Save and manage multiple preparation sessions across different target roles (e.g. Frontend Engineer, Data Scientist). |
| 👤 Profile Customization | JWT-secured authentication with support for custom profile avatar uploads. |

✨ Features
🤖 Core Intelligence (Hugging Face AI Client)
- **Dynamic Question Generation**: Submits target role, years of experience, and focus areas to the Hugging Face API to compile a curated list of relevant questions.
- **Concept Explanations**: Instantly generates deep dives, code snippets, and interview tips when requested for any specific question.
- **JSON Parsing alignment**: Integrated cleanup logic to handle and parse generative JSON outputs reliably on the Express server.

📁 Session & Question Management
- **Dashboard Overview**: Access a grid of your active preparation tracks with details on role, experience, and number of questions.
- **Active Pinning**: Keep critical or tricky questions pinned for quick filtering and focused revision.
- **Progress Tracking & Notes**: Write down your thoughts, mock answers, or key points on each question card to track your progress.

👤 Auth & Avatar Uploads
- **Custom JWT Auth**: Secure account registration and token-based state persistence.
- **Local File Uploads**: Incorporates a Multer-based image uploading pipeline to save custom profile pictures locally and render them instantly.

🛠 Tech Stack
🖥️ Frontend
- **React 19** — Client framework for highly interactive user interfaces.
- **Vite** — Ultra-fast frontend build tooling.
- **TailwindCSS v4** — Modern utility-first styling.
- **Framer Motion** — Fluid micro-animations for page transitions and card actions.
- **React Hot Toast** — Elegant toast notifications.
- **React Markdown & Syntax Highlighter** — Renders beautifully formatted AI-generated explanations and code snippets.

⚙️ Backend & AI
- **Node.js & Express.js** — Secure middleware API router.
- **Better-SQLite3** — High-performance local SQL database wrapper for storing users, sessions, and question states.
- **Bcryptjs & jsonwebtoken** — Password hashing and JWT generation for secure sessions.
- **Multer** — Middleware for handling multipart/form-data profile photo uploads.
- **Hugging Face Serverless API** — Generates interview questions and explanations using `Qwen/Qwen2.5-7B-Instruct`.

🔗 API Reference
👤 User Authorization & Profile
| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/register` | POST | Register a new candidate profile. |
| `/api/auth/login` | POST | Authenticate candidate credentials. |
| `/api/auth/profile` | GET | Retrieve candidate profile details (Protected). |
| `/api/auth/upload-profile-image` | POST | Upload a custom profile picture (Protected). |

📁 Interview Sessions
| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/sessions/my-sessions` | GET | Retrieve all active preparation sessions for current user (Protected). |
| `/api/sessions/create` | POST | Create a new session with AI-generated questions (Protected). |
| `/api/sessions/:id` | GET | Retrieve details of a specific session (Protected). |
| `/api/sessions/:id` | DELETE | Remove a past preparation session (Protected). |

🧠 Question Operations & AI
| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/questions/add` | POST | Add a manual question to an active session (Protected). |
| `/api/questions/:id/pin` | PUT | Toggle pinning status of an interview question (Protected). |
| `/api/questions/:id/note` | PUT | Update user notes/answers on a question (Protected). |
| `/api/ai/generate-questions` | POST | Generate a set of questions from Hugging Face (Protected). |
| `/api/ai/generate-explanation` | POST | Generate explanation and tips for a specific question (Protected). |

🚀 Getting Started
Prerequisites
- **Node.js 18+**
- **npm** or **yarn**

1️⃣ Clone the Repository
```bash
git clone https://github.com/sachin-185/InternView-AI-AI-Powered-Interview-Preparation.git
cd "intern app"
```

2️⃣ Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=8000
JWT_SECRET=your_jwt_secret_key_here
HUGGINGFACE_TOKEN=your_huggingface_api_token_here
```

3️⃣ Initialize Dependencies
Install dependencies for both frontend and backend modules:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend runner dependencies
cd ../frontend
npm install

# Install Vite React app dependencies
npm run install:app
```

4️⃣ Run the Application
Boot the backend server and frontend client concurrently:

- **Start Express Backend**:
  ```bash
  cd backend
  npm run dev
  ```
  *Express API running on:* `http://localhost:8000`

- **Start React Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```
  *Vite Dev Server running on:* `http://localhost:5173`

📐 Architecture
```
┌────────────────────────────────────────────────────────┐
│                   InternView UI (Vite)                 │
│  ┌──────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │ Dashboard│   │ Session Form │   │ Interview Prep │  │
│  │ (Grid)   │   │ (Config)     │   │ (Cards/Drawer) │  │
│  └────┬─────┘   └──────┬───────┘   └───────┬────────┘  │
└───────┼────────────────┼───────────────────┼───────────┘
        │                │                   │
        ▼                ▼                   ▼
┌────────────────────────────────────────────────────────┐
│                   Express API Server                   │
│  ┌─────────────────┐ ┌───────────────┐ ┌─────────────┐ │
│  │  /api/auth/     │ │  /api/sessions│ │  /api/ai/   │ │
│  │  (Auth & Upload)│ │  (CRUD)       │ │  (Inference)│ │
│  └────────┬────────┘ └───────┬───────┘ └──────┬──────┘ │
└───────────┼──────────────────┼────────────────┼────────┘
            ▼                  ▼                ▼
┌────────────────────────┐             ┌─────────────────┐
│     SQLite Database    │             │  Hugging Face   │
│  ┌──────────────────┐  │             │  Serverless API │
│  │  Users Table     │  │             │  ┌────────────┐ │
│  ├──────────────────┤  │             │  │ Qwen-2.5-7B│ │
│  │  Sessions Table  │  │             │  │ LLM        │ │
│  ├──────────────────┤  │             │  └────────────┘ │
│  │  Questions Table │  │             └─────────────────┘
│  └──────────────────┘  │
└────────────────────────┘
```

📁 Project Structure
```
intern app/
├── 📂 backend/                 # Node.js + Express.js API
│   ├── 📂 config/
│   │   └── db.js               # SQLite Database Connection & Schema Init
│   ├── 📂 controllers/         # Route controller handlers
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   └── sessionController.js
│   ├── 📂 middleware/          # JWT protection & multer file upload handling
│   ├── 📂 models/              # SQLite SQL statement wrappers (User, Session, Question)
│   ├── 📂 routes/              # Express Router mounts
│   ├── 📂 uploads/             # Custom profile avatar local storage
│   ├── server.js               # Express Server bootstrap
│   └── package.json
│
├── 📂 frontend/                # Client root
│   ├── 📂 internview-prep-ai/  # React Vite SPA
│   │   ├── 📂 src/
│   │   │   ├── 📂 components/  # Layouts, loaders, modals, and cards
│   │   │   ├── 📂 context/     # Auth Context and user states
│   │   │   ├── 📂 pages/       # Auth (Login/Signup), Home (Dashboard), InterviewPrep
│   │   │   ├── 📂 utils/       # Axios instance config & API endpoint mappings
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   └── package.json
│   └── package.json            # Prefix runner scripts
│
└── README.md                   # Project Documentation
```

🔒 Security & Privacy
- **Stateless Authentication**: Protected routes verify requests via client-side JWT authorization headers.
- **Local Database Isolation**: Keeps all session records, notes, and user credentials compiled within a single local SQLite container (`internapp.db`).
- **Encrypted Passes**: Employs industry-standard Bcryptjs encryption layers prior to database writes.

🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

🙏 Acknowledgments
- **Hugging Face** for serverless model hosting of the state-of-the-art Qwen LLM.
- **Vite & React** for rapid development capabilities.
- **SQLite** for lightweight local file database execution.