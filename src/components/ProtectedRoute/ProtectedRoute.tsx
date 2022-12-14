import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children }: { children: any }) {
  const user = useContext(AuthContext);
  if (!user.id) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
