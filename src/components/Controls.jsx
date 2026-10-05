const Icon = ({ children }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)

export default function Controls({ playing, onToggle, onPrev, onNext, onReset, disablePrev, disableNext }) {
  return (
    <div className="controls">
      <button onClick={onReset} title="Restart from step 1">
        <Icon><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></Icon>
        Reset
      </button>
      <button onClick={onPrev} disabled={disablePrev} title="Previous step">
        <Icon><path d="M15 18l-6-6 6-6" /></Icon>
        Prev
      </button>
      <button className="primary" onClick={onToggle}>
        {playing ? <><PauseIcon /> Pause</> : <><PlayIcon /> Play</>}
      </button>
      <button onClick={onNext} disabled={disableNext} title="Next step">
        Next
        <Icon><path d="M9 6l6 6-6 6" /></Icon>
      </button>
    </div>
  )
}
