// ---------------------------------------------------------------
// Central data for the Internet Visualizer.
// NODES  : architecture components on the canvas (SVG coordinates)
//          `kind` selects which hand-drawn SVG icon to render.
// LINKS  : connections between nodes
// STAGES : the 10 lifecycle steps. Each stage has an explanation
//          plus "hops" = animated packet moves between nodes.
// ---------------------------------------------------------------

export const NODES = {
  browser: { x: 145,  y: 350, kind: 'browser', label: 'Browser' },
  dns:     { x: 430,  y: 125, kind: 'dns',     label: 'DNS Server' },
  lb:      { x: 640,  y: 350, kind: 'lb',      label: 'Load Balancer' },
  server:  { x: 900,  y: 350, kind: 'server',  label: 'Web Server' },
  cache:   { x: 1160, y: 165, kind: 'cache',   label: 'Cache (Redis)' },
  db:      { x: 1160, y: 535, kind: 'db',      label: 'Database' },
}

export const LINKS = [
  ['browser', 'dns'],
  ['browser', 'lb'],
  ['lb', 'server'],
  ['server', 'cache'],
  ['server', 'db'],
]

export const STAGES = [
  {
    id: 'url',
    short: 'URL Parsing',
    title: 'Step 1 · Browser processes the URL',
    description:
      'You type a URL and hit Enter. The browser parses it, adds https:// if missing, checks its HSTS list, and first looks in its local cache — if a fresh copy of the page exists, the whole network journey is skipped.',
    details: [
      'URL is parsed; https:// added if missing',
      'Browser cache checked — a fresh hit renders immediately',
      'Cache miss → the domain name must be resolved to an IP first',
    ],
    hops: [],
    highlight: ['browser'],
  },
  {
    id: 'dns',
    short: 'DNS Lookup',
    title: 'Step 2 · DNS Lookup',
    description:
      'Computers communicate using IP addresses, not domain names. The browser asks a DNS resolver, which queries the root server, then the .com TLD server, then the authoritative name server — and returns the IP address of the website.',
    details: [
      'Lookup order: browser cache → OS cache → DNS resolver',
      'Root server → TLD server (.com) → authoritative server',
      'Resolver replies with the server IP address',
    ],
    hops: [
      { from: 'browser', to: 'dns', label: 'google.com ?', color: '#60a5fa' },
      { from: 'dns', to: 'browser', label: '142.250.77.142', color: '#34d399' },
    ],
    highlight: ['browser', 'dns'],
  },
  {
    id: 'tcp',
    short: 'TCP Handshake',
    title: 'Step 3 · TCP 3-Way Handshake',
    description:
      'Now the browser knows the IP address, it needs a reliable connection. TCP establishes it with a three-way handshake: SYN → SYN-ACK → ACK. From this point both sides can exchange data in order, without loss.',
    details: [
      'SYN — client asks to synchronize sequence numbers',
      'SYN-ACK — server agrees, sends its starting number',
      'ACK — client confirms; connection established',
    ],
    hops: [
      { from: 'browser', to: 'lb', label: 'SYN', color: '#fb923c' },
      { from: 'lb', to: 'browser', label: 'SYN-ACK', color: '#fb923c' },
      { from: 'browser', to: 'lb', label: 'ACK', color: '#fb923c' },
    ],
    highlight: ['browser', 'lb', 'server'],
  },
  {
    id: 'tls',
    short: 'TLS Handshake',
    title: 'Step 4 · TLS Handshake (HTTPS)',
    description:
      'A plain TCP connection is not secure, so the browser and server perform a TLS handshake. The server proves its identity with a certificate, both sides agree on encryption keys, and all following traffic is encrypted.',
    details: [
      'ClientHello — browser offers TLS version & cipher suites',
      'ServerHello + Certificate — server proves its identity',
      'Key exchange → both sides share secret session keys',
    ],
    hops: [
      { from: 'browser', to: 'lb', label: 'ClientHello', color: '#a78bfa' },
      { from: 'lb', to: 'browser', label: 'Cert + ServerHello', color: '#a78bfa' },
      { from: 'browser', to: 'lb', label: 'Key exchange OK', color: '#a78bfa' },
    ],
    highlight: ['browser', 'lb', 'server'],
  },
  {
    id: 'request',
    short: 'HTTP Request',
    title: 'Step 5 · HTTP Request is sent',
    description:
      'Over the secure channel, the browser sends an HTTP request: a method (GET), the path, headers (User-Agent, cookies, Accept…) and sometimes a body. The request first meets the load balancer.',
    details: [
      'Request line: GET / HTTP/1.1',
      'Headers carry cookies, accepted formats, caching rules',
      'Request travels browser → load balancer → web server',
    ],
    hops: [
      { from: 'browser', to: 'lb', label: 'GET / HTTP/1.1', color: '#22d3ee' },
      { from: 'lb', to: 'server', label: 'forward request', color: '#22d3ee' },
    ],
    highlight: ['browser', 'lb', 'server'],
  },
  {
    id: 'cache',
    short: 'Cache Check',
    title: 'Step 6 · Cache lookup (Redis)',
    description:
      'Before hitting the database, the application checks the cache (e.g. Redis) — a fast in-memory store. A cache hit returns the data in milliseconds; a miss means a slower database query is needed.',
    details: [
      'Server asks the cache for the required data',
      'HIT → data returned almost instantly',
      'MISS → fall through to the database (next step)',
    ],
    hops: [
      { from: 'server', to: 'cache', label: 'GET user:123 ?', color: '#fbbf24' },
      { from: 'cache', to: 'server', label: 'MISS', color: '#fbbf24' },
    ],
    highlight: ['server', 'cache'],
  },
  {
    id: 'db',
    short: 'Database Query',
    title: 'Step 7 · Database query',
    description:
      'The data was not in cache, so the server queries the database (SQL for relational DBs). After the rows come back, the result is usually written into the cache so the next request is faster.',
    details: [
      'Server runs a query: SELECT * FROM users WHERE id=123',
      'Database returns the matching rows',
      'Result is stored in cache for next time',
    ],
    hops: [
      { from: 'server', to: 'db', label: 'SQL query', color: '#f472b6' },
      { from: 'db', to: 'server', label: 'rows returned', color: '#f472b6' },
    ],
    highlight: ['server', 'db'],
  },
  {
    id: 'response',
    short: 'HTTP Response',
    title: 'Step 8 · HTTP Response',
    description:
      'The server builds the response — status line (HTTP/1.1 200 OK), headers (Content-Type, caching rules), and the body (HTML). It travels back through the load balancer to the browser.',
    details: [
      'Status line: HTTP/1.1 200 OK',
      'Headers describe the body & caching policy',
      'Body contains the HTML of the page',
    ],
    hops: [
      { from: 'server', to: 'lb', label: 'HTTP 200 OK + HTML', color: '#34d399' },
      { from: 'lb', to: 'browser', label: 'response received', color: '#34d399' },
    ],
    highlight: ['server', 'lb', 'browser'],
  },
  {
    id: 'render',
    short: 'Rendering',
    title: 'Step 9 · Browser rendering',
    description:
      'The browser turns code into pixels. It parses HTML into the DOM, CSS into the CSSOM, combines them into a render tree, computes layout, paints each pixel, and composites layers into the final page.',
    details: [
      'HTML → DOM tree,  CSS → CSSOM tree',
      'Render tree → Layout (geometry of every element)',
      'Paint → Compositing → the page appears on screen',
    ],
    hops: [],
    highlight: ['browser'],
  },
  {
    id: 'done',
    short: 'Page Loaded',
    title: 'Step 10 · Webpage loaded',
    description:
      'The full journey is complete: URL parsed, DNS resolved, TCP connection established, TLS secured, HTTP request processed, data fetched (cache or database), response returned and rendered. This entire cycle usually takes less than a second.',
    details: [
      'Total time for all 10 steps: often under 1 second',
      'Press Play again to re-run the visualization',
      'Use the Prev / Next buttons to inspect any step',
    ],
    hops: [],
    highlight: ['browser', 'dns', 'lb', 'server', 'cache', 'db'],
  },
]
