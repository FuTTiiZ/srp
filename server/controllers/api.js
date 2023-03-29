import Questions from '../questions.js'

import { config } from 'dotenv'
config()

import { Configuration, OpenAIApi } from 'openai'
const OpenAI = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

export const questions = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        return res.status(200).json(Questions.map(({ image, question, suggestion, affects }) => ({ image, question, suggestion: suggestion || '', affects }) ))
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
      }
    }
    default: {
      req.setHeader('Allow', ['GET'])
      return res.status(405).json({ message: 'Method not allowed' })
    }
  }
}

export const answer = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      try {

        // Læs spørgsmålets indeks og svaret fra brugeren
        const { questionIdx, answer } = req.body

        // Hvis svaret er for kort eller for langt, så returner en fejl.
          // Det er umuligt på normal vis at svare på et spørgsmål med mindre end 10 tegn eller mere end 150 tegn.
          // Dvs. at personen måske sender direkte til API'et uden at bruge front-end, eler at der på anden vis er sket en fejl et sted.
        if (answer.length < 10 || answer.length > 150)
          return res.status(400).json({ message: 'Invalid answer' })

        // Hent spørgsmålet fra vores liste af spørgsmål
        const question = Questions[questionIdx]

        // Kalder OpenAI's API med vores spørgsmål og svaret
        const gptResponse = await OpenAI.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system', // Her promptes GPT-3.5 til at svare med et tal
              content: `Det er vigtigt, at du KUN svarer met et tal - INGEN BOGSTAVER`
            },
            {
              role: 'user', // Her indsættes svaret fra brugeren
              content: `${question.gptPrompt}. Det er vigtigt, at du KUN svarer met et tal - INGEN BOGSTAVER\n\n${question.question}\n"${answer}"`
            }
          ]
        })

        // Her bruger vi regex til at finde svaret fra GPT-3.5
        let rating = gptResponse.data.choices[0].message.content.match(/(\d+)/)[0]

        // Hvis der er gået noget galt (dvs. at svaret ikke er et tal), så sæt rating til 5
        if (!rating || rating.length >= 4) rating = 5

        // Hvis svaret er et tal, så konverter det til et tal
        rating = parseInt(rating)

        // Hvis svaret er mindre end 1 eller større end 10, så sæt rating til 5,
        // da der derved er sket en fejl.
        if (rating < 1 || rating > 10) rating = 5

        // Hvis svaret er 'inverse', så jeg have det "omvendte" tal på en skala fra 1-10.
        // Nogle spørgsmål er nemlig omvendte, fordi det derved er letter for GPT-3.5 at besvare.
        if (question.inverse) rating = 11 - rating
        
        // Returner svaret i en HTTP-bsked bestående af JSON
        return res.status(200).json({ rating, question: questionIdx })


      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
      }
    }
    default: {
      req.setHeader('Allow', ['POST'])
      return res.status(405).json({ message: 'Method not allowed' })
    }
  }
}