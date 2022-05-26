import React from "react"
import { ActionRedux } from "./ContextWrapper";

export interface AppContextInterface {
    monthIndex: number;
    setMonthIndex: (index: number) => any
    smallCalendarIndex: number | null,
    setSmallCalendarIndex: (index: number| null) => any,
    daySelected: any | null,
    setDaySelected: (day: any) => any,
    showModalEvent: boolean,
    setShowModalEvent: (state: boolean) => any,
    savedTasks: any[],
    dispatchCalTask: (action: ActionRedux) => any,
  }
  

const GlobalContext = React.createContext({} as AppContextInterface )

export default GlobalContext