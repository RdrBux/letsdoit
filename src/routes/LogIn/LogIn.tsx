import { signInWithRedirect } from 'firebase/auth';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth, googleProvider, facebookProvider } from '../../firebase';

export default function LogIn() {
  const user = useContext(AuthContext);

  async function handleLogInGoogle() {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogInFacebook() {
    try {
      await signInWithRedirect(auth, facebookProvider);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      {user && <Navigate to="/" replace={true} />}
      <h1>TITULO</h1>
      <button onClick={handleLogInGoogle}>LOG IN WITH GOOGLE</button>
      <button onClick={handleLogInFacebook}>LOG IN WITH FACEBOOK</button>
    </div>
  );
}
