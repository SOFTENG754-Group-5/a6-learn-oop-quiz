import { randomUUID } from 'node:crypto'

import { Router } from 'express'

import { oopBasicsQuiz } from '../data/quizData'
import {
  createFeedback,
  createRecommendation,
} from '../services/recommendationService'
import { scoreQuiz } from '../services/scoringService'
import type { SubmittedAnswer } from '../services/scoringService'
import { saveSubmission } from '../stores/submissionStore'

export const submissionRoutes = Router()

submissionRoutes.post('/oop-basics/submissions', (request, response) => {
  const submissionRequest = parseSubmissionRequest(request.body)

  if (isValidationError(submissionRequest)) {
    response.status(400).json({ message: submissionRequest.message })
    return
  }

  const score = scoreQuiz(oopBasicsQuiz, submissionRequest.answers)
  const submission = saveSubmission({
    submissionId: randomUUID(),
    quizId: oopBasicsQuiz.quizId,
    userId: submissionRequest.userId,
    score: score.score,
    correctAnswers: score.correctAnswers,
    totalQuestions: score.totalQuestions,
    passed: score.passed,
    weakTopics: score.weakTopics,
    feedback: createFeedback(score.weakTopics),
    recommendation: createRecommendation(score.weakTopics),
  })

  response.status(201).json(submission)
})

type SubmissionRequest = {
  userId: string
  answers: SubmittedAnswer[]
}

type SubmissionValidationError = {
  message: string
}

function parseSubmissionRequest(
  body: unknown,
): SubmissionRequest | SubmissionValidationError {
  if (!isRecord(body) || !isRequiredString(body.userId)) {
    return { message: 'userId is required.' }
  }

  if (!Array.isArray(body.answers)) {
    return { message: 'answers must be an array.' }
  }

  const answers: SubmittedAnswer[] = []

  for (const answer of body.answers) {
    const parsedAnswer = parseAnswer(answer)

    if (isValidationError(parsedAnswer)) {
      return parsedAnswer
    }

    answers.push(parsedAnswer)
  }

  return {
    userId: body.userId,
    answers,
  }
}

function parseAnswer(
  answer: unknown,
): SubmittedAnswer | SubmissionValidationError {
  if (
    !isRecord(answer) ||
    !isRequiredString(answer.questionId) ||
    !isRequiredString(answer.selectedOptionId)
  ) {
    return {
      message: 'Each answer must include questionId and selectedOptionId.',
    }
  }

  const question = oopBasicsQuiz.questions.find(
    (quizQuestion) => quizQuestion.questionId === answer.questionId,
  )

  if (!question) {
    return { message: `Unknown questionId: ${answer.questionId}.` }
  }

  const hasOption = question.options.some(
    (option) => option.optionId === answer.selectedOptionId,
  )

  if (!hasOption) {
    return {
      message: `Unknown selectedOptionId: ${answer.selectedOptionId}.`,
    }
  }

  return {
    questionId: answer.questionId,
    selectedOptionId: answer.selectedOptionId,
  }
}

function isValidationError(
  value: SubmissionRequest | SubmittedAnswer | SubmissionValidationError,
): value is SubmissionValidationError {
  return 'message' in value
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRequiredString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}
