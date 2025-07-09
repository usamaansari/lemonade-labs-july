// components/LemonIcon.jsx

export default function LemonIcon({ className = "w-32 h-32" }) {
    return (
      <svg
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lemon shape */}
        <circle cx="100" cy="100" r="95" fill="#FDE047" stroke="#FACC15" strokeWidth="10" />
  
        {/* Inner pulp (white core) */}
        <circle cx="100" cy="100" r="55" fill="white" />
  
        {/* Lemon segments */}
        <line x1="100" y1="45" x2="100" y2="155" stroke="#FACC15" strokeWidth="6" />
        <line x1="58" y1="65" x2="142" y2="135" stroke="#FACC15" strokeWidth="6" />
        <line x1="58" y1="135" x2="142" y2="65" stroke="#FACC15" strokeWidth="6" />
  
        {/* Lemon drops */}
        <ellipse cx="80" cy="190" rx="8" ry="14" fill="#FDE047" />
        <ellipse cx="120" cy="180" rx="6" ry="10" fill="#FACC15" />
      </svg>
    );
  }
  