/**
 * Motif hexagonal ouvert, repris du logo
 */
export default function HexagonMark({ className = "", strokeWidth = 5 }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <path
        d="M88 26 L50 4 L12 26 L12 74 L50 96 L88 74"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="13" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
    </svg>
  );
}
