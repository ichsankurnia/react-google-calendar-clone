import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getDaysInMonth } from '../utils';

type Props = {};

const Sidebar: React.FC<Props> = () => {
	const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
	const [currentMonthDays, setCurrentMonthDays] = useState(getDaysInMonth())

	const { monthIndex, setSmallCalendarIndex, daySelected, setDaySelected, setShowModalEvent } = useContext(GlobalContext)

	useEffect(() => {
		setCurrentMonthDays(getDaysInMonth(currentMonthIndex))
	}, [currentMonthIndex])

	useEffect(() => {
		setCurrentMonthIndex(monthIndex)
	}, [monthIndex])

	const handlePrevMonth = () => {
		setCurrentMonthIndex(currentMonthIndex - 1)
	}

	const handleNextMonth = () => {
		setCurrentMonthIndex(currentMonthIndex + 1)
	}

	const handleSelectDate = (day: any) => {
		setSmallCalendarIndex(currentMonthIndex)
		setDaySelected(day)
	}

	const getDayClass = (day: any) => {
		const format = 'DD-MM-YY'
		const nowDay = dayjs().format(format)
		const currDay = day.format(format)
		const selectDay = daySelected && daySelected.format(format)
		if(nowDay === currDay){
			return 'bg-blue-500 text-white'
		}else if(currDay === selectDay){
			return 'bg-blue-100 text-blue-600 font-bold'
		} else{
			return ''
		}
	}
	const currentDayNotInCurrentMonth = (day: any) => {
		return day.format('MM-YY') !== dayjs().month(currentMonthIndex).format('MM-YY') ?
			'text-gray-300' : ''
	}
	const isSunday = (day: any) => {
		return dayjs(day).format('dddd').toLowerCase()==='minggu'?'text-red-400':''
	}

	return (
		<aside className='border w-64 p-5'>
			<button className='border px-4 py-2.5 rounded-full flex items-center justify-center shadow-md hover:shadow-xl'
				onClick={()=>setShowModalEvent(true)}
			>
				<i className="fa-solid fa-plus mr-3"></i>
				<p className='text-sm mr-2'>Create</p>
			</button>

			<div className='mt-9'>
				<header className='flex justify-between items-center'>
					<h4 className='text-gray-600 font-medium'>
						{dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
					</h4>

					<div className='flex items-center'>
						<i className="fa-solid fa-chevron-left text-gray-600 cursor-pointer text-sm flex justify-center items-center mx-2" onClick={handlePrevMonth}></i>
						<i className="fa-solid fa-chevron-right text-gray-600 cursor-pointer text-sm flex justify-center items-center mx-2" onClick={handleNextMonth}></i>
					</div>
				</header>
				<div className='grid grid-cols-7 grid-rows-6'>
					{currentMonthDays[0].map((day, i) =>
						<p key={i} className={`text-sm py-1 text-center ${isSunday(day)}`}>{day.format("dd").charAt(0)}</p>
					)}
					{currentMonthDays.map((week, key) =>
						<React.Fragment key={key}>
							{week.map((day, idx) =>
								<button key={idx} className={`py-1 w-full rounded-full transition-all ease-in-out duration-200 hover:bg-gray-100 ${isSunday(day)} ${currentDayNotInCurrentMonth(day)} ${getDayClass(day)}`}
									onClick={()=>handleSelectDate(day)}
								>
									<span className='text-xs font-medium'>
										{day.format('D')}
									</span>
								</button>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;