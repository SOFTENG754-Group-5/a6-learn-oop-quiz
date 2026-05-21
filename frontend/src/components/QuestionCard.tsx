import type { Question } from '../types/quiz'
import OptionButton from './OptionButton'

type QuestionCardProps = {
  question: Question
  selectedOptionId?: string
  onSelectOption: (questionId: string, optionId: string) => void
}

function QuestionCard({ question, selectedOptionId, onSelectOption }: QuestionCardProps) {
  return (
    <article className="question-card" aria-labelledby={`${question.id}-prompt`}>
      <h2 id={`${question.id}-prompt`}>{question.prompt}</h2>
      <div className="option-list" role="group" aria-labelledby={`${question.id}-prompt`}>
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={option.id === selectedOptionId}
            onSelect={(optionId) => onSelectOption(question.id, optionId)}
          />
        ))}
      </div>
    </article>
  )
}

export default QuestionCard
