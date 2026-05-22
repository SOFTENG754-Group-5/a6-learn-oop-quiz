export type ResultSummaryData = {
  scorePercentage: number
  correctAnswers: number
  totalQuestions: number
  feedbackMessage: string
  weakTopics: string[]
  recommendation: string
}

type ResultSummaryProps = {
  result: ResultSummaryData
}

function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <div className="result-summary">
      <div className="score-summary" aria-label="Quiz score summary">
        <div>
          <p className="score-summary__label">Score</p>
          <p className="score-summary__percentage">{result.scorePercentage}%</p>
        </div>
        <p className="score-summary__detail">
          {result.correctAnswers} out of {result.totalQuestions} questions correct
        </p>
      </div>

      <section className="feedback-panel" aria-labelledby="feedback-title">
        <h2 id="feedback-title">Feedback</h2>
        <p>{result.feedbackMessage}</p>
      </section>

      <section className="result-section" aria-labelledby="weak-topics-title">
        <h2 id="weak-topics-title">Topics to review</h2>
        <ul className="weak-topic-list">
          {result.weakTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="result-section" aria-labelledby="recommendation-title">
        <h2 id="recommendation-title">Recommended next step</h2>
        <p>{result.recommendation}</p>
      </section>
    </div>
  )
}

export default ResultSummary
