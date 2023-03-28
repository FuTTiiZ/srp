import AnswerButton from '../Test/AnswerButton/AnswerButton'

import './Result.css'

import { getClosestAlignedParties } from './alignment'

const PartyImage = ({ top5, id }) => <img src={`http://localhost:5000/static/party-images/${top5[id].id}.png`} alt={top5[id].name} draggable={false} />

const Info = ({ questions }) => {
  const rating = JSON.parse(localStorage.getItem('rating'))

  const generateTopParties = () => {

    const coords = [[], []]
    questions.forEach(({ affects }, i) => {
      coords[affects === 'economics' ? 0 : 1].push(rating[i] * 100 - 5)
    })

    coords[0] = coords[0].reduce((a, b) => a + b) / coords[0].length
    coords[1] = coords[1].reduce((a, b) => a + b) / coords[1].length

    const top5 = getClosestAlignedParties(...coords)

    return (<>
      <div className="podium">
        <div>
          <PartyImage top5={top5} id={1} />
          <h3>{top5[1].name}</h3>
        </div>
        <div>
          <PartyImage top5={top5} id={0} />
          <h3>{top5[0].name}</h3>
        </div>
        <div>
          <PartyImage top5={top5} id={2} />
          <h3>{top5[2].name}</h3>
        </div>
      </div>

      <div className="mentions">
        <div>
          <PartyImage top5={top5} id={3} />
          <h3>{top5[3].name}</h3>
          <h2>4</h2>
        </div>
        <div>
          <PartyImage top5={top5} id={4} />
          <h4>{top5[4].name}</h4>
          <h2>5</h2>
        </div>
      </div>

    </>)
  }

  return (
    <div className='result-wrapper'>
      <div className='result'>
        <h2>Resultat</h2>

        {generateTopParties()}

        <div className="button-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <AnswerButton label='Tag igen' restart={true} onClick={() => {
            localStorage.removeItem('currentQuestion')
            localStorage.removeItem('finished')
            window.location.reload()
          }} />
        </div>
      </div>
    </div>
  )
}

export default Info