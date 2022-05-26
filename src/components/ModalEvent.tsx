import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

const colorClasses = ['bg-amber-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-rose-500', 'bg-slate-600']

type Props = {};

const ModalEvent: React.FC<Props> = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [selectedLabel, setSelectedLabel] = useState(colorClasses[0])
	
	const { setShowModalEvent, daySelected, dispatchCalTask } = useContext(GlobalContext)

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		const taskToSave = {
			id: Date.now(),
			date: dayjs(daySelected).format('DD-MM-YY'),
			title,
			description,
			label: selectedLabel
		}

		dispatchCalTask({type: 'push', payload: taskToSave})
		setShowModalEvent(false)
	}

	return (
		<>
			<div className='modal-form font-poppins'>
				<div className='modal-form-outside' onClick={() => setShowModalEvent(false)} />
				<form className='bg-white rounded-lg shadow-2xl w-11/12 md:w-4/12 2xl:w-1/4 z-50' onSubmit={handleSubmit}>
					<header className='bg-gray-100 px-4 py-2.5 flex justify-end item-center rounded-t-lg'>
						<i className="fa-solid fa-xmark cursor-pointer text-gray-500" onClick={() => setShowModalEvent(false)}></i>
					</header>
					<div className='p-5 text-gray-600'>
						<div className='grid grid-cols-1/5 items-end gap-y-7'>
							<div></div>
							<input name='title' placeholder='Add Title' value={title} onChange={(e) => setTitle(e.target.value)} required
								className='pt-3 pb-0.5 outline-none border-b-2 border-gray-200 focus:border-blue-600 text-xl font-medium text-gray-600'
							/>
							<i className="fa-regular fa-clock text-gray-500 text-lg"></i>
							<p>{daySelected.format("dddd, DD MMMM YYYY")}</p>
							<i className="fa-solid fa-align-left text-gray-500 text-lg"></i>
							<input name='description' placeholder='Add Description' value={description} onChange={(e) => setDescription(e.target.value)}
								className='pt-3 pb-0.5 outline-none border-b-2 border-gray-200 focus:border-blue-600 text-gray-600'
							/>
							<i className="fa-regular fa-bookmark text-gray-500 text-lg"></i>
							<div className='flex gap-x-2'>
								{colorClasses.map((bgColor, key) =>
									<span key={key} className={`${bgColor} w-6 h-6 hover:bg-opacity-70 rounded-full flex justify-center items-center cursor-pointer`}
										onClick={()=>setSelectedLabel(bgColor)}
									>
										{selectedLabel === bgColor &&
										<i className="fa-solid fa-check text-white text-sm"></i>
										}
									</span>
								)}
							</div>
						</div>
					</div>
					<footer className='flex justify-end p-3 mt-5'>
						<button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded text-sm'>Save</button>
					</footer>
				</form>
			</div>
		</>
	);
}

export default ModalEvent;