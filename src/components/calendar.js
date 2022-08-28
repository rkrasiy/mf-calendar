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
    const [ dropdown, setDropdown] = useState(false);
    const todayIso = today.toISOString().split("T")[0]
    const MM = date.getMonth();
    const YY = date.getFullYear();
    
    const [ selected, setSelected ] = useState(today.getDate())

    const calendarMonth = fillMonth(MM, YY)
    let controller = ""

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
    // Actualiza el título del documento usando la API del navegador
        
    },[]);



    let pos = {left: 0, x: 0, time: 0};
    const mouseDownHandler = function(e){
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        
        pos.left = sliderRef.current.scrollLeft;
        pos.x = e.clientX;
        pos.time = new Date().getTime()
   

        const mouseMoveHandler = function(e){
            const dx = e.clientX - pos.x;
            sliderRef.current.scrollLeft = pos.left - dx;
        }

        const mouseUpHandler = function(e){       
            controller = e.type
            const amp = new Date().getTime();
            const rest = amp - pos.time
            pos.time = rest
            e.stopPropagation();
            document.removeEventListener('mousemove', mouseMoveHandler)
            document.removeEventListener('mouseup', mouseUpHandler)
        }

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }
    //console.log('mouse',  position)

    const clickHandler = function(e, day){

        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        setSelected(day)
    }

    const sliderRef = useRef(null);

    const userPreferedFirstWeekday = 1;
  
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
                            ref={sliderRef}
                            onMouseDown={mouseDownHandler}
                            >
                        {
                            calendarMonth.map( (date, i) => {
                                const d = new Date(date)
                                const weekday = weekDays[d.getDay()]
                                const day = d.getDate();
                                let classes = "",
                                    borderColor = "border-stone-300";
                                if(day === selected) 
                                    borderColor = 'border-emerald-500'
                                if(date === todayIso){
                                    classes = 'text-red-600 font-semibold'
                                }else{
                                    classes = 'font-light'
                                }
                                return <div 
                                    key={day} 
                                    onClick={(e) => clickHandler(e, day)}
                                    dateTime={date}
                                    className={`p-8 border ${borderColor} flex flex-col items-center justify-center rounded-lg  min-w-[100px] ${classes} select-none`}>
                                        <p className="text-4xl">{day}</p> 
                                        <p>{weekday}</p>   
                                </div>
                            })
                        }
                    </div>
                    <Button onclick={sliderRight}>
                       <AiOutlineRight size={25}/>
                    </Button>
                    
                </div>
                <div>
                    Day selected: {selected}
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