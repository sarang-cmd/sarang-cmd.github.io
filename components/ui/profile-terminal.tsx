"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import SquareSnake from '@/components/ui/square-snake'

// These lines are a staged profile preview, not real npm output.
const introduction = [
  {kind:'log', text:'sarang-personal-site@1.0.0 introduce'},
  {kind:'log', text:'Loading profile...'},
  {kind:'success', text:'Sarang Batra: aspiring CS student and agentic engineer'},
  {kind:'success', text:'Learning deep learning fundamentals'},
  {kind:'success', text:'Building tools for learning and focus'},
  {kind:'status', text:'Personal website under construction'},
] as const
const exploration = [{kind:'log', text:'Projects and ways to connect are below.'}] as const

type Phase = 'ready-intro' | 'running-intro' | 'ready-explore' | 'running-explore' | 'done'

export function ProfileTerminal({ enabled = true }: { enabled?: boolean }) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || document.visibilityState === 'visible')
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [phase, setPhase] = useState<Phase>('ready-intro')
  const [count, setCount] = useState(0)
  const [alwaysAllow, setAlwaysAllow] = useState(false)
  const [introDenied, setIntroDenied] = useState(false)
  const [exploreDenied, setExploreDenied] = useState(false)
  const [showOther, setShowOther] = useState(false)
  const [other, setOther] = useState('')
  const [otherSent, setOtherSent] = useState(false)

  useEffect(() => {
    const target = terminalRef.current
    if (!target) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduced(media.matches)
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => { media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility) }
  }, [])
  const run = useCallback(() => {
    if (!enabled || !inView || !pageVisible) return
    if (phase === 'ready-intro') { setCount(0); setPhase('running-intro') }
    else if (phase === 'ready-explore') { setCount(0); setPhase('running-explore') }
  }, [enabled, inView, pageVisible, phase])
  useEffect(() => {
    if (!enabled || !inView || !pageVisible || (phase !== 'running-intro' && phase !== 'running-explore')) return
    const length = phase === 'running-intro' ? introduction.length : exploration.length
    if (reduced) {
      setCount(length)
      setPhase(phase === 'running-intro' ? 'ready-explore' : 'done')
      return
    }
    const timer = window.setTimeout(() => {
      if (count < length) setCount(value => value + 1)
      else setPhase(phase === 'running-intro' ? 'ready-explore' : 'done')
    }, count < length ? 1100 : 1000)
    return () => window.clearTimeout(timer)
  }, [enabled, inView, pageVisible, phase, count, reduced])
  // Always allow applies only to this visit and only to these illustrated commands.
  useEffect(() => {
    if (!alwaysAllow || phase !== 'ready-explore' || !enabled || !inView || !pageVisible) return
    const timer = window.setTimeout(run, reduced ? 0 : 1200)
    return () => window.clearTimeout(timer)
  }, [alwaysAllow, phase, enabled, inView, pageVisible, reduced, run])
  const deny = () => {
    if (phase === 'ready-intro') { setIntroDenied(true); setPhase('ready-explore') }
    else if (phase === 'ready-explore') { setExploreDenied(true); setPhase('done') }
    setShowOther(false)
  }
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.repeat || event.defaultPrevented || !enabled || !inView || !pageVisible) return
      const target = event.target as HTMLElement | null
      // Native buttons and links keep their normal Enter behavior.
      if (target && target !== document.body && (target.closest('a,button,input,textarea,select,[contenteditable="true"]') || !terminalRef.current?.contains(target))) return
      if (phase === 'ready-intro' || phase === 'ready-explore') { event.preventDefault(); run() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [enabled, inView, pageVisible, phase, run])

  const running = phase === 'running-intro' || phase === 'running-explore'
  const introCount = introDenied ? 0 : phase === 'running-intro' ? count : phase === 'ready-intro' ? 0 : introduction.length
  const exploreCount = exploreDenied ? 0 : phase === 'running-explore' ? count : phase === 'done' ? exploration.length : 0
  const introEntered = phase !== 'ready-intro' && !introDenied
  const showExplore = phase === 'ready-explore' || phase === 'running-explore' || phase === 'done'
  const exploreEntered = !exploreDenied && (phase === 'running-explore' || phase === 'done')
  const ready = phase === 'ready-intro' || phase === 'ready-explore'
  const renderOutput = (line: {kind: string; text: string}, index: number) => <div className={'terminal-line terminal-line-' + line.kind} key={index}>
    <span className={'terminal-prefix terminal-prefix-' + line.kind}>{line.kind === 'success' ? '✓' : line.kind === 'status' ? '!' : '>'} </span>{line.text}
  </div>
  return <div className="terminal" ref={terminalRef} data-terminal-phase={phase}>
    <div className="terminal-top"><div className="terminal-dots" aria-hidden="true"><i/><i/><i/></div><span>npm / profile</span><span aria-hidden="true"/></div>
    <div className="terminal-body">
      <p className="terminal-description">Illustrative commands. Nothing runs on your device.</p>
      <div role="log" aria-live="polite" aria-relevant="additions text">
        <div className="agent-request"><span className="agent-badge">AGENT</span><span>May I run a command to introduce Sarang?</span></div>
        <div className="terminal-line terminal-line-command"><span className="prompt">sarang@website:~$ </span>npm run introduce {introEntered && <span className="terminal-enter" aria-label="entered">↵</span>}</div>
        {introduction.slice(0, introCount).map(renderOutput)}
        {introDenied && <div className="terminal-line terminal-denied">! Permission denied. Introduction skipped.</div>}
        {showExplore && <><div className="agent-request agent-request-next"><span className="agent-badge">AGENT</span><span>May I run one more command to show you what’s next?</span></div><div className="terminal-line terminal-line-command"><span className="prompt">sarang@website:~$ </span>npm run explore {exploreEntered && <span className="terminal-enter" aria-label="entered">↵</span>}</div></>}
        {exploration.slice(0, exploreCount).map(renderOutput)}
        {exploreDenied && <div className="terminal-line terminal-denied">! Permission denied. Command skipped.</div>}
      </div>
      {running && <div className="terminal-loading" role="status" aria-label="Preparing the next line"><span>{inView && pageVisible && <SquareSnake size={22}/>}</span><span>Preparing the next line</span></div>}
      {ready && !alwaysAllow && <div className="terminal-action" aria-label="Command permission">
        <button type="button" onClick={() => { setAlwaysAllow(true); setShowOther(false); run() }} disabled={!enabled} className="terminal-run">Always allow</button>
        <button type="button" onClick={() => { setShowOther(false); run() }} disabled={!enabled} className="terminal-run terminal-once">Allow only this time <span aria-hidden="true">↵</span></button>
        <button type="button" onClick={deny} disabled={!enabled} className="terminal-run terminal-deny">Deny</button>
        <button type="button" onClick={() => { setShowOther(!showOther); setOtherSent(false) }} disabled={!enabled} className="terminal-run terminal-other" aria-expanded={showOther}>Other</button>
        <span className="terminal-hint">Enter allows once</span>
      </div>}
      {ready && alwaysAllow && <div className="terminal-loading" role="status">Always allowed for this visit. Continuing shortly.</div>}
      {ready && showOther && !alwaysAllow && <form className="terminal-other-form" onSubmit={event => { event.preventDefault(); if (other.trim()) setOtherSent(true) }}>
        <label htmlFor="terminal-other">Your request</label><div><input id="terminal-other" value={other} onChange={event => { setOther(event.target.value); setOtherSent(false) }} placeholder="Type another request" maxLength={140}/><button type="submit">Send</button></div>
        {otherSent && <p role="status">Custom requests can’t be processed here. Choose a permission above, or <a href="#projects">explore projects</a>.</p>}
      </form>}

      {phase === 'done' && <div className="last-prompt"><span className="prompt">sarang@website:~$</span> <span className="cursor" aria-hidden="true"/></div>}
    </div>
  </div>
}
