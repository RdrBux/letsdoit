import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App/App';
import LogIn from './routes/LogIn/LogIn';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { NotifContextProvider } from './context/NotifContext';
import { FriendsContextProvider } from './context/FriendsContext';
import { ThemeContextProvider } from './context/ThemeContext';

/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
} */

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <NotifContextProvider>
        <FriendsContextProvider>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </FriendsContextProvider>
      </NotifContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
