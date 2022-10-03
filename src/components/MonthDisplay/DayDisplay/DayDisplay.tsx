export default function DayDisplay() {
  function fill() {
    const hours = [];
    for (let i = 1; i <= 24; i++) {
      hours.push(
        <div key={i} id={String(i)} className="h-16 w-full relative text-black">
          <div className="h-[1px] w-full bg-zinc-300"></div>
          <div className="bg-zinc-500/25 absolute top-1 left-1 w-22 text-xs rounded-lg p-2">
            tengo que hacer una cosa y después toca otra
          </div>
        </div>
      );
    }
    return hours;
  }

  return (
    <div className="w-32 shrink-0 text-zinc-500 gap-2">
      <div className="sticky top-0 flex flex-col items-center">
        <div className="text-5xl font-bold">01</div>
        <div className="font-bold">lun</div>
        <div className="w-[2px] h-6 bg-zinc-500"></div>
      </div>
      <div className="w-full mt-6">{fill()}</div>
    </div>
  );
}
