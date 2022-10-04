import plusButton from '../../assets/plusButton.svg';

type Props = {
  handleClick: () => void;
};

export default function AddTaskButton({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="bg-emerald-700 shadow-lg p-4 rounded-lg fixed bottom-6 right-6"
    >
      <img src={plusButton} alt="" />
    </button>
  );
}
