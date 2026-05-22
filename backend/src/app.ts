import cors from 'cors'
import express from 'express'

import { healthRoutes } from './routes/healthRoutes'
import { quizRoutes } from './routes/quizRoutes'

export const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use(express.json())

app.use('/health', healthRoutes)
app.use('/api/quizzes', quizRoutes)
