// Liste over danske partier, med hvert partiernes fordelings og-
// værdipolitiske holdninger angivet som et punkt i 100x100 2D-koordinatsystem.
  // X-aksen angiver fordlingspolitiske holdninger fra venstre mod højre
  // Y-aksen angiver værdipolitiske holdninger fra venstre mod højre
const PARTIES = [
  { id: 's', name: 'Socialdemokratiet', alignment: { x: 40, y: 75 } },
  { id: 'rv', name: 'Radikale Venstre',  alignment: { x: 45, y: 20 } },
  { id: 'k', name: 'Det Konservative Folkeparti', alignment: { x: 65, y: 75} },
  { id: 'nb', name: 'Nye Borgerlige',    alignment: { x: 90, y: 90 } },
  { id: 'sf', name: 'Socialistisk Folkeparti', alignment: { x: 30, y: 30 } },
  { id: 'la', name: 'Liberal Alliance',  alignment: { x: 90, y: 55 } },
  { id: 'kd', name: 'Kristendemokraterne', alignment: { x: 60, y: 65 } },
  { id: 'm', name: 'Moderaterne',       alignment: { x: 60, y: 50 } },
  { id: 'df', name: 'Dansk Folkeparti',  alignment: { x: 45, y: 85 } },
  { id: 'fg', name: 'Frie Grønne',       alignment: { x: 15, y: 10 } },
  { id: 'v', name: 'Venstre',           alignment: { x: 70, y: 60 } },
  { id: 'dd', name: 'Danmarksdemokraterne', alignment: { x: 65, y: 87 } },
  { id: 'el', name: 'Enhedslisten',      alignment: { x: 15, y: 15 } },
  { id: 'aa', name: 'Alternativet',      alignment: { x: 40, y: 20 } },
]
  
/**
 * Returnerer distancen mellem to punkter i et 2D-koordinatsystem
 * @param {Object} a - Første punkt
 * @param {Object} b - Andet punkt
 * @returns {Number} Distancen mellem a og b
 */
const distBetweenPoints = (a, b) => Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2)

/**
 * Returnerer de 5 partier, der er tættest på den givne holdning
 * @param {Number} x - Fordelelsespolitisk værdi (0-100) fra venstre mod højre
 * @param {Number} y - Værdipolitisk værdi (0-100) fra venstre mod højre
 * @returns {Array} De 5 partier, der er tættest på den givne holdning
 */
export const getClosestAlignedParties = (x, y) => {
  const alignment = { x, y } // Laver et punkt ud fra x og y

  // Gemmer partiernes afstande til den givne holdning,
  const distances = PARTIES.map(party => ({
    id: party.id,
    name: party.name,
    dist: distBetweenPoints(party.alignment, alignment)
  }))

  // Sorterer partierne efter afstand, og returnerer de 5 første
  return distances.sort((a, b) => a.dist - b.dist).slice(0, 5)
}