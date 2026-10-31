import React, { useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowUpRight, Github, MessageCircle, Code2 } from 'lucide-react'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'
import BrutalistDeckLoader from '@/components/ui/brutalist-deck-loader'
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer'
import { SocialIcons } from '@/components/ui/social-icons'
import { ProfileTerminal } from '@/components/ui/profile-terminal'
import { TechStack } from '@/components/ui/tech-stack'
import '@fontsource-variable/manrope'
import './index.css'

injectSpeedInsights()
inject()

const projects=[
  {number:'01',title:'Sarang.md',description:'An IB Mathematics AA study space with lessons and practice questions.',url:'https://sarang-md.vercel.app/',category:'LEARNING'},
  {number:'02',title:'LM Subs',description:'Synchronized captions for Google NotebookLM Video Overviews.',url:'https://lm-subs.vercel.app/',category:'ACCESSIBILITY'},
  {number:'03',title:'Road to CS336',description:'My self-study roadmap for learning about language models.',url:'https://sarang-cmd.github.io/road-to-cs336/',category:'AI / ML'},
  {number:'04',title:'Study With Sarang',description:'A focus studio for students with a timer and ambient sound.',url:'https://sarang-md.vercel.app/study-with-sarang/',category:'FOCUS'},
]
const columns=[
  {title:'Explore',links:[{label:'Projects',href:'#projects'},{label:'GitHub',href:'https://github.com/sarang-cmd'},{label:'Ask me anything',href:'https://github.com/sarang-cmd/sarang-cmd/issues'}]},
  {title:'Connect',links:[{label:'LinkedIn',href:'https://linkedin.com/in/sarang-batra'},{label:'Instagram',href:'https://instagram.com/sarangde.v'},{label:'Email',href:'mailto:sarang.cmd@gmail.com'}]},
]
function App(){
  const [loading,setLoading]=useState(true)
  const done=useCallback(()=>setLoading(false),[])
  return <>
    {loading&&<BrutalistDeckLoader onComplete={done}/>}
    <div inert={loading}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header" id="top"><div className="shell header-inner"><a href="#top" className="logo"><img className="logo-square" src="/sarang-logo.svg" alt="" width="38" height="38"/><span>SARANG BATRA<span className="logo-period">.</span></span></a><nav className="header-nav" aria-label="Main navigation"><a href="#projects">Projects</a><a href="#connect">Connect</a><a className="header-contact" href="mailto:sarang.cmd@gmail.com">Say hello <ArrowUpRight size={15}/></a></nav></div></header>
      <main id="main" className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy"><div className="eyebrow"><span className="status-square"/> PERSONAL SITE / IN PROGRESS <span className="eyebrow-number">01</span></div><h1 id="hero-title">Hi, I’m<br/><span className="name-underline">Sarang.</span></h1><p className="hero-description">Aspiring CS student and agentic engineer. I build tools for learning, focus, and the things I’m curious about.</p><div className="hero-actions"><a className="button button-dark" href="https://github.com/sarang-cmd"><Github size={18}/> Explore my GitHub <ArrowUpRight size={16}/></a><a className="button button-outline" href="#connect">Let’s connect <ArrowDown size={16}/></a></div></div>
          <div className="hero-right"><div className="construction-card"><div className="construction-top"><span>PLEASE EXCUSE THE MESS</span><span>✳</span></div><div className="construction-inner"><div className="construction-small">THIS SITE IS</div><div className="stripe-wrap"><div className="stripe-label">UNDER<br/>CONSTRUCTION<span>.</span></div></div><p>A new home for my projects is in the works. Have a look around in the meantime.</p></div><div className="construction-bottom"><span>STATUS: BUILDING</span><span>SB / 001</span></div></div></div>
        </section>
        <section className="terminal-section" aria-labelledby="terminal-title"><div className="section-head"><div><div className="section-kicker"><span>01</span> A LITTLE ABOUT ME</div><h2 id="terminal-title">A quick introduction<span>.</span></h2></div></div><ProfileTerminal enabled={!loading}/></section>
        <section className="connect-section" id="connect" aria-labelledby="connect-title"><div className="section-head"><div><div className="section-kicker"><span>02</span> FIND ME ELSEWHERE</div><h2 id="connect-title">Connect with me<span>.</span></h2></div></div><SocialIcons/></section>
        <section className="projects-section" id="projects" aria-labelledby="projects-title"><div className="section-head"><div><div className="section-kicker"><span>03</span> SELECTED PROJECTS</div><h2 id="projects-title">Stuff I’m building<span>.</span></h2></div></div><div className="project-grid">{projects.map(p=><a className="project-card" href={p.url} key={p.title}><div className="project-top"><span>{p.number} / {p.category}</span><ArrowUpRight size={21}/></div><div><h3>{p.title}</h3><p>{p.description}</p></div><span className="project-link">VIEW PROJECT ↗</span></a>)}</div></section>
        <div className="bottom-row">
          <section className="fun-fact" aria-labelledby="fact-title"><div className="fact-icon"><Code2 size={25}/></div><div className="fact-copy"><div className="mini-label">A LITTLE FUN FACT</div><h2 id="fact-title">I started coding when I was <strong>7 years old.</strong></h2><p className="fact-detail">Today, I’m learning deep learning and building tools to help students study and focus.</p></div><span className="fact-number" aria-hidden="true">07<span>.</span></span></section>
          <TechStack/>
          <section className="ask" aria-labelledby="ask-title"><div><div className="mini-label">HAVE A QUESTION?</div><h2 id="ask-title">Ask me anything.</h2><p>Projects, ideas, or something else. My GitHub issues are open.</p></div><a href="https://github.com/sarang-cmd/sarang-cmd/issues" className="button button-dark"><MessageCircle size={18}/> Ask a question <ArrowUpRight size={16}/></a></section>
        </div>
      </main>
      <HalftoneWordmarkFooter wordmark="sarang" label="SARANG BATRA" meta="PERSONAL SITE / IN PROGRESS" columns={columns} preset="paper" palette={{background:'#171717',ink:'#f4f0e5',warm:'#f3ce37'}} dotGap={6} crop={0} grain={.2} monoFamily='Manrope Variable, sans-serif' fontFamily='Manrope Variable, sans-serif' height="auto"/>
    </div>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
