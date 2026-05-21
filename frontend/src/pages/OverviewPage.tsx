import type { Quiz } from '../types/quiz'

type OverviewPageProps = {
  quiz: Quiz
  onStartQuiz: () => void
}

function OverviewPage({ quiz, onStartQuiz }: OverviewPageProps) {
  return (
    <section className="page-panel" aria-labelledby="overview-title">
      <p className="eyebrow">OOP Quiz and Immediate Feedback Feature</p>
      <h1 id="overview-title">{quiz.title}</h1>
      <p className="lead">{quiz.description}</p>
      <p>
        Answer beginner-friendly multiple-choice questions about Java classes, objects,
        encapsulation, inheritance, polymorphism, and abstraction.
      </p>
      <button className="primary-button" type="button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </section>
  )
}

export default OverviewPage
