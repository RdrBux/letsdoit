type Tasks = {
	hour: number;
	description: string;
	people: string[];
	sendMsj: null | string;
}

type Days = {
	day: number;
	tasks: Tasks[];
}

type AllTaks = {
	month: string;
	days: Days[]
}

const allTasks: AllTaks[] = [
	{
		month: 'January',
		days: [
			{
				day: 1,
				tasks: [
					{
						hour: 7,
						description: 'Hacer algo',
						people: [],
						sendMsj: null,
					}
				]
			}
		]
	},

];

export default allTasks;