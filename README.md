# Mind60 - Mental Wellness Platform

## Project Overview

Mind60 is a mental wellness platform designed to provide support and resources for users. It features a responsive user interface, real-time chat functionality, a "Shared Voices" section for community posts, and integrates with Firebase for authentication and data storage. The backend is built with FastAPI, while the frontend uses React with Vite and Tailwind CSS.

## Features

### Frontend

- **Responsive UI**: Navbar, Chat, and Therapy pages are designed to be flexible and adapt to both mobile and desktop views.
- **User Authentication**: Secure sign-up and login using Firebase Authentication.
- **Real-time Chat**: Users can engage in one-on-one chat conversations.
- **Shared Voices**: A community section where users can create and view posts.

### Backend

- **FastAPI Framework**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Firebase Admin SDK Integration**: Securely interacts with Firebase services (Authentication, Firestore).
- **Firebase Authentication**: Verifies Firebase ID Tokens for protected API endpoints.
- **Firestore Database**: Used for persistent storage of chat messages and community posts.
- **CORS Middleware**: Configured to allow secure communication between the React frontend and FastAPI backend.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast frontend build tool.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Firebase JavaScript SDK**: For client-side authentication and interaction with Firebase services.
- **React Router DOM**: For declarative routing in React applications.

### Backend

- **Python 3.x**: Programming language.
- **FastAPI**: Web framework for building APIs.
- **Uvicorn**: ASGI server for FastAPI.
- **Firebase Admin SDK (Python)**: For server-side interaction with Firebase.
- **python-dotenv**: For loading environment variables.
- **Pydantic**: For data validation and settings management.

## Setup and Installation

Follow these steps to get the Mind60 project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- Python 3.8+
- Git
- A Firebase Project with a Web App configured and a Service Account Key JSON file.

### 1. Clone the Repository

```bash
git clone https://github.com/Bugslayers-o-o/Mind60.git
cd Mind60
```

### 2. Backend Setup

Navigate to the `backend` directory, set up a virtual environment, install dependencies, and configure Firebase.

```bash
cd backend
```

#### 2.1 Create and Activate Virtual Environment

```bash
python -m venv .venv
# On Windows
.venv\Scripts\Activate.ps1
# On macOS/Linux
source .venv/bin/activate
```

#### 2.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` does not exist, create it with the following content and then run `pip install -r requirements.txt`:

```
fastapi==0.110.0
uvicorn==0.29.0
python-dotenv==1.0.1
firebase-admin==6.4.2
pydantic==2.7.1
```

#### 2.3 Firebase Service Account Key

1.  Download your Firebase Service Account Key JSON file from your Firebase Project settings (Project settings -> Service accounts -> Generate new private key).
2.  Rename the downloaded file to `mind-sathi-71fee-firebase-adminsdk-fbsvc-86bfdceda4.json` (or whatever your file is named).
3.  Place this JSON file inside the `backend` directory.

#### 2.4 Create `.env` File

Create a file named `.env` in the `backend` directory with the following content, replacing `[YOUR_FIREBASE_SERVICE_ACCOUNT_KEY_FILENAME]` with the actual name of your JSON file (e.g., `mind-sathi-71fee-firebase-adminsdk-fbsvc-86bfdceda4.json`):

```
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./[YOUR_FIREBASE_SERVICE_ACCOUNT_KEY_FILENAME]
```

#### 2.5 Run the Backend Server

```bash
uvicorn main:app --reload
```

The backend server should now be running on `http://127.0.0.1:8000`.

### 3. Frontend Setup

Navigate back to the root directory and set up the React application.

```bash
cd .. # Go back to the root Mind60 directory
```

#### 3.1 Install Node.js Dependencies

```bash
npm install
```

#### 3.2 Configure Firebase on Frontend

1.  Open `src/firebase.ts`.
2.  Replace the placeholder `firebaseConfig` object with your actual Firebase Web App configuration. You can find this in your Firebase Project settings (Project settings -> Your apps -> Web app -> Config).

    Example `src/firebase.ts` content:

    ```typescript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export default app;
    ```

#### 3.3 Run the Frontend Development Server

```bash
npm run dev
```

The frontend development server should now be running, typically on `http://localhost:5173` or `http://localhost:3000`.

## API Endpoints (Backend)

The FastAPI backend exposes the following key endpoints:

### Authentication

- `GET /protected`: A sample protected route that requires a valid Firebase ID Token in the `Authorization: Bearer <ID_TOKEN>` header. Returns the UID of the authenticated user.

### Chat

- `POST /chat/message`: (Protected) Sends a chat message from the authenticated user to another user.
  - **Request Body**: `{"receiver_id": "string", "content": "string"}`
  - **Response**: `MessageResponse` object.
- `GET /chat/history/{receiver_id}`: (Protected) Retrieves the chat history between the authenticated user and a specific receiver.
  - **Response**: `List[MessageResponse]` objects.

### Posts (Shared Voices)

- `POST /posts`: (Protected) Creates a new "Shared Voices" post.
  - **Request Body**: `{"content": "string"}`
  - **Response**: `PostResponse` object.
- `GET /posts`: (Protected) Retrieves all "Shared Voices" posts, ordered by timestamp (most recent first).
  - **Response**: `List[PostResponse]` objects.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

[Specify your project's license here, e.g., MIT, Apache 2.0, etc.]
