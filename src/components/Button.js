function Button (props){
    const { onclick, children, className } = props

    const clickHandler = ()=>{
        onclick()
    }

    return (
        <button 
            type="button"
            onClick={clickHandler} 
            className={className}
            >{children}
        </button>
    )
}

export default Button