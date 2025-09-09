export const USMapSVG = () => (
  <svg
    viewBox="0 0 959 593"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full opacity-30"
    preserveAspectRatio="xMidYMid meet"
  >
    <g id="us-map">
      {/* Simplified US Continental Map Path */}
      <path
        d="M844 168c2-2 4-3 6-3 3 0 5 1 7 3l8 9c2 2 3 4 3 7 0 2-1 5-3 6l-9 9c-2 2-4 3-6 3-3 0-5-1-7-3l-9-9c-2-2-3-4-3-6 0-3 1-5 3-7l10-9zm-35 52l161-1 2 28 8 101 3 55-1 84-2 13-4 9-3 3-3 2-4 1-119 8-22 2-19 3-21 4-92 20-93-2-66-2-40-1-75-2-77-2-42-1-100-3-83-3-15-1-3-1-3-2-2-3-1-14 1-21 1-19 2-20 3-41 1-14 2-15 1-8-68 2-17 0-2-1-1-1-1-2 0-17 2-21 2-21 3-21 3-20 3-21 2-10 3-10 3-11 3-10 3-10 3-11 3-10 2-10 1-3 2-2 3-1 17-1 86-3 111-5 104-4 92-4 93-4 44-2 43-2 44-2 44-2 2 0 2 1 1 2z"
        fill="rgba(100, 165, 202, 0.2)"
        stroke="rgba(77, 139, 190, 0.76)"
        strokeWidth="1"
      />
      
      {/* Alaska (top left) */}
      <path
        d="M60 450l40-10 20 5 10 15-5 20-15 10-30 5-25-15-5-20 10-10z"
        fill="rgba(96, 165, 250, 0.2)"
        stroke="rgba(96, 165, 250, 0.4)"
        strokeWidth="1"
      />
      
      {/* Hawaii (bottom left) */}
      <g transform="translate(100, 500)">
        <circle cx="10" cy="10" r="3" fill="rgba(96, 165, 250, 0.3)" />
        <circle cx="20" cy="12" r="3" fill="rgba(96, 165, 250, 0.3)" />
        <circle cx="30" cy="10" r="3" fill="rgba(96, 165, 250, 0.3)" />
        <circle cx="35" cy="15" r="3" fill="rgba(96, 165, 250, 0.3)" />
      </g>

      {/* Florida */}
      <path
        d="M700 380l20 0 15 30 10 40 5 30-5 10-10 5-15-25-15-35-10-40 5-15z"
        fill="rgba(96, 165, 250, 0.2)"
        stroke="rgba(96, 165, 250, 0.4)"
        strokeWidth="1"
      />

      {/* Texas */}
      <path
        d="M400 380l80 0 60 10 20 30 0 40-20 40-40 30-60 10-50-10-30-30-10-40 10-40 40-40z"
        fill="rgba(96, 165, 250, 0.2)"
        stroke="rgba(96, 165, 250, 0.4)"
        strokeWidth="1"
      />

      {/* California */}
      <path
        d="M100 250l30-40 40-20 30 0 20 20 10 40 0 60-10 50-20 40-30 20-40 0-30-30-10-60 10-80z"
        fill="rgba(96, 165, 250, 0.2)"
        stroke="rgba(96, 165, 250, 0.4)"
        strokeWidth="1"
      />

      {/* Great Lakes Region */}
      <g>
        <path
          d="M600 150l40 0 30 10 20 20 0 30-10 20-20 10-30 0-30-10-20-20 0-30 20-30z"
          fill="rgba(96, 165, 250, 0.15)"
          stroke="rgba(96, 165, 250, 0.3)"
          strokeWidth="1"
        />
      </g>
    </g>

    {/* State Labels */}
    <g fill="rgba(148, 163, 184, 0.6)" fontSize="10" fontFamily="Arial">
      <text x="150" y="300">CA</text>
      <text x="450" y="420">TX</text>
      <text x="720" y="420">FL</text>
      <text x="780" y="200">NY</text>
      <text x="620" y="180">IL</text>
      <text x="250" y="250">NV</text>
      <text x="350" y="250">CO</text>
      <text x="550" y="250">MO</text>
      <text x="700" y="300">GA</text>
      <text x="750" y="150">MA</text>
      <text x="200" y="150">WA</text>
    </g>
  </svg>
);

// Better US map with actual state boundaries
export const USMapDetailed = () => (
  <div className="absolute inset-0 w-full h-full">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-50" />
    
    {/* US Map Image Overlay */}
    <div 
      className="absolute inset-0 w-full h-full opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 959 593'%3E%3Cpath d='M844 168L959 220v200l-115 52-100-20-100 30-150-30-100 50-150-50-100 30-44-50V200l100-50 150 30 100-30 150 30 100-30z' fill='none' stroke='%2360a5fa' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
    
    {/* Grid overlay for positioning */}
    <svg className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);