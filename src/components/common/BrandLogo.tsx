import React from 'react'

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'mark-only'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  dark?: boolean
  className?: string
  onClick?: () => void
}

export const LotusMark: React.FC<{
  size?: number
  strokeColor?: string
  ring?: boolean
  className?: string
}> = ({ size = 44, strokeColor = '#B58A45', ring = false, className = '' }) => {
  if (ring) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        role="img"
        aria-label="Biểu trưng hoa sen cách điệu"
        className={`transition-transform duration-300 ${className}`}
      >
        <circle cx="80" cy="80" r="72" fill="none" stroke="#D5B77A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="80" cy="80" r="66" fill="none" stroke="#D5B77A" strokeWidth="1.2" />
        <g fill="none" stroke={strokeColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 124 C77 101 79 77 80 44" />
          <path d="M80 108 C55 100 43 82 45 62 C67 69 78 85 80 108Z" />
          <path d="M80 94 C104 88 118 70 115 51 C94 58 83 74 80 94Z" />
          <path d="M80 49 C60 43 61 23 80 15 C99 23 100 43 80 49Z" />
          <path d="M80 49 C55 52 43 35 58 24 C70 22 78 34 80 49Z" />
          <path d="M80 49 C105 52 117 35 102 24 C90 22 82 34 80 49Z" />
          <path d="M48 126 Q80 110 112 126" />
        </g>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`transition-transform duration-300 ${className}`}
    >
      <g fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 85 C47 66 49 48 50 25" />
        <path d="M50 66 C32 61 24 48 25 34 C41 39 49 50 50 66Z" />
        <path d="M50 56 C68 51 77 39 76 25 C60 31 52 42 50 56Z" />
        <path d="M50 29 C35 23 37 10 50 7 C63 10 65 23 50 29Z" />
        <path d="M50 29 C31 31 24 19 35 12 C44 10 49 18 50 29Z" />
        <path d="M50 29 C69 31 76 19 65 12 C56 10 51 18 50 29Z" />
        <path d="M30 81 C39 75 44 73 50 72 C56 73 62 76 70 81" />
      </g>
    </svg>
  )
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  dark = false,
  className = '',
  onClick,
}) => {
  const markSizes = {
    sm: 34,
    md: 44,
    lg: 56,
    xl: 72,
  }

  const markSize = markSizes[size]

  if (variant === 'mark-only') {
    return (
      <div onClick={onClick} className={`inline-flex items-center cursor-pointer ${className}`}>
        <LotusMark size={markSize} ring={size === 'lg' || size === 'xl'} />
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center cursor-pointer select-none group ${className}`}
      >
        <LotusMark
          size={markSize * 1.3}
          ring
          className="transform group-hover:scale-105 transition-transform duration-300 mb-3"
        />
        <span
          className={`font-serif tracking-widest uppercase font-medium ${
            size === 'lg' || size === 'xl' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          } ${dark ? 'text-white' : 'text-ink'}`}
        >
          Xuân Hiếu Hương Thảo
        </span>
        <span
          className={`text-xs uppercase tracking-[0.25em] font-sans mt-1.5 ${
            dark ? 'text-champagne-light' : 'text-gold'
          }`}
        >
          Wedding Planner · Thiệp Cưới
        </span>
        <span className={`text-[11px] tracking-wider italic font-serif mt-1 ${dark ? 'text-gray-300' : 'text-muted'}`}>
          Tinh tế trong từng khoảnh khắc · Đậm chất Việt
        </span>
      </div>
    )
  }

  // Default: horizontal
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      <LotusMark
        size={markSize}
        ring={size === 'lg'}
        className="transform group-hover:rotate-6 transition-transform duration-300 flex-shrink-0"
      />
      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif tracking-wider uppercase font-semibold transition-colors duration-200 ${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base md:text-lg'
          } ${dark ? 'text-white group-hover:text-champagne-light' : 'text-ink group-hover:text-gold'}`}
        >
          Xuân Hiếu Hương Thảo
        </span>
        <span
          className={`uppercase tracking-[0.18em] font-sans font-medium text-[9px] md:text-[10px] mt-0.5 ${
            dark ? 'text-champagne-light/90' : 'text-gold'
          }`}
        >
          Wedding Planner · Thiệp Cưới
        </span>
      </div>
    </div>
  )
}
