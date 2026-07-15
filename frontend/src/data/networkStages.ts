export const networkStages = [
  {
    id: 1,
    title: "Browser",
    icon: "Globe",
    description: "User enters a URL.",
  },
  {
    id: 2,
    title: "DNS Lookup",
    icon: "Search",
    description: "Resolve the domain name into an IP address.",
  },
  {
    id: 3,
    title: "TCP Handshake",
    icon: "Network",
    description: "Establish a reliable TCP connection.",
  },
  {
    id: 4,
    title: "TLS Handshake",
    icon: "Shield",
    description: "Negotiate encryption for HTTPS communication.",
  },
  {
    id: 5,
    title: "HTTP Request",
    icon: "ArrowRightLeft",
    description: "Send the HTTP request to the server.",
  },
  {
    id: 6,
    title: "CDN",
    icon: "Globe",
    description: "Check if cached content is available from the nearest edge server.",
  },
  {
    id: 7,
    title: "Load Balancer",
    icon: "GitBranch",
    description: "Route the request to the healthiest backend server.",
  },
  {
    id: 8,
    title: "API Server",
    icon: "Server",
    description: "Process business logic and handle the request.",
  },
  {
    id: 9,
    title: "Redis Cache",
    icon: "Database",
    description: "Look for frequently accessed data in cache.",
  },
  {
    id: 10,
    title: "Database",
    icon: "HardDrive",
    description: "Retrieve persistent data if cache misses.",
  },
  {
    id: 11,
    title: "Response",
    icon: "ArrowLeft",
    description: "Send the response back to the browser.",
  },
  {
    id: 12,
    title: "Browser Rendering",
    icon: "Monitor",
    description: "Render the HTML, CSS, and JavaScript into a webpage.",
  },
] as const;