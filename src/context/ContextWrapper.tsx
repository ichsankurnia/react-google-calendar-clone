import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';

export interface ActionRedux {
    type: string,
    payload: any
}

const savedTasksReducer = (state: any[], action: ActionRedux) => {
    const { type, payload } = action
    switch (type) {
        case 'push':
            return [...state, payload]
        case 'update':
            return state.map((task) => task.id === payload.id? payload : task)
        case 'delete':
            return state.filter((task) => task.id !== payload.id)
        default:
            throw new Error()
    }
}

const initTasks = () => {
    const storageTasks = localStorage.getItem('savedTasks')
    const parsedTasks = storageTasks? JSON.parse(storageTasks) : []
    return parsedTasks
}


type Props = {
    children: ReactNode
};

const ContextWrapper: React.FC<Props> = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarIndex, setSmallCalendarIndex] = useState<number|null>(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showModalEvent, setShowModalEvent] = useState(false)
    const [taskSelected, setTaskSelected] = useState(null)

    const [savedTasks, dispatchCalTask] = useReducer(savedTasksReducer, [], initTasks )

    /* update tampilan pada calnedar besar, jika memilih tanggal pada kalendar kecil */
    useEffect(() => {
        if(smallCalendarIndex !== null){
            setMonthIndex(smallCalendarIndex)
        }
    }, [smallCalendarIndex])

    useEffect(() => {
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
    }, [savedTasks])

    return (
        <GlobalContext.Provider 
            value={{
                monthIndex, setMonthIndex,
                smallCalendarIndex, setSmallCalendarIndex,
                daySelected, setDaySelected,
                showModalEvent, setShowModalEvent,
                savedTasks, dispatchCalTask,
                taskSelected, setTaskSelected
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;