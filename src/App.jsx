import { useEffect, useMemo, useState } from 'react'
import UrlBar from './components/UrlBar.jsx'
import VisualizerCanvas from './components/VisualizerCanvas.jsx'
import StageInfo from './components/StageInfo.jsx'
import Controls from './components/Controls.jsx'
import Timeline from './components/Timeline.jsx'
import { STAGES } from './data/stages.js'
import { useVisualizer } from './hooks/useVisualizer.js'
import { formatMs, normalizeUrl, resolveDns } from './utils.js'

export default function App() {
  const [url, setUrl] = useState('https://google.com')
  const [live, setLive] = useState({ status: 'idle', ip: null, ips: [], ttl: null, duration: 0, probe: 'idle', probeMs: 0 })
  const [error, setError] = useState('')
  const viz = useVisualizer()

  const parsed = useMemo(() => {
    try {
      const value = normalizeUrl(url)
      return { protocol: value.protocol.replace(':', '').toUpperCase(), host: value.hostname, path: value.pathname || '/', port: value.port || (value.protocol === 'https:' ? '443' : '80') }
    } catch {
      return { protocol: '—', host: 'Invalid URL', path: '—', port: '—' }
    }
  }, [url])

  const runDiagnostics = async (parsedUrl) => {
    setError('')
    setLive({ status: 'loading', ip: null, ips: [], ttl: null, duration: 0, probe: 'loading', probeMs: 0 })
    const dnsPromise = resolveDns(parsedUrl.hostname)
    const probeStarted = performance.now()
    let probe = 'error'
    try {
      await fetch(parsedUrl.toString(), { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
      probe = 'reachable'
    } catch {
      probe = 'blocked'
    }
    const probeMs = Math.round(performance.now() - probeStarted)
    const result = await dnsPromise
    setLive({ ...result, probe, probeMs })
  }

  const handleStart = async (newUrl) => {
    let parsedUrl
    try { parsedUrl = normalizeUrl(newUrl) }
    catch { setError('Enter a valid http:// or https:// URL.'); return }
    const normalized = parsedUrl.toString()
    setUrl(normalized)
    viz.restart()
    await runDiagnostics(parsedUrl)
  }

  useEffect(() => {
    normalizeUrl(url) && runDiagnostics(normalizeUrl(url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayStage = useMemo(() => {
    if (viz.stage.id !== 'dns' || !live.ip) return viz.stage
    return {
      ...viz.stage,
      hops: viz.stage.hops.map((hop) => ({
        ...hop,
        label: hop.from === 'dns' ? live.ip : hop.label.replace('google.com', parsed.host),
      })),
    }
  }, [viz.stage, live.ip, parsed.host])

  const diagnostics = [
    ['Protocol', parsed.protocol],
    ['Host', parsed.host],
    ['Port', parsed.port],
    ['DNS', live.status === 'loading' ? 'Resolving…' : live.ip || 'No A record'],
    ['Lookup', live.duration ? formatMs(live.duration) : '—'],
    ['Reachability', live.probe === 'loading' ? 'Testing…' : live.probe === 'reachable' ? `${live.probeMs} ms` : live.probe === 'blocked' ? 'Browser blocked' : '—'],
  ]

  const openTarget = () => window.open(url, '_blank', 'noopener,noreferrer')
  const copyDiagnostics = async () => {
    const text = `Internet Visualizer\nURL: ${url}\nProtocol: ${parsed.protocol}\nHost: ${parsed.host}\nPort: ${parsed.port}\nDNS: ${live.ip || 'unresolved'}\nDNS lookup: ${live.duration ? formatMs(live.duration) : '—'}`
    await navigator.clipboard?.writeText(text)
  }

  return (
    <div className="app">
      <header>
        <div className="header-topline">
          <p className="eyebrow">Network request lifecycle</p>
          <span className="project-meta">10 stages · live DNS · protocol simulation</span>
        </div>
        <h1>Internet Visualizer</h1>
        <p className="subtitle">
          An interactive journey of a web request — DNS, TCP, TLS, HTTP, caching,
          load balancing, database &amp; rendering.
        </p>
        <UrlBar initialUrl={url} onStart={handleStart} />
        {error && <div className="error-banner">{error}</div>}
        <div className="diagnostics">
          <div className="diagnostics-main">
            {diagnostics.map(([label, value]) => <div className="metric" key={label}><span>{label}</span><strong className={label === 'DNS' && live.ip ? 'live-value' : ''}>{value}</strong></div>)}
          </div>
          <div className="diagnostics-actions">
            <button onClick={() => { try { runDiagnostics(normalizeUrl(url)) } catch {} }}>Re-check</button>
            <button onClick={copyDiagnostics}>Copy</button>
            <button onClick={openTarget}>Open URL</button>
          </div>
        </div>
      </header>

      <main>
        <VisualizerCanvas stage={displayStage} hopIndex={viz.hopIndex} />
        <StageInfo
          key={viz.stage.id}
          stage={displayStage}
          stageIndex={viz.stageIndex}
          total={viz.total}
          hopIndex={viz.hopIndex}
          url={url}
          live={live}
        />
      </main>

      <Controls
        playing={viz.playing}
        onToggle={viz.toggle}
        onPrev={viz.prev}
        onNext={viz.next}
        onReset={viz.reset}
        disablePrev={viz.stageIndex === 0 && viz.hopIndex === 0}
        disableNext={viz.finished}
      />

      <Timeline stages={STAGES} current={viz.stageIndex} onJump={viz.jump} />
    </div>
  )
}
