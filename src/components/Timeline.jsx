export default function Timeline({ stages, current, onJump }) {
  return (
    <nav className="timeline" aria-label="Lifecycle stages">
      {stages.map((s, i) => (
        <button
          key={s.id}
          className={i === current ? 'chip active' : i < current ? 'chip done' : 'chip'}
          onClick={() => onJump(i)}
          title={s.title}
        >
          <span className="chip-num">{i + 1}</span> {s.short}
        </button>
      ))}
    </nav>
  )
}
