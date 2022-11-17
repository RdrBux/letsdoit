import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { Task } from '../../types/types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ParticipantAvatar from '../ParticipantAvatar/ParticipantAvatar';

type Props = {
  task: Task;
  close: () => void;
};

export default function TaskDisplay({ task, close }: Props) {
  const user = useContext(AuthContext);

  // Conditions to select elements to display
  const isCreator = task.creator.id === user.id;
  const userDataInParticipantsArr = task.participants.find(
    (person) => person.id === user.id
  );
  const hasAnswered =
    !!userDataInParticipantsArr && !!userDataInParticipantsArr.isAccepted;

  async function handleDelete() {
    if (isCreator) {
      try {
        close();
        // DELETE DOC ON OWN TASKS
        await deleteDoc(doc(db, 'users', user.id, 'tasks', task.id));

        // DELETE DOC REFERENCE ON EACH PARTICIPANT SHAREDTASKS COLLECTION
        task.participants.forEach(async (person) => {
          const taskRef = doc(db, 'users', person.id, 'sharedTasks', task.id);
          await deleteDoc(taskRef);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const docRef = doc(db, 'users', task.creator.id, 'tasks', task.id);
      try {
        close();
        const res = await getDoc(docRef);
        if (res.exists()) {
          const data = res.data() || [];
          const participantsArr = [
            ...data.participants.map((person: { id: string }) =>
              person.id === user.id ? { ...person, isAccepted: false } : person
            ),
          ];
          await updateDoc(docRef, {
            participants: participantsArr,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleAnswer(isAccepted: boolean = true) {
    const docRef = doc(db, 'users', task.creator.id, 'tasks', task.id);

    try {
      close();
      const res = await getDoc(docRef);
      if (res.exists()) {
        const data = res.data() || [];
        const participantsArr = [
          ...data.participants.map((person: { id: string }) =>
            person.id === user.id
              ? { ...person, isAccepted: isAccepted }
              : person
          ),
        ];
        await updateDoc(docRef, {
          participants: participantsArr,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const participants = [task.creator, ...task.participants].map((person) => (
    <ParticipantAvatar key={person.id} user={person} />
  ));

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen justify-center overflow-y-auto bg-zinc-900/80 py-32">
      <OutsideAlerter action={close}>
        <div className="relative w-80 rounded-lg bg-white px-4 pb-4 pt-8 text-zinc-700 shadow-lg dark:bg-zinc-800 dark:text-zinc-100">
          <button onClick={close} className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-1 border-b pb-4 dark:border-zinc-600">
            <h3 className="text-2xl font-semibold leading-7 text-zinc-900 dark:text-white">
              {task.title}
            </h3>
            <p className="">{task.description}</p>
            <div className="mt-4 flex items-center gap-2 font-semibold">
              <p>
                {format(parseISO(task.date), "eeee, dd 'de' MMMM", {
                  locale: es,
                })}
              </p>
              <div className="rounded-full bg-zinc-200 py-1 px-3 dark:bg-zinc-600">
                {task.hour} hs
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-b py-4 dark:border-zinc-600">
            <div className="font-semibold">PARTICIPANTES</div>
            <div className="flex flex-wrap gap-4">{participants}</div>
          </div>

          <div className="pt-4">
            {!isCreator && !hasAnswered ? (
              <div>
                Has sido invitado a esta actividad
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-500"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex items-center gap-1 font-bold text-red-700 dark:text-red-500"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-500"
              >
                {isCreator ? 'ELIMINAR ' : 'ELIMINAR PARA MÍ '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
