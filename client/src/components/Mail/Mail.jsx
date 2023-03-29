import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import './Mail.css';

import emailRender from './assets/email.png'

const Mail = props => {

  const email = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    localStorage.setItem('askedMail', true)
    localStorage.setItem('email', email.current.value || 'none')

    props.cb(true)
  }

  return (<div className="mail-wrapper">
    <div className="mail">
      <h1>Skriv dig op med email</h1>
      <h2>... og modtag dine svar samt relevante nyheder</h2>
      <img src={emailRender} draggable="false"/>

      <div>
        <input ref={email} type="email" pattern=".+@.+\..+" placeholder="Indtast en gyldig email" size="30" required/>
        <button onClick={handleSubmit}>Indsend</button>
      </div>

      <p onClick={handleSubmit}>Jeg ønsker <u>ikke</u> at modtage mine svar mm. via mail</p>
    </div>
  </div>
  )
}

export default Mail