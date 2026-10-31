"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

const cards=[{title:'HELLO.',tag:'01 / 03',color:'#f3ce37'},{title:'NICE TO MEET YOU.',tag:'02 / 03',color:'#bed8ff'},{title:'LET’S GO.',tag:'03 / 03',color:'#ef8b78'}]
export default function BrutalistDeckLoader({onComplete}:{onComplete:()=>void}){
  const [step,setStep]=useState(0)
  const reduce=useReducedMotion()
  useEffect(()=>{if(reduce){onComplete();return}const a=window.setTimeout(()=>setStep(1),1100),b=window.setTimeout(()=>setStep(2),2200),c=window.setTimeout(onComplete,3500);return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)}},[onComplete,reduce])
  return <div className="loader" role="status" aria-label="Opening the site"><div className="loader-wrap"><div className="loader-stack"><div className="loader-back back-one"/><div className="loader-back back-two"/><AnimatePresence mode="wait"><motion.div key={step} initial={reduce?false:{opacity:0,y:-14,rotate:-3}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,x:55,rotate:5}} transition={{duration:.24}} className="loader-card" style={{background:cards[step].color}}><div className="loader-head"><img className="loader-mark" src="/sarang-logo.svg" alt="" width="36" height="36"/><span>{cards[step].tag}</span></div><div className="loader-title"><RefreshCw size={23} aria-hidden="true"/><strong>{cards[step].title}</strong></div><div className="loader-bottom"><span>SARANG BATRA</span><span>PERSONAL SITE</span></div></motion.div></AnimatePresence></div><div className="loader-caption">A LITTLE INTRODUCTION</div><button type="button" className="loader-skip" onClick={onComplete}>Skip intro</button></div></div>
}
