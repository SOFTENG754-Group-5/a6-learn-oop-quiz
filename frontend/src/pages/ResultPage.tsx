type ResultPageProps = {
  onBackToOverview: () => void
  onRestartQuiz: () => void
}

function ResultPage({ onBackToOverview, onRestartQuiz }: ResultPageProps) {
  return (
    <section className="page-panel" aria-labelledby="result-title">
      <p className="eyebrow">Immediate Feedback</p>
      <h1 id="result-title">Quiz Results</h1>
      <p className="lead">Your feedback will appear here.</p>
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
