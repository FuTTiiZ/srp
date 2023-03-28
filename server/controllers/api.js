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

        const { questionIdx, answer } = req.body

        if (answer.length < 10 || answer.length > 150)
          return res.status(400).json({ message: 'Invalid answer' })

        const question = Questions[questionIdx]

        const gptResponse = await OpenAI.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Det er vigtigt, at du KUN svarer met et tal - INGEN BOGSTAVER`
            },
            {
              role: 'user',
              content: `${question.gptPrompt}. Det er vigtigt, at du KUN svarer met et tal - INGEN BOGSTAVER\n\n${question.question}\n"${answer}"`
            }
          ]
        })

        /* console.log(gptResponse.data.choices[0].message.content) */
        let rating = gptResponse.data.choices[0].message.content.match(/(\d+)/)[0]
        /* console.log('raw', rating) */

        if (!rating || rating.length >= 4) rating = 5
        rating = parseInt(rating)

        if (rating < 1 || rating > 10) rating = 5

        if (question.inverse) rating = 11 - rating
          
        /* console.log(rating, question.inverse) */

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