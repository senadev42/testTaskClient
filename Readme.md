# README for Test Task Client

This is the client-side of a full-stack web application that allows users to register, log in, search for cities using the GeoDB Cities API and display search history. The application was built using the React.js library using Vite, uses redux-toolkit for global state management and abstracing api calls to the server.

_Note: The server for this site is hosted on [testtask-server.onrender.com](testtask-server.onrender.com) which goes dormant after more than 15 minutes of activity so the first request will take a while as the web server spins up. Check to see if the server is running by going to testtask-server.onrender.com before testing the client._

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

1. Search: Enter a country name and select a country from the drop down. This will fetch details provides by the [Country Details API](https://rapidapi.com/wirefreethought/api/geodb-cities/) from GeoDB.
 ![image](https://github.com/senadev42/testTaskClient/assets/101792782/91b43867-3b1e-4a0b-8587-92762bf029b2)

2. NearMe: Press the near me button upon which the website will ask your browser for location permission. Provide permission and the page will load a list of cities near the area. The table will also render a slider that allows the user to filter by distance.
 ![image](https://github.com/senadev42/testTaskClient/assets/101792782/063402d8-9019-4918-af39-7be9eb7181ac)

3. History: Will provide a list of all countries previous searched by the logged in user in the search page.
   ![image](https://github.com/senadev42/testTaskClient/assets/101792782/bfc3e41f-fb72-4371-a3d7-6bae6669c59b)



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


## Credits

This project was created by [Meheret Samuel](https://github.com/senadev42) as part of a test task.
