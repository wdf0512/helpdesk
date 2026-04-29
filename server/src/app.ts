import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'

const app = express()

app.disable('x-powered-by')
app.use(cors())

// Must be before express.json()
app.all('/api/auth/{*any}', toNodeHandler(auth))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app
