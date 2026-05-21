type QuizPageProps = {
  onBackToOverview: () => void
  onShowResults: () => void
}

function QuizPage({ onBackToOverview, onShowResults }: QuizPageProps) {
  return (
    <section className="page-panel" aria-labelledby="quiz-title">
      <p className="eyebrow">Quiz</p>
      <h1 id="quiz-title">OOP Quiz</h1>
      <p className="lead">Quiz questions will appear here.</p>
      <div className="button-row">
        <button className="secondary-button" type="button" onClick={onBackToOverview}>
          Back to Overview
        </button>
        <button className="primary-button" type="button" onClick={onShowResults}>
          View Results
        </button>
      </div>
    </section>
  )
}

export default QuizPage
