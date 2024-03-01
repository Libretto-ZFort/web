#  Libretto Web

Libretto Web is a modern, real-time chat application designed to provide users with an intuitive and interactive 
communication platform.

# Installation

Run ```npm install``` to install all necessary dependencies for the project.

# Configuration

Create a ```src/config/env.js``` file.

```js
export const BASE_URL_API = '< YOUR BASE API URL HERE >';
export const VITE_SUPABASE_KEY = '< YOUR SUPABASE KEY HERE >';
export const VITE_SUPABASE_URL = '< YOUR SUPABASE URL HERE >';
```

# Database Setup

Ensure your Supabase project has the following table schema:

| Field            | Type      |
| ---------------- | --------- |
| id               | BIGINT    |
| username         | VARCHAR   |
| text             | TEXT      |
| country          | VARCHAR   |
| is_authenticated | BOOLEAN   |
| timestamp        | timestamp |

To create the table, you can use the Supabase UI or the following SQL command:

```sql
CREATE TABLE messages (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username VARCHAR NOT NULL,
  text TEXT NOT NULL,
  country VARCHAR,
  is_authenticated BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP DEFAULT now() NOT NULL
);
```

Ensure you enable the Realtime functionality in Supabase for this table.

# Development and Build

1. To start the development server: ```npm run dev```, accessible at port 3006.
2. To build the project: ```npm run build```, which compiles the React client for production.

# Technologies Used

This project is built using a robust stack of modern web technologies to ensure high performance, scalability, and ease of maintenance:

1. Frontend: The application's user interface is developed using React, a popular JavaScript library for building user interfaces, combined with Vite for efficient and fast build processes.
2. Styling: Chakra UI is used for styling, providing a flexible and accessible component library to create a consistent and attractive design.
3. Real-time Database: Supabase is integrated as a Backend-as-a-Service (BaaS) to manage user authentication and real-time data storage, offering a scalable PostgreSQL database.
4. Additional Libraries: The application also utilizes libraries such as Axios for HTTP requests, React Router for navigation, Framer Motion for animations, and several others to enhance functionality and user experience.

# Design Decisions

The architecture of Libretto Web is thoughtfully crafted to foster an organized and modular development environment. At the core of our application structure lies a clear and intuitive directory layout, designed to streamline the development process and enhance code maintainability.

1. Components: The components directory is subdivided into layout and screens, with layout components such as Footer.tsx, Header.tsx, and NameForm.tsx serving as the foundational building blocks across different views. The screens subdirectory hosts self-contained units like ChatGPT and Conversation, each with their own nested components, encapsulating all related functionality for a cohesive user experience.
2. Configuration: Centralized configuration is managed within the config folder, containing critical application settings such as environmental variables in env.js, promoting easy access and scalability.
3. Context: Global state management is handled through React Context, as seen in AppContext.tsx, allowing for state to be shared across components without prop drilling, ensuring a cleaner and more efficient data flow.
4. Navigation: The navigation folder, with routes.ts, outlines the routing logic of the application, providing a dedicated space to manage navigational concerns, thereby decoupling it from UI components.
5. Services: The services directory is segmented into api and supabase, with chat-gpt-api.ts and supabase-client.ts appropriately abstracting the API logic and Supabase integration. This separation of concerns ensures that the data-fetching layer is isolated from the UI layer, facilitating easier testing and modifications.
6. Utilities: The utils folder encapsulates utility functions and shared logic that can be imported across the application, promoting DRY principles and reusability.


