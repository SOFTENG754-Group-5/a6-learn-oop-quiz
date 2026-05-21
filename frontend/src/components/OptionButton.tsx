import type { Option } from '../types/quiz'

type OptionButtonProps = {
  option: Option
  isSelected: boolean
  onSelect: (optionId: string) => void
}

function OptionButton({ option, isSelected, onSelect }: OptionButtonProps) {
  return (
    <button
      aria-pressed={isSelected}
      className={`option-button${isSelected ? ' option-button--selected' : ''}`}
      type="button"
      onClick={() => onSelect(option.id)}
    >
      <span className="option-button__marker">{option.id.toUpperCase()}</span>
      <span>{option.label}</span>
    </button>
  )
}

export default OptionButton
