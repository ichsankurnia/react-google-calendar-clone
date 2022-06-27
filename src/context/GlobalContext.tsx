import React from "react"
import { ActionRedux } from "./ContextWrapper";

export interface ITask {
  id: number,
  date: any,
  title: string,
  description: string,
  label: string
}

export interface IFilterTag {
  label: string,
  checked: boolean | undefined
}

export interface AppContextInterface {
    monthIndex: number;
    setMonthIndex: (index: number) => any
    smallCalendarIndex: number | null,
    setSmallCalendarIndex: (index: number| null) => any,
    daySelected: any | null,
    setDaySelected: (day: any) => any,
    showModalEvent: boolean,
    setShowModalEvent: (state: boolean) => any,
    savedTasks: ITask[],
    dispatchCalTask: (action: ActionRedux) => any,
    taskSelected: ITask,
    setTaskSelected: (task: ITask| any) => any,
    labels: IFilterTag[],
    setLabels: (labels: IFilterTag[]) => any,
    updateLabel: (label: IFilterTag) => any,
    filteredTasks: ITask[]
  }
  

const GlobalContext = React.createContext({} as AppContextInterface )

export default GlobalContext