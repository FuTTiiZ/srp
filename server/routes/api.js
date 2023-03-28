import express from 'express'

import { questions, answer } from '../controllers/api.js'

const router = express.Router()

/* router.post('/register', register)
router.post('/login', login) */

router.get('/questions', questions)
router.post('/answer', answer)

export default router