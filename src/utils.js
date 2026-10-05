export function normalizeUrl(value) {
  const raw = value.trim()
  if (!raw) throw new Error('Enter a URL')
  return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
}

export async function resolveDns(hostname) {
  const started = performance.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4500)
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(hostname)}&type=A`,
      { signal: controller.signal, headers: { Accept: 'application/dns-json' } },
    )
    if (!response.ok) throw new Error(`DNS service returned ${response.status}`)
    const data = await response.json()
    const answers = (data.Answer || []).filter((answer) => answer.type === 1)
    const ips = [...new Set(answers.map((answer) => answer.data))]
    return {
      hostname,
      ips,
      ip: ips[0] || null,
      ttl: answers[0]?.TTL ?? null,
      duration: Math.round(performance.now() - started),
      status: ips.length ? 'resolved' : 'no-record',
    }
  } catch (error) {
    return {
      hostname,
      ips: [],
      ip: null,
      ttl: null,
      duration: Math.round(performance.now() - started),
      status: error.name === 'AbortError' ? 'timeout' : 'error',
      error: error.message,
    }
  } finally {
    clearTimeout(timer)
  }
}

export function formatMs(value) {
  return `${Math.max(0, Math.round(value))} ms`
}
