import AnswerButton from '../AnswerButton/AnswerButton'

import './Info.css'

const Info = props => {
  return (<div className='info-wrapper'>
    <div className='info'>
      <h2 style={{ marginBottom: 0 }}>Inden du begynder!</h2>

      <p>I denne valgtest bliver du bedt om selv at give din holdning til forskellige problemstillinger.<br/>
      En AI-drevet algoritme vil derefter vurdere, hvor du ligger værdi- og fordelingspolitisk, for til sidst at vise,
      hvilket dansk politisk parti, du er mest enig med.</p>

      <h4 style={{ marginBottom: '5px' }}>Det gode svar</h4>
      <p style={{ marginTop: '5px', marginBottom: 0 }}>Eftersom det er en AI, der i sidste ende vurderer dit svar, kan det være en god idé at
      hjælpe den lidt på vej. Vi bruger GPT-3.5, hvilket er en relativt advanceret kunstig intelligens, til at vurdere svar.
      Selvom vi rammer plet 95% af tiden, kan du stadig hjælpe med at gøre din vurdering mere præcis.<br/><br/>
      Det er svært at sige, hvad der helt konkret udgør det god svar, dog kan du gøre dig følgende overvejelser,
      når du besvarer problemstillingerne:</p>
      <ol style={{ width: '50%' }}>
        <li>Relaterer svaret sig til emnet?</li>
        <li>Er svaret relativt kort og ukompliceret?</li>
      </ol>

      <h4 style={{ marginBottom: '5px' }}>Tak, fordi du tager dig tid til at tage testen, vi håber den kan hjælpe dig</h4>

      <div className="button-wrapper">
        <AnswerButton label='Begynd' onClick={props.start} />
      </div>
    </div>
  </div>
  )
}

export default Info