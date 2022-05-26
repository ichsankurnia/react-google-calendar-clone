import { useContext, useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import ModalEvent from "./components/ModalEvent";
import Sidebar from "./components/Sidebar";
import GlobalContext from "./context/GlobalContext";
import { getDaysInMonth } from "./utils";

function App() {
  // console.log(dayjs().format('dddd MM YYYY'))
  // console.log(dayjs().format('D MMM'))
  // console.log(dayjs().month())

  const [currentMonthDays, setCurrentMonthDays] = useState(getDaysInMonth())

  const { monthIndex, showModalEvent } = useContext(GlobalContext)

  useEffect(() => {
    setCurrentMonthDays(getDaysInMonth(monthIndex))
  }, [monthIndex])

  return (
    <>
      <div className='font-poppins h-screen flex flex-col'>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <Calendar daysInMonth={currentMonthDays} />
        </div>

      </div>
      {showModalEvent &&
      <ModalEvent />
      }
    </>
  );
}

export default App;
