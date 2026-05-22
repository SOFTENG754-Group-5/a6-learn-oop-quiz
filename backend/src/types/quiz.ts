export type QuizTopic =
  | 'classes and objects'
  | 'encapsulation'
  | 'inheritance'
  | 'polymorphism'
  | 'abstraction'

export type QuizOption = {
  optionId: string
  text: string
}

export type QuizQuestion = {
  questionId: string
  topic: QuizTopic
  prompt: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
}

export type Quiz = {
  quizId: string
  title: string
  description: string
  questions: QuizQuestion[]
}

export type QuizQuestionResponse = Omit<
  QuizQuestion,
  'correctOptionId' | 'explanation'
>

export type QuizResponse = Omit<Quiz, 'questions'> & {
  questions: QuizQuestionResponse[]
}
