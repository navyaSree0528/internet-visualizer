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
    description: "Resolve domain name.",
  },
  {
    id: 3,
    title: "TCP Handshake",
    icon: "Network",
    description: "Establish TCP connection.",
  },
  {
    id: 4,
    title: "TLS Handshake",
    icon: "Shield",
    description: "Secure communication.",
  },
  {
    id: 5,
    title: "HTTP Request",
    icon: "ArrowRightLeft",
    description: "Send request to server.",
  },
  {
    id: 6,
    title: "Load Balancer",
    icon: "GitBranch",
    description: "Distribute traffic.",
  },
  {
    id: 7,
    title: "API Server",
    icon: "Server",
    description: "Process request.",
  },
  {
    id: 8,
    title: "Redis Cache",
    icon: "Database",
    description: "Fast data lookup.",
  },
  {
    id: 9,
    title: "Database",
    icon: "HardDrive",
    description: "Persistent storage.",
  },
  {
    id: 10,
    title: "Response",
    icon: "ArrowLeft",
    description: "Return data.",
  },
  {
    id: 11,
    title: "Browser Rendering",
    icon: "Monitor",
    description: "Display webpage.",
  },
] as const;