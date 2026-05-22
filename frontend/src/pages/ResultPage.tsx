import { useEffect, useState } from 'react'
import ResultSummary from '../components/ResultSummary'
import { getSubmissionResult } from '../services/quizApi'
import type { QuizSubmissionResult } from '../types/quiz'

type ResultPageProps = {
  submissionId: string
  onBackToOverview: () => void
  onRestartQuiz: () => void
}

function ResultPage({ submissionId, onBackToOverview, onRestartQuiz }: ResultPageProps) {
  const [result, setResult] = useState<QuizSubmissionResult | null>(null)
  const [isLoadingResult, setIsLoadingResult] = useState(true)
  const [resultError, setResultError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    getSubmissionResult(submissionId)
      .then((loadedResult) => {
        if (isActive) {
          setResult(loadedResult)
        }
      })
      .catch(() => {
        if (isActive) {
          setResultError('Unable to load quiz results. Please retry the quiz.')
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingResult(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [submissionId])

  return (
    <section className="page-panel" aria-labelledby="result-title">
      <p className="eyebrow">Immediate Feedback</p>
      <h1 id="result-title">Quiz Results</h1>
      <p className="lead">Use this feedback to choose what to revise next.</p>
      {isLoadingResult && <p aria-live="polite">Loading results...</p>}
      {resultError && <p role="alert">{resultError}</p>}
      {result && <ResultSummary result={result} />}
      <div className="button-row">
        <button className="secondary-button" type="button" onClick={onBackToOverview}>
          Back to Overview
        </button>
        <button className="primary-button" type="button" onClick={onRestartQuiz}>
          Restart Quiz
        </button>
      </div>
    </section>
  )
}

export default ResultPage
