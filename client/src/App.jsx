import { useState, useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import Test from './components/Test/Test'
import Mail from './components/Mail/Mail'
import Result from './components/Result/Result'

import './App.css'

import vaLogo from './assets/logo.svg'

const App = () => {

  const [questions, setQuestions] = useState([])
  const [askedMail, setAskedMail] = useState(JSON.parse(localStorage.getItem('askedMail')))
  const [testFinished, setTestFinished] = useState(JSON.parse(localStorage.getItem('finished')))

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))

    setLoading(false)
  }, [])

  const finishTest = rating => {
    localStorage.setItem('finished', true)
    setTestFinished(true)
    setLoading(false)
  }

  return (<>

    <nav>
      <img className="logo" src={vaLogo}/>
    </nav>

    <main>
      <Routes>
        <Route path="/" element={
          loading  || questions.length < 1 ? <div className="loading-wrapper"><img src="http://localhost:5000/static/loading3.webp" alt="Loading..." /></div> :
          askedMail === true ? 
            testFinished ? <Result questions={questions} /> : <Test onFinished={finishTest} questions={questions} setLoading={setLoading} />
          : <Mail cb={setAskedMail} />
        } />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </main>

  </>)
}

export default App
