import React from 'react'
import Questions from './Questions'

export default function QuizPage(props) {
    
    const  quizElements = props.data.map(element => <Questions 
        hold={props.holdd} 
        data={element} 
        displayPoints={props.displayPoints}/>)

    const btn = props.form.length == 5 ? false : true

    const styles = {
        cursor: btn && "not-allowed",
        opacity: btn && 0.5
    }
    
    return(
            <section className="welcome-page">
                <div className="blob"></div>
                <div className="another"></div>
                <form className="formm" onSubmit={props.showPoints}>
                {quizElements}
                <div className="form--flex">
                <p className="right-answers">{props.displayPoints && `You scored ${props.right}/${props.rightAnswer.length} correct answers`}</p>
                <div className="form"><button className="form--button" style={styles} disabled={btn}>{props.displayPoints ? "Play Again" : "Check answers"}</button>
                </div>
                </div>
                </form>
            </section>
    )
}