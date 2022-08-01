import React from 'react'

export default function Questions (props) {
    let answers = [];
    for (let i = 0; i < props.data.answers.length; i++) {
    answers.push(props.data.answers[i].value)
    }

    function call(index) {
        if(!props.displayPoints) {
            return (
                () => 
        props.hold(props.data.answers[index].id, props.data.id, props.data.answers[index].value)
            )
        } else {
            return ( () =>  false)
        }
    }

    answers = answers.map((answer, index) => 
    <div onClick={call(index)} 
        className="answer-div" 
        style={{
            backgroundColor: (props.data.answers[index].held && !props.displayPoints)
             ? "#D6DBF5" : (!props.data.answers[index].held && !props.displayPoints)
             ? "#F5F7FB" : (props.displayPoints && props.data.answers[index].right === "green")
             ? "#94D7A2" : (props.data.answers[index].held && props.displayPoints && props.data.answers[index].right === "red")
             ? "#F8BCBC" : "#F5F7FB",
            opacity: (props.data.answers[index].right === "" && props.displayPoints
             || props.data.answers[index].right === "red" && props.displayPoints) ? 0.5 : 1
        }}>{answer}</div>)
    return (
                <div className="question">
                <h2 className="question">{props.data.question}</h2>
                <div className="flex">
                    {answers}
                </div>
                <br />
                </div>
    )
}