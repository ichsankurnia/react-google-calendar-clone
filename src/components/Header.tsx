import dayjs from 'dayjs';
import React, { useContext } from 'react';
import logo from '../assets/logo.png'
import GlobalContext from '../context/GlobalContext';

type Props = {};

const Header: React.FC<Props> = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext)

	const handlePrevMonth = () => {
		setMonthIndex(monthIndex - 1)	
	}

	const handleNextMonth = () => {
		setMonthIndex(monthIndex + 1)
	}

	const handleToday = () => {
		setMonthIndex(monthIndex === dayjs().month()? monthIndex + Math.random() : dayjs().month())
	}
	return (
		<header className='flex items-center px-4 py-2'>
			<img src={logo} alt='calendar' className='mr-2 w-12 h-12' />
			<h1 className=' mr-10 text-xl text-gray-600 font-medium'>Calendar</h1>
			<button className='border rounded-xl py-2 px-5 mr-5 hover:bg-gray-100' onClick={handleToday}>Today</button>
			<i className="fa-solid fa-chevron-left text-gray-600 cursor-pointer mx-2" onClick={handlePrevMonth}></i>
			<i className="fa-solid fa-chevron-right text-gray-600 cursor-pointer mx-2" onClick={handleNextMonth}></i>
			<h2 className='font-medium text-xl text-gray-600 ml-6'>{dayjs(new Date(dayjs().year(), monthIndex) ).format('MMMM YYYY')}</h2>
		</header>
	);
}

export default Header;