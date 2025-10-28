import React from 'react';

export const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 12.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm3.5-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12.928 10.38a1 1 0 00-1.856 0 3.5 3.5 0 00-3.144 3.143 1 1 0 101.972.342A1.5 1.5 0 0111.4 12a1.5 1.5 0 011.5-1.5 1 1 0 000-2 .5.5 0 01-.5-.5 1 1 0 00-1-1 .5.5 0 01-.5-.5 1 1 0 00-1-1 .5.5 0 01-.5-.5 1 1 0 00-1-1 .5.5 0 01-.5-.5A8.508 8.508 0 0110.5 3.5a1 1 0 002 0 6.5 6.5 0 00-6.273 5.483 1 1 0 101.946.434A4.5 4.5 0 0110.5 5.5a1 1 0 100 2 .5.5 0 01.5.5 1 1 0 001 1 .5.5 0 01.5.5 1 1 0 001 1 .5.5 0 01.5.5 1 1 0 001 1 .5.5 0 01.5.5 1 1 0 001 1 .5.5 0 01.5.5z"/>
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
    </svg>
);

// FIX: Added UserIcon for community feature.
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

// FIX: Added ThumbsUpIcon for community feature.
export const ThumbsUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
    </svg>
);

// FIX: Added ChatBubbleIcon for community feature.
export const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
);

// FIX: Added VideoCameraIcon for online vet feature.
export const VideoCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8a3.6 3.6 0 0 0 3.6 3.6h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6a3.6 3.6 0 0 0-3.6-3.6H7.6zm9 3.1c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15.5V8.5l6 3.5-6 3.5z" />
    </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.94-6.37-2.96-1.53-2.02-1.66-4.8-1.56-7.17.02-.5.03-1 .05-1.5l2.12-.01c-.03.46-.03.93-.04 1.4-.04 1.58.28 3.13 1.2 4.36 1.04 1.4 2.65 2.16 4.35 1.95 1.7-.21 3.1-1.3 3.6-2.93.16-.5.24-1.01.27-1.52l.02-9.19c-.52.27-1.03.53-1.54.77-1.21.57-2.55.88-3.86.91V8.67c.81-.03 1.6-.2 2.3-.56.69-.37 1.31-.82 1.84-1.39.43-.45.83-.93 1.17-1.46C12.54 4.13 12.52 2.08 12.53.02z" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

export const BKashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 128" className={className}>
        <path fill="#D82A7D" d="M0 0h248v128H0z"/>
        <path fill="#FFF" d="m142.3 80.3 18.2-22.1c.9-1.1 1.4-2.5 1.4-3.9 0-3.3-2.6-6-5.8-6h-13.8c-1.8 0-3.5 1-4.4 2.6l-11.7 19.8-4-6.4c-1-1.6-2.6-2.6-4.4-2.6H98.1c-3.2 0-5.8 2.7-5.8 6 0 1.5.5 2.8 1.4 3.9l18.2 22.1-18.2 22.1c-.9 1.1-1.4 2.5-1.4 3.9 0 3.3 2.6 6 5.8 6h19.9c1.8 0 3.5-1 4.4-2.6l4-6.4 11.7 19.8c.9 1.6 2.6 2.6 4.4 2.6h13.8c3.2 0 5.8-2.7 5.8-6 0-1.5-.5-2.8-1.4-3.9l-18.2-22.1z"/>
    </svg>
);

export const NagadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
        <path fill="#F54A1C" d="M0 0h512v512H0z"/>
        <path fill="#FFF" d="M380.2 165.8h-77.9l-99.2 110.8-28.7-31.9-63.5 70.3h77.9l99.2-110.8 28.7 31.9 63.5-70.3z"/>
        <path fill="#FFF" d="m256 256-62.5 69.9h-77.9l140.4-155.6h77.9L256 311.2V256z"/>
    </svg>
);