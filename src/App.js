
import './App.css';
import React from 'react'
import WelcomePage from './WelcomePage'
import QuizPage from './QuizPage'
import { nanoid } from 'nanoid'
import { findAllByTestId } from '@testing-library/react';

function App() {

  const[quizPage, setQuizPage] = React.useState(false)
  const[questions, setQuestions] = React.useState([])
  const[formData, setFormData] = React.useState([])
  const[rightAnswers, setRightAnswers] = React.useState([])
  const[count, setCount] = React.useState(0)
  const[showPoints, setShowPoints] = React.useState(false)

  const[final, setFinal] = React.useState([])

  function renderQuizPage() {
    if(questions.length !== 0) {
      setQuizPage(true)
    }
  }

  function changeIsHeld(id1, id2, answer) {
    setRightAnswers(questions)
    setQuestions(oldQuestions => oldQuestions.map(question => {
        return {
        ...question,
        answers: question.answers.map(answer => {return (answer.id === id1 && question.id === id2) ? {...answer, held: !answer.held} : (answer.id !== id1 && question.id === id2) ? {...answer, held: false} : answer})
        }
    }))
    UpdateFormData(answer, id2, id1) 
  }

function UpdateFormData(answer, questionId, answerId) {

  let boolean = false
  let boolean2 = false
  for(let i = 0; i < formData.length; i++) {
    if(answer === formData[i].answer) {
      boolean = true
      setFormData(prev => prev.filter(element => element.answer !== answer))
    }
    else if (questionId === formData[i].question) {
      boolean2 = true
      setFormData(prev => prev.filter(element => element.question !== questionId ))
    }
  }
  if (boolean == false || boolean2 == true) {
    setFormData(prev => prev.concat({answer: answer, question: questionId, id: answerId}))
  }
}

function showPoint(event) {

  if(showPoints === true) {
    setShowPoints(false)
    return
  }
  event.preventDefault()
  setShowPoints(true)

  setFinal(formData.map(answer => answer.answer))
  // Compare formData to rightAnswers.
  let boolean = false
  for (let i = 0; i < formData.length; i++) {
    for (let j = 0; j < rightAnswers.length; j++) {
      if (formData[i].answer === rightAnswers[j].correct_answer) {
        setCount(count => count + 1)
        boolean = true
      }
    }
    if (boolean == false) {
        updateRight("red", formData[i].id)
    }
    boolean = false
  }

  for (let i = 0; i < questions.length; i++) {
    for(let j = 0; j < questions[i].answers.length; j++) {
    if (questions[i].answers[j].value === questions[i].correct_answer) {
    updateRight("green", questions[i].answers[j].id)
    }
  }
}
}

function updateRight(color, id) {
  setQuestions(prevQuestions => prevQuestions.map(prev => ({...prev,
  answers: prev.answers.map(answer => {
    if (answer.id === id) {
      return {
        ...answer,
        right: color
      }
    } else {
      return answer
    }
  }
    )})))
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
} 

  React.useEffect(() => {
    let randomNum = Math.floor((Math.random() * 30) - 5)
      fetch("https://opentdb.com/api.php?amount=30&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results.slice(randomNum, randomNum + 5)))
      .then(()=> setQuestions(prevQuestions => prevQuestions.map(prev => ({...prev, answers:prev.incorrect_answers.concat(prev.correct_answer), id: nanoid(), held: false}))))
      .then(() => setQuestions(prevQuestions => prevQuestions.map(prev => ({...prev, answers: prev.answers.map(answer => ({value: answer, id: nanoid(), held: false, right: ""}))}))))
      .then(() => setQuestions(prevQuestions => prevQuestions.map(prev => ({...prev, answers: shuffle(prev.answers)}))))
      .then(() => setQuestions(prevQuestions => prevQuestions.map(
        prev => ({...prev, question: prev.question.replace(/&quot;/g, '"')})
      )))
      .then(() => setQuestions(prevQuestions => prevQuestions.map(
        prev => ({...prev, question: prev.question.replace(/&#039;/g, "'")})
      )))
      
  }, [])

  return (
      <div className="app-container">
          {!quizPage && <WelcomePage renderQuizPage={renderQuizPage} />}
              {quizPage && <QuizPage 
              data={questions} 
              holdd={changeIsHeld} 
              form={formData}
              right={count}
              rightAnswer={rightAnswers}
              showPoints={showPoint}
              displayPoints={showPoints}
              final={final}
              />}        
      </div>);
}

export default App;
