import '../styles/Button.css'

interface ButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
}

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      <span className={`button_top ${disabled ? 'disabled' : ''}`}>
        {' '}
        {children}{' '}
      </span>
    </button>
  )
}