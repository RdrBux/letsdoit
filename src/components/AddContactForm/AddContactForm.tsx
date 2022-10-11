import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase';

type Props = {
  close: () => void;
};

export default function AddContactForm({ close }: Props) {
  const [email, setEmail] = useState('');

  async function handleClick(email: string) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    const contact: any[] = [];
    querySnapshot.forEach((doc) => contact.push(doc.data()));

    if (contact.length < 1) {
      return console.error('Not found');
    }
    if (contact[0].id) {
      console.log(contact[0].id);
    }

    close();
  }

  return (
    <div className="rounded-lg bg-zinc-800 p-4 font-bold text-white">
      <label className="">
        Dirección de correo:
        <input
          className="mt-2 w-full rounded-lg bg-zinc-200 p-2 text-zinc-800"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@gmail.com"
        />
      </label>
      <button
        onClick={() => handleClick(email)}
        className="mt-4 rounded-lg bg-emerald-600 px-6 py-2 shadow-lg"
      >
        Enviar solicitud
      </button>
    </div>
  );
}
