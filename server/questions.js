const Questions = [
  {
    question: 'Hvordan bør regeringen håndtere legaliseringen af euforiserende stoffer og kontrol af stofbrug?',
    image: 'drugs.jpg',
    gptPrompt: 'Vurder objektivt, hvor liberalistisk følgende svar på dette spørgsmål er på en skala fra 1-10',
    inverse: true,
    affects: 'values'
  },
  {
    question: 'Hvordan bør velstand og ressourcer fordeles i samfundet?',
    image: 'redistribution.jpg',
    gtptPrompt: 'Vurder objektivt, hvor socialistisk følgende svar på dette spørgsmål er på en skala fra 1-10',
    inverse: true,
    affects: 'economics'
  },
  { 
    question: 'Hvordan bør Danmarks udlændingepoltik være?',
    image: 'migrants.jpg',
    gptPrompt: 'Vurder objektivt, hvor højreorienteret følgende svar på dette spørgsmål er på en skala fra 1-10',
    affects: 'values'
  },
  {
    question: 'Hvilken rolle skal staten spille i beskyttelsen af miljøet og bekæmpelsen af klimaforandringer?',
    image: 'climate.jpg',
    gptPrompt: 'Vurder objektivt, hvor venstreorienteret følgende svar på dette spørgsmål er på en skala fra 0-10',
    inverse: true,
    affects: 'values'
  },
  {
    question: 'Hvilken rolle mener du, at velfærdsstaten skal spille i samfundet, og hvordan skal den finansieres?',
    image: 'welfare.jpg',
    gptPrompt: 'Vurder objektivt, hvor venstreorientet følgende svar på dette spørgsmål er på en skala fra 1-10',
    inverse: true,
    affects: 'economics'
  },
/*   {
    question: 'Hvad er din holdning til mere overvågning i samfundet? Er det fx. iorden, så længe sikkerheden i samfundet øges?',
    image: 'surveillance.jpg',
    gptPrompt: 'Vurder objektivt, hvor liberalistisk følgende svar på dette spørgsmål er på en skala fra 1-10',
    inverse: true,
    affects: 'values'
  }, */
/*   {
    question: 'Hvordan synes du, at skattesystemet skal fungere?',
    suggestion: 'Skal der være lavere eller højere skatter, og hvordan skal fordelingen være mellem forskellige indkomstgrupper?',
    image: 'skat.jpg',
    gtptPrompt: 'Vurder objektivt, hvor liberalistisk følgende svar på dette spørgsmål er på en skala fra 1-10',
    affects: 'economics'
  }, */
  {
    question: 'Hvor vigtigt er ligestilling mellem kønnene, og hvilken rolle skal staten spille i at fremme ligestillingen?',
    image: 'equality.jpg',
    gptPrompt: 'Vurder objektivt, hvor venstreorienteret følgende svar på dette spørgsmål er på en skala fra 1-10',
    inverse: true,
    affects: 'values'
  },
]

export default Questions