
export default function DayDisplay() {
	function fill() {
		const hours = []
		for (let i = 1; i <= 24; i++) {
			hours.push(<div key={i} id={String(i)} className="h-10 w-full">
			<div className="h-[1px] w-full bg-zinc-300"></div>
		</div>)
		}
		return hours;
	} 

	return (
		<div className="w-24 shrink-0 text-zinc-500 gap-2">
			<div className="sticky top-0 flex flex-col items-center">
				<div className="text-5xl font-bold">01</div>
				<div className="font-bold">lun</div>
				<div className="w-[2px] h-6 bg-zinc-500"></div>
			</div>
			<div className="w-full mt-6">
				{fill()}
			</div>
		</div>
	)
}
