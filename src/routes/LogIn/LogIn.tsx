import { signInAnonymously, signInWithRedirect } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth, googleProvider } from '../../firebase';
import googleLogo from '../../assets/googleLogo.svg';
import logInImage from '../../assets/login-img.svg';
import loader from '../../assets/loader.svg';

export default function LogIn() {
  const user = useContext(AuthContext);

  useEffect(() => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
      if (loader) {
        loader.style.display = 'none';
      }
    }, 3000);
  }, []);

  async function handleLogInGoogle() {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogInAnon() {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div
        id="loader"
        className="fixed top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-emerald-900 text-[20vw] text-white lg:text-[10vw]"
      >
        <div>
          DO<span className="text-lime-200">IT</span>
        </div>
        <img className="w-20" src={loader} alt="" />
      </div>
      <div className="flex min-h-screen flex-col items-center bg-emerald-100 pb-6 font-manrope lg:p-2">
        <div className="container mt-6 flex flex-col-reverse items-center  lg:mt-10 lg:flex-row">
          {user.id && <Navigate to="/" replace={true} />}
          <div className="rounded bg-white p-4 shadow-lg lg:w-7/12 lg:gap-4 lg:p-10">
            <h1 className="text-3xl font-semibold lg:text-5xl">
              El siguiente gran paso para lograr todas tus metas
            </h1>
            <div className="mt-2 text-sm text-zinc-700 lg:text-base">
              DO IT es el calendario virtual que te organizará tu vida personal
              y social. Puedes agregar amigos, compartir actividades y chatear
              con ellos desde la aplicación.
            </div>
            <div className="mt-4 flex w-full flex-col gap-4 rounded border border-black px-6 py-4 text-black shadow-lg lg:w-fit">
              <p className="font-semibold">Ingresar:</p>
              <button
                className="flex items-center gap-2 rounded border border-black bg-white py-3 px-6 shadow hover:bg-zinc-100 lg:px-14"
                onClick={handleLogInGoogle}
              >
                <img className="w-6" src={googleLogo} alt="" />
                <div className="font-medium">Continuar con Google</div>
              </button>
              <div className="relative w-full border">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
                  o
                </div>
              </div>
              <div
                onClick={handleLogInAnon}
                className="cursor-pointer font-medium underline"
              >
                Ingresar como anónimo.
              </div>
            </div>
          </div>
          <div className="-mb-24 lg:mb-0">
            <img src={logInImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
