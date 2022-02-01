# Journal

A journal that allows you to view, add and filter posts, open and see comments on them, also view albums and their contents. 
Based on data from [{JSON} Placeholder](https://jsonplaceholder.typicode.com/) and desire to learn React

App demonstrates react opportunities: 
* JSX
* Functional components
* Basic hooks (useState, useMemo, useEffect, useContext)
* Custom hooks 
  - based on useMemo for sorting and filtering posts s
  - to display loading
  - observer for "Infinite scrolling"
  - counting total page for pagination
* Authorization (in case available pages and routing, whithout user check on server)
* Reusable UI components including modal form, input, button, select, loader, pagination, navbar, animation items list
* Animation using React Transition Group
* Server side using Axios and [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)
* Routing using [React Router](https://reactrouter.com/)
* "Infinite scrolling" using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Environment

* Node.js v16.0.0+
* npm v7.10.0+

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
