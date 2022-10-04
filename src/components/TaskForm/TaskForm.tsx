import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

type Props = {
  close: () => void;
};

export default function TaskForm({ close }: Props) {
  return (
    <div className="absolute inset-0 w-screen h-screen z-50 bg-zinc-900/80 flex items-center justify-center">
      <OutsideAlerter action={close}>
        <div className="bg-white p-6 rounded-lg relative min-w-[320px] shadow-lg">
          <button onClick={close} className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold">AGREGAR RECORDATORIO</h1>
          <p>1</p>
          <p>2</p>
        </div>
      </OutsideAlerter>
    </div>
  );
}
