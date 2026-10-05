const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="4" ry="10" />
    <path d="M2.5 9h19M2.5 15h19" />
  </svg>
)

export default function StageInfo({ stage, stageIndex, total, hopIndex, url, live }) {
  const played = stage.hops.slice(0, hopIndex)
  const current = stage.hops[hopIndex]
  const protocol = stage.id === 'dns' ? 'DNS / UDP' : stage.id === 'tcp' ? 'TCP' : stage.id === 'tls' ? 'TLS 1.3' : stage.id === 'request' || stage.id === 'response' ? 'HTTP' : stage.id === 'cache' ? 'Redis' : stage.id === 'db' ? 'SQL' : stage.id === 'render' ? 'Browser engine' : 'Browser'

  return (
    <aside className="info">
      <div className="stepbar-head">
        <span className="stepbar-label">Step {stageIndex + 1} of {total}</span>
        <span className="protocol-badge">{protocol}</span>
        <div className="stepbar"><div className="stepbar-fill" style={{ width: `${((stageIndex + 1) / total) * 100}%` }} /></div>
      </div>

      <div className="info-url"><GlobeIcon /><span className="info-url-text">{url}</span></div>

      <h2>{stage.title}</h2>
      <p>{stage.description}</p>
      <ul>{stage.details.map((d) => <li key={d}>{d}</li>)}</ul>

      {stage.id === 'dns' && (
        <div className="live-card">
          <div><span>LIVE DNS RESULT</span><strong>{live?.ip || (live?.status === 'loading' ? 'Resolving…' : 'Not resolved')}</strong></div>
          <small>{live?.ips?.length ? `${live.ips.length} A record${live.ips.length > 1 ? 's' : ''} · TTL ${live.ttl ?? '—'}s · ${live.duration} ms` : 'Uses Google Public DNS over HTTPS'}</small>
        </div>
      )}

      <div className="hoplog">
        <h3>Packet log</h3>
        {played.length === 0 && !current && <p className="muted">No packets in this step — press Play to continue.</p>}
        {played.map((h, i) => <div key={i} className="log done"><span className="log-dot" style={{ background: h.color }} />{h.from} → {h.to} : <b style={{ color: h.color }}>{h.label}</b></div>)}
        {current && <div className="log active"><span className="log-dot pulse-dot" style={{ background: current.color }} />{current.from} → {current.to} : <b style={{ color: current.color }}>{current.label}</b></div>}
      </div>
    </aside>
  )
}
