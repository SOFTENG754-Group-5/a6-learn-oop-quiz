type ProgressIndicatorProps = {
  currentQuestion: number
  totalQuestions: number
}

function ProgressIndicator({ currentQuestion, totalQuestions }: ProgressIndicatorProps) {
  return (
    <p className="progress-indicator" aria-live="polite">
      Question {currentQuestion} of {totalQuestions}
    </p>
  )
}

export default ProgressIndicator
