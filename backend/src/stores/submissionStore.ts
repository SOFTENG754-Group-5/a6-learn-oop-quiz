import type { QuizRecommendation } from '../services/recommendationService'
import type { QuizTopic } from '../types/quiz'

export type QuizSubmissionResult = {
  submissionId: string
  quizId: string
  userId: string
  score: number
  correctAnswers: number
  totalQuestions: number
  passed: boolean
  weakTopics: QuizTopic[]
  feedback: string
  recommendation: QuizRecommendation
}

const submissions = new Map<string, QuizSubmissionResult>()

export function saveSubmission(
  submission: QuizSubmissionResult,
): QuizSubmissionResult {
  submissions.set(submission.submissionId, submission)

  return submission
}

export function findSubmission(
  submissionId: string,
): QuizSubmissionResult | undefined {
  return submissions.get(submissionId)
}
