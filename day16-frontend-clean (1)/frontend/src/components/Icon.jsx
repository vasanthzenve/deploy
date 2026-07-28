const paths = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  paw: 'M8 3.2c-1.4 0-2.4 1.3-2.4 2.9S6.6 9 8 9s2.4-1.3 2.4-2.9S9.4 3.2 8 3.2zM16 3.2c-1.4 0-2.4 1.3-2.4 2.9S14.6 9 16 9s2.4-1.3 2.4-2.9-1-2.9-2.4-2.9zM4 9.6C2.8 9.6 2 10.8 2 12.2s.9 2.6 2.1 2.6 2.1-1.2 2.1-2.6S5.3 9.6 4 9.6zM20 9.6c-1.3 0-2.1 1.2-2.1 2.6s.9 2.6 2.1 2.6 2.1-1.2 2.1-2.6-.8-2.6-2.1-2.6zM12 10.4c-2.6 0-5.6 2.7-5.6 5.7 0 1.8 1.3 2.9 3 2.9.9 0 1.6-.3 2.6-.3s1.7.3 2.6.3c1.7 0 3-1.1 3-2.9 0-3-3-5.7-5.6-5.7z',
  calendar: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
  phone: 'M6.6 3.5 4 5c-.6 3.8 1.4 8.2 4.6 11.4S16 21 19.8 20.4l1.6-2.6-4.2-3-1.6 1.7c-2-1-3.9-2.9-4.9-4.9l1.7-1.6z',
  shield: 'M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z',
  heart: 'M12 20.5S3 14.8 3 9.1C3 6.3 5.2 4 8 4c1.7 0 3.2.9 4 2.2C12.8 4.9 14.3 4 16 4c2.8 0 5 2.3 5 5.1 0 5.7-9 11.4-9 11.4z',
  stethoscope: 'M6 3v6a4 4 0 0 0 8 0V3M6 3H4.5M14 3h1.5M10 13v2a5 5 0 0 0 10 0v-1M20 13.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z',
  sparkle: 'M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3z',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  plus: 'M12 5v14M5 12h14',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  trash: 'M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
  chevron: 'm9 6 6 6-6 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.9 3.6-6 8-6s8 2.1 8 6',
}

export default function Icon({ name, size = 18, className = '', strokeWidth = 1.8 }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
