import { useState } from 'react'
import ProgressIndicator from '../components/ProgressIndicator'
import QuestionCard from '../components/QuestionCard'
import { mockQuiz } from '../data/mockQuiz'
import type { UserAnswer } from '../types/quiz'

type QuizPageProps = {
  onBackToOverview: () => void
  onShowResults: () => void
}

function QuizPage({ onBackToOverview, onShowResults }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])

  const currentQuestion = mockQuiz.questions[currentQuestionIndex]
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion.id)
  const isFinalQuestion = currentQuestionIndex === mockQuiz.questions.length - 1

  const handleSelectOption = (questionId: string, selectedOptionId: string) => {
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

  const handleSubmitQuiz = () => {
    if (!currentAnswer) {
      return
    }

    onShowResults()
  }

  return (
    <section className="page-panel" aria-labelledby="quiz-title">
      <p className="eyebrow">Quiz</p>
      <h1 id="quiz-title">{mockQuiz.title}</h1>
      <ProgressIndicator
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={mockQuiz.questions.length}
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
            disabled={!currentAnswer}
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
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
    </section>
  )
}

export default QuizPage
