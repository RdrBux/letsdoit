import plusButton from '../../assets/plusButton.svg';

export default function AddTaskButton() {
  return (
    <button className="bg-emerald-700 shadow-lg p-4 rounded-lg fixed bottom-6 right-6">
      <img src={plusButton} alt="" />
    </button>
  );
}
