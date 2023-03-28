import { useState, useEffect } from 'react'

import './Test.css'

import Info from './Info/Info'
import Question from './Question/Question'

const DUMMY_QUESTION = { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?' }

const Test = ({ onFinished, questions, setLoading }) => {

  const [allAnswers, setAllAnswers] = useState(JSON.parse(localStorage.getItem('answers')) || {})
  const [currentQuestion, setCurrentQuestion] = useState(-1)

  const [rating, setRating] = useState(JSON.parse(localStorage.getItem('rating')) || {})
  const [pendingRatings, setPendingRatings] = useState({})

  useEffect(() => {

    const currQuestion = parseInt(localStorage.getItem('currentQuestion'))
    setCurrentQuestion(currQuestion >=0 ? currQuestion : -1)

  }, [])

  const startCheckFinish = () => {
    const interval = setInterval(() => {
      /* console.log('checking', pendingRatings) */

      for (const q in pendingRatings)
        if (pendingRatings[q]) return

      clearInterval(interval)
      onFinished(rating)
    }, 1000)
  }

  const getRating = async (answer, readyToFinish) => {
    if (answer.length < 10 || answer.length > 150) return

    setPendingRatings({ ...pendingRatings, [currentQuestion]: true })
    const res = await fetch('http://localhost:5000/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionIdx: currentQuestion,
        answer,
      })
    })

    let { rating: questionRating, question } = await res.json()

    const newRating = { ...rating, [question]: questionRating }
    setRating(newRating)
    localStorage.setItem('rating', JSON.stringify(newRating))

    /* console.log(question) */

    const newPendingRatings = { ...pendingRatings, [question]: false }
    setPendingRatings(newPendingRatings)

    /* console.log(readyToFinish, newPendingRatings) */
    if (!readyToFinish) return

    for (const q in newPendingRatings)
      if (newPendingRatings[q]) return startCheckFinish()
    
    onFinished(newRating)
  }

  const handleNav = answer => {
    if (answer.length < 10 || answer.length > 150) return

    const newAllAnswers = { ...allAnswers, [currentQuestion]: answer }
    setAllAnswers(newAllAnswers)
    localStorage.setItem('answers', JSON.stringify(newAllAnswers))

    const nextQuestion = currentQuestion + 1

    if (nextQuestion >= questions.length) {
      getRating(answer, true)
      return
    }

    localStorage.setItem('currentQuestion', nextQuestion)

    setCurrentQuestion(currentQuestion + 1)

    getRating(answer)
  }

  const startTest = () => {
    setCurrentQuestion(0)
    localStorage.setItem('currentQuestion', 0)
  }

  const stepBack = () => {
    if (currentQuestion <= 0) return

    const prevQuestion = currentQuestion - 1

    setCurrentQuestion(prevQuestion)

    localStorage.setItem('currentQuestion', prevQuestion)
  }

  const generateQuestions = currQuestion => {
    const prevQuestion = currQuestion - 1
    const nextQuestion = currQuestion + 1

    const prevOuttaBounds = prevQuestion < 0
    const nextOuttaBounds = nextQuestion >= questions.length

    return <>
      <Question cb={stepBack} isPrevious={true} isPreview={true} hide={prevOuttaBounds ? true : false} question={prevOuttaBounds ? DUMMY_QUESTION : questions[prevQuestion]} answer={prevOuttaBounds ? '' : allAnswers[currQuestion - 1]} />
      <Question cb={handleNav} question={questions[currQuestion]} answer={allAnswers[currQuestion] || ''} lastQuestion={nextOuttaBounds} setLoading={setLoading} />
      <Question isPreview={true} hide={nextOuttaBounds ? true : false} question={nextOuttaBounds ? DUMMY_QUESTION : questions[nextQuestion]} answer={nextOuttaBounds ? '' : allAnswers[currQuestion + 1]} />
    </>
  }

  return (
    currentQuestion < 0 ? <Info start={startTest} /> :
      <div className="question-wrapper">
        {questions.length > 0 && generateQuestions(currentQuestion)}
      </div>
  )

}

export default Test