import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import GlobalContext, { IFilterTag, ITask } from './GlobalContext';

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
    const [taskSelected, setTaskSelected] = useState<ITask>({} as ITask)
    const [labels, setLabels] = useState<IFilterTag[]>([] as IFilterTag[])

    const [savedTasks, dispatchCalTask] = useReducer(savedTasksReducer, [], initTasks )

    /* update tampilan pada calnedar besar, jika memilih tanggal pada kalendar kecil */
    useEffect(() => {
        if(smallCalendarIndex !== null){
            setMonthIndex(smallCalendarIndex)
        }
    }, [smallCalendarIndex])

    const filteredTasks = useMemo(() => {
        return savedTasks.filter((task: ITask) =>
            labels.filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(task.label)
        )
    }, [savedTasks, labels])

    useEffect(() => {
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
    }, [savedTasks])

    useEffect(() => {
        setLabels((prevLabels: any) => {
            return [...new Set(savedTasks.map((task: ITask) => task.label))].map(
                (label) => {
                    const currentLabel = prevLabels.find((item: IFilterTag) => item.label === label)
                    return {
                        label,
                        checked: currentLabel ? currentLabel.label: true
                    }
                }
            )
        })
    }, [savedTasks])


    function updateLabel(data: IFilterTag){
        setLabels(labels.map((item: IFilterTag) => item.label === data.label? data: item))
    }

    return (
        <GlobalContext.Provider 
            value={{
                monthIndex, setMonthIndex,
                smallCalendarIndex, setSmallCalendarIndex,
                daySelected, setDaySelected,
                showModalEvent, setShowModalEvent,
                savedTasks, dispatchCalTask,
                taskSelected, setTaskSelected,
                labels, setLabels, updateLabel,
                filteredTasks
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;