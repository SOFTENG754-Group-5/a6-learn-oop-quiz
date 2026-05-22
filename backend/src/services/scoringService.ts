import type { Quiz, QuizTopic } from '../types/quiz'

export type SubmittedAnswer = {
  questionId: string
  selectedOptionId: string
}

export type QuizScore = {
  totalQuestions: number
  correctAnswers: number
  score: number
  passed: boolean
  weakTopics: QuizTopic[]
}

export function scoreQuiz(quiz: Quiz, answers: SubmittedAnswer[]): QuizScore {
  const selectedOptions = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedOptionId]),
  )

  const result = quiz.questions.reduce(
    (score, question) => {
      if (selectedOptions.get(question.questionId) === question.correctOptionId) {
        score.correctAnswers += 1
      } else if (!score.weakTopics.includes(question.topic)) {
        score.weakTopics.push(question.topic)
      }

      return score
    },
    {
      correctAnswers: 0,
      weakTopics: [] as QuizTopic[],
    },
  )

  const totalQuestions = quiz.questions.length
  const score =
    totalQuestions === 0
      ? 0
      : Math.round((result.correctAnswers / totalQuestions) * 100)

  return {
    totalQuestions,
    correctAnswers: result.correctAnswers,
    score,
    passed: score >= 50,
    weakTopics: result.weakTopics,
  }
}
