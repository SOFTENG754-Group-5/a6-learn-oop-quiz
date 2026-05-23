import type { Question, QuestionTopic, Quiz, QuizSubmission, QuizSubmissionResult, UserAnswer } from '../types/quiz'

// Override by setting VITE_API_BASE_URL in frontend/.env
const API_BASE_URL: string =
  (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? 'http://localhost:3001'

type BackendOption = { optionId: string; text: string }
type BackendQuestion = { questionId: string; topic: string; prompt: string; options: BackendOption[] }
type BackendQuizResponse = { quizId: string; title: string; description: string; questions: BackendQuestion[] }

type BackendRecommendation = { type: string; message: string; topic?: string }
type BackendSubmissionResult = {
  submissionId: string
  quizId: string
  score: number
  correctAnswers: number
  totalQuestions: number
  feedback: string
  weakTopics: string[]
  recommendation: BackendRecommendation
}

export async function getQuiz(): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/api/quizzes/oop-basics`)

  if (!response.ok) {
    throw new Error(`Failed to load quiz (${response.status})`)
  }

  const data: BackendQuizResponse = await response.json() as BackendQuizResponse
  return mapQuizResponse(data)
}

export async function submitQuiz(answers: UserAnswer[]): Promise<QuizSubmission> {
  const response = await fetch(`${API_BASE_URL}/api/quizzes/oop-basics/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'student001', answers }),
  })

  if (!response.ok) {
    throw new Error(`Failed to submit quiz (${response.status})`)
  }

  const data: BackendSubmissionResult = await response.json() as BackendSubmissionResult
  return { submissionId: data.submissionId, quizId: data.quizId, answers }
}

export async function getSubmissionResult(submissionId: string): Promise<QuizSubmissionResult> {
  const response = await fetch(`${API_BASE_URL}/api/submissions/${submissionId}/result`)

  if (!response.ok) {
    throw new Error(`Failed to load result (${response.status})`)
  }

  const data: BackendSubmissionResult = await response.json() as BackendSubmissionResult
  return mapSubmissionResult(data)
}

function mapQuizResponse(data: BackendQuizResponse): Quiz {
  return {
    id: data.quizId,
    title: data.title,
    description: data.description,
    questions: data.questions.map(mapQuestion),
  }
}

function mapQuestion(q: BackendQuestion): Question {
  return {
    id: q.questionId,
    topic: mapTopic(q.topic),
    prompt: q.prompt,
    options: q.options.map((opt) => ({ id: opt.optionId, label: opt.text })),
  }
}

// Backend uses "classes and objects" (space-separated); frontend type uses kebab-case
function mapTopic(topic: string): QuestionTopic {
  if (topic === 'classes and objects') return 'classes-and-objects'
  return topic as QuestionTopic
}

function mapSubmissionResult(data: BackendSubmissionResult): QuizSubmissionResult {
  return {
    submissionId: data.submissionId,
    quizId: data.quizId,
    scorePercentage: data.score,
    correctAnswers: data.correctAnswers,
    totalQuestions: data.totalQuestions,
    feedbackMessage: data.feedback,
    weakTopics: data.weakTopics,
    recommendation: data.recommendation.message,
  }
}
