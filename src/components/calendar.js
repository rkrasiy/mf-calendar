import {useState, useRef, useEffect } from 'react';
import {AiOutlineRight, 
    AiOutlineLeft,
    AiOutlineAppstoreAdd,
    AiOutlineCaretLeft, 
    AiOutlineCaretRight, 
    AiOutlineCaretDown,
    AiOutlineBars,
    } from "react-icons/ai";


function Calendar() {
    const today = new Date();
    const [ date, setDate ] = useState(new Date());
    const [ dayFocus, setDayFocus ] = useState();
    const [dropdown, setDropdown] = useState(false)
    let firstLoad = true;
    const w = 116

    useEffect(() => {
       // console.log("enter")
        //must be checked if the month has been changed
        const dayPosition = dayFocus ? dayFocus : today.getDate();
        let scrollLeft;     
        
        //Bad part !!!!
        if(dayPosition >= 4){
            scrollLeft = (dayPosition - 4) * w
        }else if(dayPosition === 1){
            scrollLeft = 0
        }else{
            scrollLeft = dayPosition * w
        }


       // console.log(dayPosition)
        document.getElementById('slider').scrollLeft = scrollLeft
    // Actualiza el título del documento usando la API del navegador
        
    });

    const tableRef = useRef(null);

    const userPreferedFirstWeekday = 1;
    

    const todayIso = today.toISOString().split("T")[0]
    //const dd = today.getDate();
    // console.log("actual day", dd)
    // console.log(date)
    // console.log(today)
    const MM = date.getMonth();
    const YY = date.getFullYear();

    // const initMonthDay = 1;
    // const lastMonthDay = daysInMonth(date.getMonth(), date.getFullYear());
    // const startMonthWeekday = whichWeekday(date.getMonth(),  date.getFullYear())
    //date.setHours(23,59,0)
    // console.log(initMonthDay, lastMonthDay)
    // console.log('Weekday',startMonthWeekday )

   // const prevMonthDays = fillArray( startMonthWeekday )
    //const thisMonthDays = fillArray(daysInMonth(date.getMonth(), date.getFullYear()))

    const calendarMonth = fillArray(daysInMonth(date.getMonth(), date.getFullYear()))
   // console.log(thisMonthDays)
    //  let days = getSevenDays()
    //console.log("First weekday of month: ", date.getDay(), weekDays[date.getDay()]);
    const sliderLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft  - (7 * w)
    }
    const sliderRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft  + (7 * w)
    }
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className='text-center text-3xl mb-1 border-b-1 pb-4'>My Perfect Calendar</h1>
                <div className='container flex items-center justify-between mb-4'>
                    <button onClick={()=>{
                        console.log("menu")
                    }}>
                        <AiOutlineAppstoreAdd size={25}/>
                    </button>
                    <div className='flex justify-center flex-col'>
                        
                        <div className='flex h-[50px] items-center'>
                            <button onClick={()=>{
                                const m = date.getMonth()
                                const y = date.getFullYear()
                                setDate(new Date(`${y}/${m - 1}/1`))
                                setDayFocus(null)
                            }}>
                                <AiOutlineCaretLeft size={15}/>
                            </button> 
                            <div className="text-center p-4 text-xl font-semibold text-gray-600">
                                {monthNames[date.getMonth()]}
                                <p className='block text-black text-sm font-thin'>{date.getFullYear()}</p>
                            </div>
                            <button onClick={()=>{
                                const m = date.getMonth()
                                const y = date.getFullYear()
                                setDate(new Date(`${y}/${m + 2}/1`))
                                setDayFocus(null)
                            }}>
                                <AiOutlineCaretRight size={15}/>
                            </button>
                        </div>
                        {/* <div className='font-light text-xs relative'>
                            <button 
                                tabIndex={0}
                                onClick={()=> setDropdown(!dropdown)}
                                onBlur={()=> setDropdown(false)}
                                className="flex items-center m-auto">
                                {date.getFullYear()} 
                                <AiOutlineCaretDown size={10} className="ml-1"/>
                            </button> 
                            {
                                dropdown 
                                ? <div className='absolute bg-white p-4 shadow-md'>
                                    <ul>
                                        <li>2021</li>
                                        <li>2022</li>
                                        <li>2023</li>
                                        <li>2024</li>
                                    </ul>
                                </div> 
                                : null
                            }   
                        </div> */}
                    </div>
                    <button>
                        <AiOutlineBars size={25} />
                    </button>
                </div>
                <div className='relative flex items-center justify-between'>
                
                   <button onClick={sliderLeft} >
                        <AiOutlineLeft size={25}/>
                   </button>
                    <div className="w-full flex flex-row gap-4 overflow-x-scroll snap-mandatory snap-x scroll scroll-smooth pb-4 pl-2 pr-2 max-w-[810px] styled-scrollbar"
                            id='slider'
                            onScroll={()=> {
                               // console.log(tableRef.current?.scrollLeft)
                            }}
                            ref={tableRef}>
                        {calendarMonth.map(day => {
                            const eDate = new Date (YY, MM , day);
                            const dd = eDate.toISOString().split("T")[0]
                            let classes = "";
                            if(dd === todayIso){
                                classes = 'text-red-600 font-semibold'
                            }else{
                                classes = 'font-light'
                            }
                           // console.log(dd === todayIso, dd, todayIso)
                            return <div 
                                key={day} 
                                onClick={() => {
                                    setDayFocus(eDate.getDate())
                                   // console.log('C', dayFocus)
                                }}
                                className={`p-8 border border-slate-900 flex flex-col items-center justify-center cursor-pointer rounded-lg snap-center snap-always min-w-[100px] ${classes}`}>
                                    <p className="text-4xl">{eDate.getDate()}</p> 
                                    <p>{weekDays[eDate.getDay()]}</p>   
                            </div>
                        } )
                        }
                    </div>
                    <button onClick={sliderRight}>
                        <AiOutlineRight size={25}/>
                    </button>
                </div>
            </div>
        </>

    )

    function addEvent(d) {
        console.log('AddEvent: ', d)
    }
    function next() {
        console.log('Next: ')
    }
    function prev() {
        console.log('prev: ')
    }
}



const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function fillArray(n = 0) {
    return Array(n).fill().map((_, i) => i + 1)
}

function whichWeekday(month, year) {
    return new Date(year, month, 1).getDay()
}

export default Calendar;