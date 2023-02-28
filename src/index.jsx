import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import { onAuthStateChanged, getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import firebaseApp from './utils/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

const firebaseAuth = getAuth(firebaseApp);
setPersistence(firebaseAuth, inMemoryPersistence);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
