import { useState } from 'react'

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
)

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

export default function UrlBar({ initialUrl, onStart }) {
  const [value, setValue] = useState(initialUrl)

  return (
    <form
      className="urlbar"
      onSubmit={(e) => {
        e.preventDefault()
        onStart(value.trim() || initialUrl)
      }}
    >
      <span className="urlbar-icon"><LockIcon /></span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter any URL, e.g. https://google.com"
        spellCheck={false}
        aria-label="URL to visualize"
      />
      <button type="submit">
        <PlayIcon /> Visualize
      </button>
    </form>
  )
}
