import { useState, useEffect, useRef } from 'react'

import './Question.css'

import AnswerButton from '../AnswerButton/AnswerButton'

const generatePreviewText = text => {
  if (text.length >= 70) return text.slice(0, 70)

  return text.repeat(Math.ceil(70 / text.length)).slice(0, 70)
}

const Question = props => {
  const questionEl = useRef(null)
  const counterEl = useRef(null)

  const [question, setQuestion] = useState(props.question)
  const [anim, setAnim] = useState('')
  const [answer, setAnswer] = useState(props.answer || '')
  const [lastQuestion, setLastQuestion] = useState(false)

  useEffect(() => {
    const { question: updatedQuestion, answer: updatedAnswer, lastQuestion: updatedLastQuestion } = props
    setQuestion(updatedQuestion)
    setAnswer(updatedAnswer || '')
    setLastQuestion(updatedLastQuestion)

    questionEl.current.style.setProperty('--input-color', updatedAnswer?.length < 10 || updatedAnswer?.length > 150 ? 'var(--color-red)' : 'var(--color-neutral)')

    setAnim('switch')
    setTimeout(() => setAnim(''), 250)

  }, [props.question.question])

  const answerQuestion = e => {
    e.preventDefault()

    if (lastQuestion) props.setLoading(true)
    
    /* questionEl.current.style.setProperty('--answer-color', `var(--color-${elem.value})`) */
    
    props.cb(answer)
  }

  const clickDisabled = e => {
    e.preventDefault()

    setAnim('error')
    setTimeout(() => setAnim(''), 250)
  }

  const handleInput = e => {
    e.preventDefault()

    const { value } = e.target

    /* if (value.length >= 140) questionEl.current.style.setProperty('--input-color', 'var(--color-red)') */
    if (value.length >= 10 && value.length <= 150) questionEl.current.style.setProperty('--input-color', value.length >= 145 ? 'var(--color-yellow)' : 'var(--color-neutral)')
    else questionEl.current.style.setProperty('--input-color', 'var(--color-red)')

    setAnswer(value)
  }

  //console.log(answer, answer.length)

  return (<> 
    <div ref={questionEl} onClick={props.isPrevious && props.cb} className={`question ${anim}`} style={props.hide ? {opacity: 0, pointerEvents: 'none'} : {}}>
      {props.question.image && <img className="thumb" draggable="false" src={'http://localhost:5000/static/question-images/'+props.question.image} />}
      <h2>{props.isPreview ? generatePreviewText(question.question) : question.question} {question.suggestion}</h2>
      <div className="input-wrapper">
        <textarea maxLength={155} onChange={handleInput} value={answer} placeholder="Besvar med min. 10 tegn"
          onBlur={() => questionEl.current.style.setProperty('--input-color', answer.length < 10 || answer.length > 150 ? 'var(--color-red)' : 'var(--color-neutral)')}
          onFocus={handleInput}
        ></textarea>
        <span ref={counterEl}>{answer?.length || 0} / 150</span>
      </div>
      <div className="button-wrapper">
        <AnswerButton label={lastQuestion ? 'Afslut' : 'Videre'} disabled={answer.length < 10 || answer.length > 150} onClick={answerQuestion} clickDisabled={clickDisabled} />
      </div>

      {props.isPrevious && <h3>Tilbage</h3>}
    </div>
  </>)

}


export default Question