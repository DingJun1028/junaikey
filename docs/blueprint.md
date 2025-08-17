# **App Name**: JunAiKey MVP

## Core Features:

- Function Interface: Provide a user interface to interact with the 12 core functions.
    *   **Description:** A central hub for users to access and trigger the various capabilities of the JunAiKey system, representing the interface to the 12 core functional dimensions. In the MVP, this will primarily focus on interacting with the initial implemented features like the Agent Network Tool.
    *   **User Stories:**
        *   As a user, I want to see a clear list or representation of available system functions.
        *   As a user, I want to be able to easily initiate a specific function.
        *   As a user, I want to understand the input required for a function and view its output.
- AI-Powered Theme Engine: Implement an AI-powered theme engine that allows users to generate UI/UX and a suitable vocabulary.
    *   **Description:** A feature that utilizes AI to generate dynamic themes for the application's user interface, including color schemes, typography, and potentially even suggesting a relevant vocabulary or tone for the AI's responses based on the theme.
    *   **User Stories:**
        *   As a user, I want to be able to describe a desired theme (e.g., "minimalist tech," "cozy study") and have the AI generate a theme based on it.
        *   As a user, I want to preview generated themes before applying them.
        *   As a user, I want the AI to suggest a suitable vocabulary or communication style based on the chosen theme.
- Agent Network Tool: Implement an agent network tool to automate and delegate tasks based on user defined parameters.
    *   **Description:** A core component for task automation. Users can define tasks, and the system, acting as an agent network, will process and delegate these tasks, potentially utilizing external services via the Rune System (though the full Rune System might be beyond the MVP scope, a basic integration for task execution is key).
    *   **User Stories:**
        *   As a user, I want to be able to define a task I want the system to perform (e.g., "summarize this document").
        *   As a user, I want to specify parameters or context for the task.
        *   As a user, I want to receive notification when the task is completed and view the results.
        *   As a developer, I want a clear way to define new types of tasks and the agents to handle them.
- Routing: Set up routing for different sections of the application.
    *   **Description:** Standard web application routing to navigate between different views or sections of the JunAiKey interface (e.g., a dashboard, a function list, theme settings).
    *   **User Stories:**
        *   As a user, I want to easily navigate between different parts of the application.
        *   As a user, I want to be able to use browser back and forward buttons for navigation.
        *   As a developer, I want a clear and organized way to define application routes.
- Theme Switching: Create a system to switch between light and dark mode, complementing the theme engine.
    *   **Description:** A basic toggle or setting that allows users to switch between a predefined light and dark mode, providing a fundamental level of theme customization even before the full AI Theme Engine is complete or for users who prefer standard modes.
    *   **User Stories:**
        *   As a user, I want to easily switch between a light and dark mode.
        *   As a user, I want the application to remember my preferred theme setting.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2), reminiscent of technology and innovation.
- Background color: A light gray (#F5F5F5) to provide a clean and modern feel.
- Accent color: A contrasting purple (#9C27B0) to highlight key interactive elements.
- Body and headline font: 'Inter', a sans-serif font, for a modern and objective look.
- Use a set of minimalist icons to represent the 12 core functions and other actions.
- Design a clean and structured layout, focusing on ease of navigation and usability.
- Implement subtle transitions and animations to enhance user experience, especially during theme and function switching.