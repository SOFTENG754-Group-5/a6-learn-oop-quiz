import { Router } from 'express'

import { oopBasicsQuiz } from '../data/quizData'
import type { Quiz, QuizResponse } from '../types/quiz'

export const quizRoutes = Router()

quizRoutes.get('/oop-basics', (_request, response) => {
  response.json(toQuizResponse(oopBasicsQuiz))
})

function toQuizResponse(quiz: Quiz): QuizResponse {
  return {
    quizId: quiz.quizId,
    title: quiz.title,
    description: quiz.description,
    questions: quiz.questions.map((question) => ({
      questionId: question.questionId,
      topic: question.topic,
      prompt: question.prompt,
      options: question.options.map((option) => ({
        optionId: option.optionId,
        text: option.text,
      })),
    })),
  }
}
