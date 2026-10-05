# Internet Visualizer

An interactive visual explanation of what happens after a user enters a URL.

The project turns the web request lifecycle into a step-by-step simulation covering DNS resolution, TCP, TLS, HTTP, load balancing, caching, database access, response handling, and browser rendering.

## Why this project

Opening a website looks like one action, but it involves several systems communicating in sequence. Internet Visualizer makes that lifecycle easier to understand by showing the request as an animated packet moving through a simplified web architecture.

## Features

- Step-by-step request lifecycle simulation
- Animated request/response packets
- Interactive architecture diagram built with SVG
- Play, pause, previous, next and reset controls
- Clickable lifecycle timeline
- Stage-specific explanations and packet logs
- URL input for restarting the visualization
- Responsive layout for desktop and smaller screens
- Reduced-motion support for accessibility
- Clean technical UI designed for a portfolio/resume project

## Request flow

```text
Browser
  ↓
URL Parsing
  ↓
DNS Lookup
  ↓
TCP Handshake
  ↓
TLS Handshake
  ↓
HTTP Request
  ↓
Load Balancer
  ↓
Cache / Redis
  ↓
Database
  ↓
HTTP Response
  ↓
Browser Rendering
  ↓
Page Loaded
```

## Tech stack

- React
- Vite
- JavaScript (ES Modules)
- SVG for the interactive network diagram
- CSS animations and motion-path based packet movement

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.


## Live functionality

This version is intentionally more than a visual mock-up:

- **Live DNS resolution:** uses Google Public DNS-over-HTTPS to resolve the entered hostname and displays A records, TTL and lookup duration.
- **URL parser:** extracts protocol, hostname, port and path from the entered URL.
- **Network reachability probe:** attempts a no-CORS HEAD request and reports the browser-safe result and timing.
- **Dynamic packet data:** the DNS response shown in the animation is replaced with the actual resolved IP.
- **Interactive replay:** Play, Pause, Prev, Next, Reset and direct timeline navigation.
- **Diagnostics export:** Copy produces a compact text snapshot of the current URL/network diagnostics.
- **Honest simulation boundary:** TCP/TLS/HTTP packet exchange is represented as an educational protocol simulation because normal browser JavaScript cannot inspect arbitrary network packets or TLS certificates.

This makes the project demonstrate both frontend engineering and practical networking concepts rather than only rendering a static architecture diagram.
