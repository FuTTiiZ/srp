import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import apiRoutes from './routes/api.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/api', apiRoutes)
app.use('/static', express.static('./routes/static'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))