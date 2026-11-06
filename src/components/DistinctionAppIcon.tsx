import React from 'react';

interface DistinctionAppIconProps {
  size?: number;
  className?: string;
  showShadow?: boolean;
}

export const DistinctionAppIcon: React.FC<DistinctionAppIconProps> = ({
  size = 44,
  className = '',
  showShadow = true,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`shrink-0 select-none ${showShadow ? 'shadow-md shadow-blue-950/20' : ''} ${className}`}
      style={{ borderRadius: `${Math.round(size * 0.22)}px` }}
    >
      <defs>
        {/* Background Royal Blue Gradient */}
        <linearGradient id="daiBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B2B67" />
          <stop offset="50%" stopColor="#071E4A" />
          <stop offset="100%" stopColor="#04122E" />
        </linearGradient>

        {/* Cap Top Shading */}
        <linearGradient id="daiCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        {/* Clip to Rounded App Icon Shape */}
        <clipPath id="daiSquircleClip">
          <rect x="0" y="0" width="512" height="512" rx="112" ry="112" />
        </clipPath>

        <filter id="daiSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* App Icon Base Squircle */}
      <rect width="512" height="512" rx="112" ry="112" fill="url(#daiBgGrad)" />

      <g clipPath="url(#daiSquircleClip)">
        {/* ========================================== */}
        {/* 1. GRADUATION CAP (TOP)                    */}
        {/* ========================================== */}
        <g filter="url(#daiSoftShadow)">
          {/* Cap Base / Skullcap */}
          <path d="M 180 120 L 180 155 Q 256 190 332 155 L 332 120 Z" fill="#94A3B8" />
          <path d="M 190 125 L 190 152 Q 256 182 322 152 L 322 125 Z" fill="#FFFFFF" />

          {/* Diamond Mortarboard Top */}
          <polygon
            points="256,48 382,105 256,152 130,105"
            fill="url(#daiCapGrad)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* Top Button */}
          <ellipse cx="256" cy="100" rx="6" ry="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Hanging White Tassel */}
          <path
            d="M 256 100 C 290 102 360 110 366 145"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="366" cy="148" rx="4" ry="4" fill="#FFFFFF" />
          <polygon points="363,150 369,150 373,178 359,178" fill="#FFFFFF" />
          <line x1="363" y1="178" x2="363" y2="182" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="366" y1="178" x2="366" y2="183" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="369" y1="178" x2="369" y2="182" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* ========================================== */}
        {/* 2. OPEN BOOK WITH SA FLAG WINGS            */}
        {/* ========================================== */}
        <g filter="url(#daiSoftShadow)">
          {/* White Page Underside */}
          <path d="M 256 220 C 215 220 150 210 102 185 L 102 245 C 150 270 215 280 256 280 Z" fill="#F8FAFC" />
          <path d="M 256 220 C 297 220 362 210 410 185 L 410 245 C 362 270 297 280 256 280 Z" fill="#F8FAFC" />

          {/* Left Wing (SA Flag Green, Black & Gold) */}
          <path d="M 256 215 C 215 215 152 205 106 180 L 106 208 C 152 233 215 243 256 243 Z" fill="#007749" />
          <path d="M 106 208 C 145 224 195 235 228 238 L 106 250 Z" fill="#FFB81C" />
          <path d="M 106 212 C 140 226 185 235 218 238 L 106 247 Z" fill="#000000" />
          <path d="M 106 250 C 152 268 215 272 256 272 L 256 262 C 215 262 152 255 106 240 Z" fill="#FFB81C" />

          {/* Right Wing (SA Flag Green, Red & Blue) */}
          <path d="M 256 215 C 297 215 360 205 406 180 L 406 208 C 360 233 297 243 256 243 Z" fill="#007749" />
          <path d="M 256 228 C 297 228 360 220 406 200 L 406 230 C 360 248 297 254 256 254 Z" fill="#FFFFFF" />
          <path d="M 264 230 C 300 230 360 222 404 204 L 404 226 C 360 244 300 250 264 250 Z" fill="#E03C31" />
          <path d="M 256 254 C 297 254 360 248 406 230 L 406 255 C 360 272 297 274 256 274 Z" fill="#002395" />

          {/* Center White Spine */}
          <path d="M 254 212 L 258 212 L 258 282 L 254 282 Z" fill="#FFFFFF" />
        </g>

        {/* ========================================== */}
        {/* 3. LOGO TYPOGRAPHY                         */}
        {/* ========================================== */}
        <text
          x="256"
          y="342"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        >
          <tspan fill="#FFFFFF" fontWeight="900" fontSize="54" letterSpacing="-1">
            Distinction
          </tspan>
          <tspan fill="#FFC72C" fontWeight="900" fontSize="56" letterSpacing="1">
            {' '}ZA
          </tspan>
        </text>

        {/* Tagline */}
        <text
          x="256"
          y="378"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="500"
          fontSize="16.5"
          letterSpacing="0.2"
          opacity="0.95"
        >
          Learn Today. Improve Tomorrow.
        </text>
        <text
          x="256"
          y="405"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="500"
          fontSize="16.5"
          letterSpacing="0.2"
          opacity="0.95"
        >
          Achieve Your Distinction.
        </text>

        {/* ========================================== */}
        {/* 4. DYNAMIC SOUTH AFRICAN FLAG SWOOSH       */}
        {/* ========================================== */}
        <path d="M -10 405 C 120 460 280 500 525 435 L 530 525 L -20 530 Z" fill="#007749" />
        <path d="M -10 425 C 130 480 300 515 525 460 L 530 525 L -20 530 Z" fill="#FFB81C" />
        <path d="M -10 445 C 140 498 320 525 525 480 L 530 525 L -20 530 Z" fill="#000000" />
        <path d="M 280 515 C 370 510 460 485 530 435 L 530 470 C 460 510 380 525 290 528 Z" fill="#E03C31" />
        <path d="M 290 524 C 380 520 465 500 530 468 L 530 475 C 465 506 385 524 295 528 Z" fill="#FFFFFF" />
        <path d="M 320 528 C 400 522 475 505 530 475 L 530 530 L 320 530 Z" fill="#002395" />
      </g>
    </svg>
  );
};
