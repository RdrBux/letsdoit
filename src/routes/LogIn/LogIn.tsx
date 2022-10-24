import { signInWithRedirect } from 'firebase/auth';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth, googleProvider, facebookProvider } from '../../firebase';
import googleLogo from '../../assets/googleLogo.svg';
import facebookLogo from '../../assets/facebookLogo.svg';

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
    /* try {
      await signInWithRedirect(auth, facebookProvider);
    } catch (err) {
      console.log(err);
    } */
    console.log('hi');
  }

  return (
    <div className="login-bg | flex h-screen flex-col items-center">
      {user.id && <Navigate to="/" replace={true} />}
      <h1 className="my-12 text-5xl">DOIT</h1>
      <div className="flex flex-col gap-2 rounded bg-white p-6 text-zinc-700">
        <p className="mb-2">Iniciar sesión con</p>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 rounded border-2 border-zinc-200 py-3 px-4 hover:bg-zinc-100"
            onClick={handleLogInGoogle}
          >
            <img className="w-6" src={googleLogo} alt="" />
            <div>Google</div>
          </button>
          <button
            className="flex items-center gap-2 rounded border-2 border-zinc-200 py-3 px-4 hover:bg-zinc-100"
            onClick={handleLogInFacebook}
          >
            <img className="w-6" src={facebookLogo} alt="" />
            <div>Facebook</div>
          </button>
        </div>
      </div>
    </div>
  );
}
