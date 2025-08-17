# Developer Documentation

This page contains technical information for developers and contributors to the JunAiKey project.

## Technical Stack

The JunAiKey project utilizes a modern, full-stack technology set:

*   **Frontend**: [React](https://react.dev/) (v19)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (v5)
*   **Backend & Cloud Services**: [Firebase](https://firebase.google.com/)
    *   **Authentication**: Firebase Auth
    *   **Database**: Firestore
    *   **Backend Logic**: Cloud Functions
    *   **Hosting**: Firebase Hosting
*   **AI Integration**: [Google Gemini API](https://ai.google.dev/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Routing**: [React Router](https://reactrouter.com/)

---

## Project Setup and Deployment

This project is configured for a full-stack deployment to Firebase.

### Prerequisites

1.  **Firebase Account**: Ensure you have a Firebase account and have created a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  **Firebase CLI**: Install the Firebase CLI globally.
    ```bash
    npm install -g firebase-tools
    ```
3.  **Login**: Login to your Firebase account via the CLI.
    ```bash
    firebase login
    ```

### Configuration

1.  Open the `.firebaserc` file in the project root.
2.  Replace `"your-firebase-project-id"` with your actual Firebase project ID.

### Backend Setup (Firebase Functions)

The backend API runs on Firebase Functions. Install its dependencies before the first deployment.

1.  Navigate to the `functions` directory:
    ```bash
    cd functions
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Return to the root directory:
    ```bash
    cd ..
    ```

### Deploying the Application

Once configured, you can deploy the entire application (frontend and backend) using the provided npm script:

```bash
npm run deploy
```

This command will build the React application for production and deploy it to Firebase Hosting, along with the backend functions.

---

## System Architecture Overview

The "TCG Omni Matrix" game is designed with a **modular and scalable architecture** to support its complexity and long-term evolution.

### Microservices Architecture

To handle frequent updates, new card series, and evolving game mechanics, the system is built on a **microservices architecture**. This approach decomposes the system into smaller, independent, and reusable services.

Key services might include:
*   **Game Engine Service**: Manages the core turn-based logic, card effect resolution, and Matrix state.
*   **Player Profile Service**: Handles player data, collections, and progress.
*   **Matchmaking Service**: Manages queuing and matching players for games.
*   **"Matrix" Computation Service**: A dedicated service for handling the complex calculations and interactions within the Terminus Matrix.

This architecture allows for:
*   **Rapid Iteration**: New features or game modes can be developed and deployed as independent services.
*   **Targeted Scaling**: High-load services (like the computation engine) can be scaled independently of other parts of the system.
*   **Enhanced Maintainability**: Each service is smaller and easier to understand, test, and maintain.

### Data Management

The system uses a hybrid data storage strategy to ensure performance:

*   **In-Memory Databases / Caches**: Used for managing the highly dynamic, real-time state of the game matrix during a session to ensure low-latency updates.
*   **Scalable NoSQL/SQL Databases**: Used for storing the static card catalog, player profiles, and other persistent data.
*   **Vector Search**: Utilized for advanced features like semantic card searching or "smart deck" recommendations based on thematic similarities.
