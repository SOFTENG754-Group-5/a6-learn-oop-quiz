export type QuestionTopic =
  | 'classes-and-objects'
  | 'encapsulation'
  | 'inheritance'
  | 'polymorphism'
  | 'abstraction'

export type Option = {
  id: string
  label: string
}

export type Question = {
  id: string
  topic: QuestionTopic
  prompt: string
  options: Option[]
}

export type Quiz = {
  id: string
  title: string
  description: string
  questions: Question[]
}

export type UserAnswer = {
  questionId: string
  selectedOptionId: string
}

export type Recommendation = {
  topic: QuestionTopic
  title: string
  guidance: string
}

export type QuizResult = {
  quizId: string
  answers: UserAnswer[]
  score: number
  totalQuestions: number
  recommendations: Recommendation[]
}

export type QuizSubmission = {
  submissionId: string
  quizId: string
  answers: UserAnswer[]
}

export type QuizSubmissionResult = {
  submissionId: string
  quizId: string
  scorePercentage: number
  correctAnswers: number
  totalQuestions: number
  feedbackMessage: string
  weakTopics: string[]
  recommendation: string
}
