import '../styles/Button.css'

export default function Button({ onClick, children, disabled }) {
  return (
    <button
      className='button'
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`button_top ${disabled ? 'disabled' : ''}`}> {children} </span>
    </button>
  )
}