type Task = {
	day: string;
	time: number;
	title: string;
	description: string;
	people: string[];
	sendMsg: null | string;
}

type Person = {
	month: string;
	tasks: Task[]
}

const person: Person[] = [
	{
		month: 'September',
		tasks: [
			{
				day: 'Wed Sep 28 2022 00:00:00 GMT-0300 (Argentina Standard Time)',
				time: 3,
				title: 'Título',
				description: 'Algo',
				people: [],
				sendMsg: null
			}			
		]
	},

];

export default person;