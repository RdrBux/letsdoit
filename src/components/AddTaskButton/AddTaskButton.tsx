import plusButton from '../../assets/plusButton.svg';

type Props = {
  handleClick: () => void;
};

export default function AddTaskButton({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-10 rounded-lg bg-emerald-700 p-4 shadow-lg duration-300 hover:bg-emerald-800"
    >
      <img src={plusButton} alt="" />
    </button>
  );
}
