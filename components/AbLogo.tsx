export default function AbLogo({ size = 60, id = 'ab' }: { size?: number; id?: string }) {
  return (
    <svg viewBox="0 0 160 200" fill="none" width={size} height={size * 1.25}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#7a5a10"/>
        </linearGradient>
      </defs>
      <line x1="80" y1="20" x2="80" y2="168" stroke={`url(#${id})`} strokeWidth="6" strokeLinecap="round"/>
      <path d="M28 168 L80 20" stroke={`url(#${id})`} strokeWidth="6" strokeLinecap="round"/>
      <line x1="40" y1="124" x2="80" y2="124" stroke={`url(#${id})`} strokeWidth="5" strokeLinecap="round"/>
      <path d="M80 20 Q128 20 128 48 Q128 94 80 94" stroke={`url(#${id})`} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <path d="M80 94 Q132 94 132 131 Q132 168 80 168" stroke={`url(#${id})`} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <circle cx="80" cy="20"  r="7" fill="#E8C97A"/>
      <circle cx="80" cy="168" r="7" fill="#E8C97A"/>
      <circle cx="28" cy="168" r="4.5" fill="#C9A84C" opacity=".6"/>
    </svg>
  )
}
