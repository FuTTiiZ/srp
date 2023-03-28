import './AnswerButton.css'

const AnswerButton = ({ label, onClick, disabled, clickDisabled, restart }) => {

  return (
    <div className={`button-container ${restart && 'restart'}`} disabled={disabled}>
      <button className="answer" onClick={disabled ? clickDisabled : onClick}>{label}</button>
      {restart ?
        <img src="http://localhost:5000/static/restart.png" alt="Restart" className="restart" />
        : <div className="btn-highlight" style={label.toLowerCase() === 'afslut' ? {
        width: '60%',
        left: '20%'
      }: {}}></div>}
    </div>
  )
}

export default AnswerButton