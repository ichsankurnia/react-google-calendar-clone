import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

interface IDayProps {
	day: any,
	weekIndex: number
}

const Day: React.FC<IDayProps> = ({day, weekIndex}) => {
	const [tasksInDay, setTasksInDay] = useState<any[]>([])

	const { monthIndex, setShowModalEvent, setDaySelected, filteredTasks, setTaskSelected } = useContext(GlobalContext)

	useEffect(() => {
		const tasks = filteredTasks.filter((task) => task.date === day.format("DD-MM-YY") )
		setTasksInDay(tasks)
	}, [filteredTasks, day])

	const getCurrentDayClass = (day: any) => {
		return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ?
			'bg-blue-600 text-white rounded-full w-7 flex justify-center item-center' : ''
	}
	const currentDayNotInCurrentMonth = (day: any) => {
		return day.format('MM-YY') !== dayjs().month(monthIndex).format('MM-YY') ?
			'text-gray-300' : ''
	}
	const isSunday = (day: any) => {
		return dayjs(day).format('dddd').toLowerCase() === 'minggu' ? 'text-red-400' : ''
	}

	const handleClickDate = (day: any) => {
		setDaySelected(day)
		setShowModalEvent(true)
	}

	const handleSelectTask = (task: any) => {
		setTaskSelected(task)
		setShowModalEvent(true)
	}

	return (
		<div className='border border-slate-200 flex flex-col items-center'>
			<header className='flex flex-col'>
				{weekIndex === 0 &&
					<p className={`text-sm mt-1 uppercase ${isSunday(day)}`}>{dayjs(day).format('ddd')}</p>
				}
				<p className={`text-sm p-1 my-1 ${isSunday(day)} ${currentDayNotInCurrentMonth(day)} ${getCurrentDayClass(day)}`}>{dayjs(day).format('DD')}</p>
			</header>
			<div className='flex flex-1 flex-col w-full cursor-pointer' onClick={() => handleClickDate(day)}>
				{tasksInDay.map((task, key) =>
					<span key={key} className={`${task.label} p-1 mr-3 text-white text-sm rounded mb-1 truncate hover:bg-opacity-70`} 
						onClick={()=>handleSelectTask(task)}
					>
						{task.title}
					</span>
				)}
			</div>
		</div>
	)
}


type PropsCalendar = {
	daysInMonth: any[]
};

const Calendar: React.FC<PropsCalendar> = ({ daysInMonth }) => {
	return (
		<>
			<div className='flex-1 grid grid-cols-7 grid-rows-5'>
				{daysInMonth.map((week: any[], key) =>
					<React.Fragment key={key}>
						{week.map((day, keyx) =>
							<Day key={keyx} day={day} weekIndex={key} />
						)}
					</React.Fragment>
				)}
			</div>
		</>
	);
}

export default Calendar;