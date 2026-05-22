import { useState } from 'react'
import ProgressIndicator from '../components/ProgressIndicator'
import QuestionCard from '../components/QuestionCard'
import { submitQuiz } from '../services/quizApi'
import type { Quiz, UserAnswer } from '../types/quiz'

type QuizPageProps = {
  quiz: Quiz
  onBackToOverview: () => void
  onShowResults: (submissionId: string) => void
}

function QuizPage({ quiz, onBackToOverview, onShowResults }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion.id)
  const isFinalQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleSelectOption = (questionId: string, selectedOptionId: string) => {
    setSubmitError(null)
    setAnswers((previousAnswers) => {
      const otherAnswers = previousAnswers.filter((answer) => answer.questionId !== questionId)

      return [...otherAnswers, { questionId, selectedOptionId }]
    })
  }

  const handleNextQuestion = () => {
    if (!currentAnswer || isFinalQuestion) {
      return
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1)
  }

  const handleSubmitQuiz = async () => {
    if (!currentAnswer || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submission = await submitQuiz(answers)
      onShowResults(submission.submissionId)
    } catch {
      setSubmitError('Unable to submit the quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-panel" aria-labelledby="quiz-title">
      <p className="eyebrow">Quiz</p>
      <h1 id="quiz-title">{quiz.title}</h1>
      <ProgressIndicator
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
      />
      <QuestionCard
        question={currentQuestion}
        selectedOptionId={currentAnswer?.selectedOptionId}
        onSelectOption={handleSelectOption}
      />
      <div className="button-row">
        <button className="secondary-button" type="button" onClick={onBackToOverview}>
          Back to Overview
        </button>
        {isFinalQuestion ? (
          <button
            className="primary-button"
            type="button"
            disabled={!currentAnswer || isSubmitting}
            onClick={handleSubmitQuiz}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            className="primary-button"
            type="button"
            disabled={!currentAnswer}
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
      </div>
      {submitError && <p role="alert">{submitError}</p>}
    </section>
  )
}

export default QuizPage
