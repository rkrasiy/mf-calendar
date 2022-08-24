import {useState, useRef, useEffect } from 'react';
import Button from './Button';
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
    const [ position, setPosition] = useState(0)

    let firstLoad = true;
    const w = 116

    useEffect(() => {
       // console.log("enter")
        //must be checked if the month has been changed
        const dayPosition = today.getDate();

        let scrollLeft;     
        
        //Bad part !!!!
        if(dayPosition >= 4){
            scrollLeft = (dayPosition - 4) * w
        }else if(dayPosition === 1){
            scrollLeft = 0
        }else{
            scrollLeft = dayPosition * w
        }
    
       sliderRef.current.scrollLeft = scrollLeft
       //setPosition(scrollLeft)
       console.log("Start: ", scrollLeft)
    // Actualiza el título del documento usando la API del navegador
        
    });

    const mouseMoveHandler = function(e){
        console.log("moved", position)
       // const old = sliderRef.current.scrollLeft
        // const dx = e.clientX - position
        // sliderRef.current.scrollLeft = dx
        // setPosition(dx)
      // setPosition( e.clientX)
      sliderRef.current.scrollLeft +=  e.clientX - 273
    }

    const mouseUpHandler = function(e){
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
    }

    const mouseDownHandler = function(e){
        const f = e.clientX - 273
        const newPos = f + position
        setPosition( newPos )
        console.log("new: ", position)
      // setPosition(e.screenX)
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }
    //console.log('mouse',  position)

    const sliderRef = useRef(null);

    const userPreferedFirstWeekday = 1;
    

    const todayIso = today.toISOString().split("T")[0]

    const MM = date.getMonth();
    const YY = date.getFullYear();
    
    const calendarMonth = fillMonth(MM, YY)
    
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
                    <Button onclick={
                            ()=>{
                                console.log("menu")
                            }
                        }>
                        <AiOutlineAppstoreAdd size={25}/>
                    </Button>
                    <div className='flex justify-center flex-col'>
                        
                        <div className='flex h-[50px] items-center'>
                            <Button onclick={
                                    ()=>{
                                        const m = date.getMonth()
                                        const y = date.getFullYear()
                                        setDate(new Date(`${y}/${m - 1}/1`))
                                        setDayFocus(null)
                                    }
                                }>
                                <AiOutlineCaretLeft size={15} />
                            </Button> 
                            <div className="text-center p-4 text-xl font-semibold text-gray-600">
                                {monthNames[date.getMonth()]}
                                <p className='block text-black text-sm font-thin'>{date.getFullYear()}</p>
                            </div>
                            <Button onclick={
                                    ()=>{
                                        const m = date.getMonth()
                                        const y = date.getFullYear()
                                        setDate(new Date(`${y}/${m + 2}/1`))
                                        setDayFocus(null)
                                    }
                                }>
                                <AiOutlineCaretRight size={15}/>
                            </Button>
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
                   <Button onclick={sliderLeft}>
                        <AiOutlineLeft size={25}/>
                    </Button>
                    <div className="w-full flex flex-row gap-4 overflow-x-scroll pb-4 pl-2 pr-2 max-w-[810px] styled-scrollbar cursor-grabbing"
                            id='slider'
                            ref={sliderRef}
                            onMouseDown={mouseDownHandler}
                            >
                        {calendarMonth.map( (date, i) => {
                            const d = new Date(date)
                            const weekday = weekDays[d.getDay()]
                            const day = d.getDate();
                            let classes = "";
                            if(date === todayIso){
                                classes = 'text-red-600 font-semibold'
                            }else{
                                classes = 'font-light'
                            }
                            return <div 
                                key={day} 
                                // onClick={() => {
                                //     setDayFocus(day)
                                // }}
                                dateTime={date}
                                className={`p-8 border border-slate-900 flex flex-col items-center justify-center rounded-lg  min-w-[100px] ${classes}`}>
                                    <p className="text-4xl">{day}</p> 
                                    <p>{weekday}</p>   
                            </div>
                        } )
                        }
                    </div>
                    <Button onclick={sliderRight}>
                       <AiOutlineRight size={25}/>
                    </Button>
                    
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

function fillMonth(month, year){
    const n = daysInMonth(month, year);
    return Array(n).fill().map((_, index) => {
        const d = new Date(year, month , index + 1, 2, 0 , 0)
        return d.toISOString().split("T")[0]
    })
}

function whichWeekday(month, year) {
    return new Date(year, month, 1).getDay()
}

export default Calendar;