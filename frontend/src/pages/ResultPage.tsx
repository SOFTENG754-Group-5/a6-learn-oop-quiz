import ResultSummary, { type ResultSummaryData } from '../components/ResultSummary'

type ResultPageProps = {
  onBackToOverview: () => void
  onRestartQuiz: () => void
}

const mockResult: ResultSummaryData = {
  scorePercentage: 60,
  correctAnswers: 3,
  totalQuestions: 5,
  feedbackMessage:
    'Good progress. Review polymorphism and abstraction to strengthen your understanding.',
  weakTopics: ['Polymorphism', 'Abstraction'],
  recommendation:
    'Review the polymorphism lesson, then retry a related question to build confidence.',
}

function ResultPage({ onBackToOverview, onRestartQuiz }: ResultPageProps) {
  return (
    <section className="page-panel" aria-labelledby="result-title">
      <p className="eyebrow">Immediate Feedback</p>
      <h1 id="result-title">Quiz Results</h1>
      <p className="lead">Use this feedback to choose what to revise next.</p>
      <ResultSummary result={mockResult} />
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
