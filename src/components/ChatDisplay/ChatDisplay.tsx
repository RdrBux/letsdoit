type Props = {
  selectedChatUser: any;
  close: () => void;
};

export default function ChatDisplay({ selectedChatUser, close }: Props) {
  return (
    <div className="flex flex-col justify-between bg-zinc-100 text-zinc-900">
      <div className="sticky top-14 flex items-center gap-4 rounded-b-2xl bg-white px-4 py-2 shadow">
        <button onClick={close} className="py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <img
          className="h-12 w-12 rounded-full"
          src={selectedChatUser.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <p className="font-semibold leading-5">{selectedChatUser.name}</p>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="mr-8 w-fit rounded-xl rounded-tl-none bg-white p-4 shadow-sm">
          Hola rodrigo!
        </div>
        <div className="ml-8 w-fit self-end rounded-2xl rounded-tr-none bg-emerald-200 p-4 shadow-sm">
          Hola José!
        </div>
        <div className="ml-8 w-fit self-end rounded-2xl rounded-tr-none bg-emerald-200 p-4 shadow-sm">
          Todo bien? Te quería comentar que el otro día pensé que podía ser
          blabla
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center rounded-t-2xl bg-white p-4 shadow-sm">
        <input
          className="h-10 w-full rounded-l-lg bg-zinc-100 p-4"
          type="text"
          placeholder="Mensaje"
        />
        <button className="h-10 rounded-r-lg bg-emerald-800 px-3 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-90"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
