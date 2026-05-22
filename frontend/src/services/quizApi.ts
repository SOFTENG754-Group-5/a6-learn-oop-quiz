import { mockAnswerKey, mockQuiz, mockRecommendations } from '../data/mockQuiz'
import type {
  QuestionTopic,
  Quiz,
  QuizSubmission,
  QuizSubmissionResult,
  UserAnswer,
} from '../types/quiz'

const mockSubmissionResults = new Map<string, QuizSubmissionResult>()
let mockSubmissionCounter = 0

export async function getQuiz(): Promise<Quiz> {
  return mockQuiz
}

export async function submitQuiz(answers: UserAnswer[]): Promise<QuizSubmission> {
  const submissionId = `mock-submission-${(mockSubmissionCounter += 1)}`
  const submittedAnswers = answers.map((answer) => ({ ...answer }))
  const result = buildSubmissionResult(submissionId, submittedAnswers)

  mockSubmissionResults.set(submissionId, result)

  return {
    submissionId,
    quizId: mockQuiz.id,
    answers: submittedAnswers,
  }
}

export async function getSubmissionResult(
  submissionId: string,
): Promise<QuizSubmissionResult> {
  const result = mockSubmissionResults.get(submissionId)

  if (!result) {
    throw new Error('Submission result was not found.')
  }

  return result
}

function buildSubmissionResult(
  submissionId: string,
  answers: UserAnswer[],
): QuizSubmissionResult {
  const answersByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedOptionId]),
  )
  const incorrectTopics = mockQuiz.questions
    .filter((question) => answersByQuestionId.get(question.id) !== mockAnswerKey[question.id])
    .map((question) => question.topic)
  const correctAnswers = mockQuiz.questions.length - incorrectTopics.length
  const totalQuestions = mockQuiz.questions.length
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100)
  const weakTopics = incorrectTopics.map(formatTopicLabel)
  const recommendation = getRecommendation(incorrectTopics)

  return {
    submissionId,
    quizId: mockQuiz.id,
    scorePercentage,
    correctAnswers,
    totalQuestions,
    feedbackMessage: getFeedbackMessage(scorePercentage),
    weakTopics,
    recommendation,
  }
}

function getRecommendation(incorrectTopics: QuestionTopic[]) {
  const firstWeakTopic = incorrectTopics[0]

  if (!firstWeakTopic) {
    return 'You are ready to continue to the next OOP topic.'
  }

  return (
    mockRecommendations.find((recommendation) => recommendation.topic === firstWeakTopic)
      ?.guidance ?? 'Review the topics you missed, then retry the quiz.'
  )
}

function getFeedbackMessage(scorePercentage: number) {
  if (scorePercentage === 100) {
    return 'Excellent work. You answered every OOP basics question correctly.'
  }

  if (scorePercentage >= 60) {
    return 'Good progress. Review the topics you missed to strengthen your understanding.'
  }

  return 'Keep practicing. Review the core OOP topics, then try the quiz again.'
}

function formatTopicLabel(topic: QuestionTopic) {
  return topic
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
