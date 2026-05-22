import { useEffect, useState } from 'react'
import OverviewPage from './pages/OverviewPage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import { getQuiz } from './services/quizApi'
import type { Quiz } from './types/quiz'

type Screen = 'overview' | 'quiz' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('overview')
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true)
  const [quizError, setQuizError] = useState<string | null>(null)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [loadQuizRequest, setLoadQuizRequest] = useState(0)

  useEffect(() => {
    let isActive = true

    getQuiz()
      .then((loadedQuiz) => {
        if (isActive) {
          setQuiz(loadedQuiz)
        }
      })
      .catch(() => {
        if (isActive) {
          setQuizError('Unable to load the quiz. Please try again.')
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingQuiz(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [loadQuizRequest])

  if (isLoadingQuiz) {
    return (
      <main className="app-shell">
        <section className="page-panel" aria-live="polite">
          <p className="eyebrow">Quiz</p>
          <h1>Loading quiz...</h1>
        </section>
      </main>
    )
  }

  if (quizError || !quiz) {
    return (
      <main className="app-shell">
        <section className="page-panel" aria-labelledby="quiz-load-error">
          <p className="eyebrow">Quiz</p>
          <h1 id="quiz-load-error">Quiz unavailable</h1>
          <p className="lead">{quizError ?? 'Unable to load the quiz.'}</p>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              setIsLoadingQuiz(true)
              setQuizError(null)
              setLoadQuizRequest((request) => request + 1)
            }}
          >
            Try Again
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      {screen === 'overview' && (
        <OverviewPage
          quiz={quiz}
          onStartQuiz={() => {
            setSubmissionId(null)
            setScreen('quiz')
          }}
        />
      )}
      {screen === 'quiz' && (
        <QuizPage
          quiz={quiz}
          onBackToOverview={() => setScreen('overview')}
          onShowResults={(newSubmissionId) => {
            setSubmissionId(newSubmissionId)
            setScreen('result')
          }}
        />
      )}
      {screen === 'result' && submissionId && (
        <ResultPage
          key={submissionId}
          submissionId={submissionId}
          onBackToOverview={() => setScreen('overview')}
          onRestartQuiz={() => {
            setSubmissionId(null)
            setScreen('quiz')
          }}
        />
      )}
    </main>
  )
}

export default App
