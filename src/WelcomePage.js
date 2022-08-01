import React from 'react'

export default function WelcomePage(props) {
    return (
        <section className="welcome-page">
            <div className="blob"></div>
            <div className="another"></div>
            <div className="flex-container">
                <h1 className="welcome-page--title">Quizzical</h1>
                <p className="welcome-page--description">Quiz that I've built</p>
                <button onClick={props.renderQuizPage} className="welcome-page--button">Start Quiz</button>
            </div>
        </section>
    )
}