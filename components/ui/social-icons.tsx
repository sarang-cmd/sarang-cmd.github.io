"use client"

import { useState } from 'react'
import { Instagram, Mail } from 'lucide-react'

export const socialLinks = [
  { name: 'GitHub', detail: 'See what I’m building', href: 'https://github.com/sarang-cmd', color: 'yellow' },
  { name: 'LinkedIn', detail: 'Connect with me', href: 'https://linkedin.com/in/sarang-batra', color: 'blue' },
  { name: 'Instagram', detail: 'Find me here', href: 'https://instagram.com/sarangde.v', color: 'pink' },
  { name: 'Email', detail: 'Say hello', href: 'mailto:sarang.cmd@gmail.com?subject=Hi%20Sarang%20(from%20your%20website)', color: 'green' },
] as const

type SocialName = typeof socialLinks[number]['name']
export function SocialIcon({ name }: { name: SocialName }) {
  if (name === 'GitHub') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"/></svg>
  if (name === 'LinkedIn') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
  return name === 'Instagram' ? <Instagram aria-hidden="true" size={28}/> : <Mail aria-hidden="true" size={28}/>
}

export function SocialIcons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const accentClasses = ['bg-[#f3ce37]', 'bg-[#bed8ff]', 'bg-[#efb8b3]', 'bg-[#c2deb4]']
  return <nav className="relative grid w-full grid-cols-4 gap-2 p-2.5 rounded-[24px] bg-[#fffdf7] border-2 border-[#191919] shadow-[6px_6px_0_#191919,0_20px_32px_-22px_rgba(25,25,25,.7)]" aria-label="Connect with me">
    {socialLinks.map((social, index) => {
      const active = hoveredIndex === index
      return <a key={social.name} href={social.href} target={social.name === 'Email' ? undefined : '_blank'} rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
        className={`group relative flex h-[96px] w-full flex-col items-center justify-center gap-1.5 rounded-[16px] border-2 border-[#191919] px-1 text-[#191919] shadow-[0_3px_0_#191919] transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${accentClasses[index]}`} aria-label={social.name}
        onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}
        onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)}>
        <span className={`relative z-10 transition-transform duration-300 ease-out motion-reduce:transition-none ${active ? 'scale-110' : 'scale-100'}`}><SocialIcon name={social.name}/></span>
        <span className="relative z-10 w-full truncate px-0.5 text-center text-[11px] font-bold leading-none sm:text-[15px] social-type">{social.name}</span>
        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#191919] transition-all duration-300 ease-out motion-reduce:transition-none ${active ? 'w-5 opacity-100' : 'w-0 opacity-0'}`} aria-hidden="true" />
        <span className={`absolute z-20 -top-10 px-2.5 py-1 rounded-lg border border-[#191919] ${accentClasses[index]} text-[#191919] text-[13px] font-bold whitespace-nowrap social-type shadow-[2px_2px_0_#191919] transition-all duration-300 ease-out motion-reduce:transition-none ${index === 0 ? 'left-0' : index === socialLinks.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'} ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`} aria-hidden="true">
          {social.detail}<span className={`absolute -bottom-1 size-2 rotate-45 border-r border-b border-[#191919] ${accentClasses[index]} ${index === 0 ? 'left-6' : index === socialLinks.length - 1 ? 'right-6' : 'left-1/2 -translate-x-1/2'}`} />
        </span>
      </a>
    })}
  </nav>
}
