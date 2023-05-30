import React from "react"

export default function Die(props) {
    
    const heldColour = props.isHeld ? { backgroundColor: "#59E391" } : { backgroundColor: "white" };
    


    return (
        <section>
            <div className='die-face' style={heldColour} onClick={props.handleClick}>
                <h2 className="die-num">{props.value}</h2>
            </div>
        </section>

    )}