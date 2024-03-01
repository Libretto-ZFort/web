# Libretto Web

Libretto Web is a modern, real-time chat application designed to provide users with an intuitive and interactive communication platform.

# Development and Build

1. Clone this project.
2. Run ``` npm install ``` to install all necessary dependencies for the project.
3. Launch the application with ``` npm start ```.
4. Access the app at ``` http://localhost:3000 ``` and immerse yourself in collaborative efficiency.

# Configuration

Create a ```.env``` file in the root directory and add ```REACT_APP_SUPABASE_DOMAIN```, ```REACT_APP_SUPABASE_KEY``` and ```REACT_APP_BACKEND_URL```.

```js
export const BASE_URL_API = '< YOUR BASE API URL HERE >';
export const VITE_SUPABASE_KEY = '< YOUR SUPABASE KEY HERE >';
export const VITE_SUPABASE_URL = '< YOUR SUPABASE URL HERE >';
```

# Supabase DB Schema

Our database is structured to support the intricate features of our application, with a schema that facilitates real-time updates and user-specific task management.
Design Decisions

![alt text](<images/CleanShot 2024-03-01 at 19.49.42.png>)
![alt text](<images/CleanShot 2024-03-01 at 19.50.29.png>)
![alt text](<images/CleanShot 2024-03-01 at 19.51.07.png>)


# Technologies Used

Our technical stack is curated to provide a seamless, full-stack development experience:

1. React: The foundation of our front-end, React brings to life our user interface with agility and sophistication.
2. Supabase: A versatile framework that lays the groundwork for our backend processes, including database and real-time functionality, without the need for a separate backend service.
3. Shadcn with Radix UI: Our chosen UI framework, designed for rapid, clean, and straightforward UI construction.
4. Tailwind CSS: This utility-first CSS framework empowers us to prototype with speed and efficiency.
5. Luxon: A library that elegantly handles and formats dates.
6. React Hook Form: This framework simplifies form creation, making it a breeze to set up and manage form states.
7. Zod: A schema definition library that validates data with precision.
8. @hookform/resolvers: A bridge that unites React Hook Form and Zod for streamlined form validation.
9. React Hot Toast: Adds a sprinkle of engagement with toasty notifications.
10. Axios: A powerful HTTP client that enriches the 'fetch' API with an array of configuration options and an easy-to-use syntax.
11. React Query: An outstanding library that manages server state, automatic refetching, and provides hooks for handling loading and error states seamlessly.

# Design Decisions

The project structure is intentionally designed to promote clean code and ease of navigation:

1. Common: Houses UI components like buttons, cards, inputs, and more, ensuring a consistent design language across the application.
2. Lib: Contains core functionalities such as Axios for HTTP requests and a custom Supabase client.
3. Modules: The application's features are modularized, with auth managing authentication and chat dedicated to messaging functionalities, each with their components and hooks.
4. Providers: Specific components like auth-session-provider.tsx manage the context for authentication sessions, centralizing the state logic.
