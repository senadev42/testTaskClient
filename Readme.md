# README for Test Task Client

Note: The server for this site is hosted on testtask-server.onrender.com which got inactive after less than 15 minutes of activity so the first request will take a while as the web server spins up.

This is the client-side of a full-stack web application that allows users to register, log in, and search for cities using the GeoDB Cities API. The application was built using the React.js library and interacts with the backend API using Axios HTTP client.

## Getting Started

To run the application on your machine, you need to have Node.js, npm and Git installed. Then, follow these steps:

1. Clone the repository to your local machine using the command:

   ````
   git clone https://github.com/senadev42/testTaskClient.git
   ````

2. Navigate to the project directory using:

   ```
   cd testTaskClient
   ```

3. Install the dependencies using the command:

   ```
   npm install
   ```

4. Start the development server using the command:

   ```
   npm run dev
   ```

   This will run the application on `http://localhost:4000`. This can be changed in vite.config.ts.


## Usage

The website has three major pages. Search, NearMe and History.

1. Search: Enter a country name and select a country from the drop down.
2. NearMe: Press the near me button upon which the website will ask your browser for location permission. Provided permission and the page will load a list of cities near the area.
3. History: Will provide a list of all countries searched in the search page.


## Technologies Used

- React - A JavaScript library for building user interfaces
- React Router Dom - A popular routing library for React applications
- React Redux - A predictable state container for JavaScript apps
- Redux Toolkit - An opinionated, batteries-included toolset for efficient Redux development
- React Icons - A collection of popular icons for React applications
- React Select - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support
- React Toastify - A React library that helps you to add notifications to your app with ease.

### Development Dependencies

- TypeScript - A typed superset of JavaScript that compiles to plain JavaScript
- Tailwind CSS - A utility-first CSS framework for rapid UI development
- Vite - A build tool that aims to provide a faster and leaner development experience for modern web projects

## Known Issues

The application was initially built to use cookies for authentication, but due to limitations with free hosting providers, the client-side was later modified to use JWT tokens instead. As a result, the server-side of the application has not been updated to work with JWT tokens, and the cookies-based authentication is still in place.

## Credits

This project was created by [Meheret Samuel](https://github.com/senadev42) as part of a test task.
