import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App/App';
import LogIn from './routes/LogIn/LogIn';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthContextProvider>
);
