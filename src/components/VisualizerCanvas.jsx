import { NODES, LINKS } from '../data/stages'

const linkKey = (a, b) => [a, b].sort().join('-')

// Hand-drawn SVG line-art icons (no emojis), centered at (0, 0)
function NodeIcon({ kind }) {
  switch (kind) {
    case 'browser':
      return (
        <>
          <rect x="-13" y="-10" width="26" height="20" rx="3" />
          <line x1="-13" y1="-4" x2="13" y2="-4" />
          <circle cx="-8.5" cy="-7" r="1" fill="currentColor" stroke="none" />
          <circle cx="-4.5" cy="-7" r="1" fill="currentColor" stroke="none" />
        </>
      )
    case 'dns':
      return (
        <>
          <circle r="10" />
          <ellipse rx="4.5" ry="10" />
          <path d="M -9.5 -3.5 Q 0 -1 9.5 -3.5" />
          <path d="M -9.5 3.5 Q 0 1 9.5 3.5" />
        </>
      )
    case 'lb':
      return (
        <>
          <circle cx="-8" r="3" />
          <circle cx="8" cy="-6" r="3" />
          <circle cx="8" cy="6" r="3" />
          <path d="M -4.5 -1 L 4.8 -5" />
          <path d="M -4.5 1 L 4.8 5" />
        </>
      )
    case 'server':
      return (
        <>
          <rect x="-12" y="-11" width="24" height="22" rx="2.5" />
          <line x1="-12" y1="0" x2="12" y2="0" />
          <circle cx="-7" cy="-5.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="-7" cy="5.5" r="1.1" fill="currentColor" stroke="none" />
          <line x1="2" y1="-5.5" x2="8" y2="-5.5" />
          <line x1="2" y1="5.5" x2="8" y2="5.5" />
        </>
      )
    case 'cache':
      return <path d="M 2.5 -11 L -6 1 L -1 1 L -3 11 L 6 -1.5 L 1 -1.5 Z" fill="currentColor" stroke="none" />
    case 'db':
      return (
        <>
          <ellipse cy="-6" rx="10" ry="4" />
          <path d="M -10 -6 L -10 6 A 10 4 0 0 0 10 6 L 10 -6" />
          <path d="M -10 0 A 10 4 0 0 0 10 0" />
        </>
      )
    default:
      return null
  }
}

export default function VisualizerCanvas({ stage, hopIndex }) {
  const activeHop = stage.hops[hopIndex]
  const activeLink = activeHop ? linkKey(activeHop.from, activeHop.to) : null

  const path = activeHop
    ? `M ${NODES[activeHop.from].x} ${NODES[activeHop.from].y} L ${NODES[activeHop.to].x} ${NODES[activeHop.to].y}`
    : null

  // CSS motion-path: enables easing + motion trail (needs a modern browser)
  const motion = (delay) => ({
    offsetPath: `path("${path}")`,
    offsetRotate: '0deg',
    animationDelay: delay,
  })

  return (
    <div className="canvas-wrap">
      <svg viewBox="0 0 1320 700" role="img" aria-label="Web architecture diagram">
        {/* connection lines with marching dashes */}
        {LINKS.map(([a, b]) => (
          <line
            key={a + b}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            className={activeLink === linkKey(a, b) ? 'link active' : 'link'}
          />
        ))}

        {/* packet: glow dot + fading trail, travels along the link */}
        {activeHop && (
          <g key={`${stage.id}-${hopIndex}`}>
            <circle className="packet-trail t2" r="5.5" fill={activeHop.color} style={motion('-0.24s')} />
            <circle className="packet-trail t1" r="7" fill={activeHop.color} style={motion('-0.12s')} />
            <circle className="packet-dot" r="8.5" fill={activeHop.color} style={motion('0s')} />
            <text className="packet-label" x="18" y="4" fill={activeHop.color} style={motion('0s')}>
              {activeHop.label}
            </text>
          </g>
        )}

        {/* nodes: pulse ring + body (pop-in when activated) + icon + label */}
        {Object.entries(NODES).map(([id, n]) => {
          const on = stage.highlight.includes(id)
          return (
            <g key={id} transform={`translate(${n.x},${n.y})`} className={on ? 'node on' : 'node'}>
              <circle className="pulse" r="60" />
              <g className="node-body">
                <rect x="-88" y="-44" width="176" height="88" rx="14" />
                <g
                  className="node-icon"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <NodeIcon kind={n.kind} />
                </g>
                <text className="node-label" y="28">{n.label}</text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
