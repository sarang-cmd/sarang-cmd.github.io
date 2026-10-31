"use client"

import * as React from "react"

export interface HalftonePalette { background: string; ink: string; warm: string }
export type HalftonePreset = "night" | "paper" | "ember" | "cobalt"
export interface FooterLink { label: string; href: string }
export interface FooterColumn { title: string; links: FooterLink[] }
export interface HalftoneWordmarkFooterProps {
  wordmark?: string; label?: string; meta?: string; columns?: FooterColumn[]; backToTop?: boolean
  preset?: HalftonePreset; palette?: Partial<HalftonePalette>; dotGap?: number; radius?: number
  crop?: number; grain?: number; interactive?: boolean; fontFamily?: string; fontWeight?: number
  monoFamily?: string; height?: string; className?: string
}
const PRESETS: Record<HalftonePreset, HalftonePalette> = {
  night: {background:"#0c0c0b",ink:"#e9e4da",warm:"#e9762b"}, paper:{background:"#efebe3",ink:"#17150f",warm:"#c2361c"},
  ember:{background:"#160a06",ink:"#f2c48c",warm:"#ff5a1f"}, cobalt:{background:"#0d1b4d",ink:"#dfe7ff",warm:"#ffcd3c"}
}
export function hwfHex(hex: string) { const m=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex||"").trim()); if(!m)return null; const h=m[1].length===3?m[1].split("").map(c=>c+c).join(""):m[1]; return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)] }
export function hwfRadius(coverage:number,gap:number){return Math.sqrt(Math.max(0,Math.min(1,coverage)))*gap*.56}
export function hwfStep(x:number,y:number,vx:number,vy:number,hx:number,hy:number,px:number,py:number,r:number){const dx=x-px,dy=y-py,d2=dx*dx+dy*dy;if(r>0&&d2<r*r){const d=Math.sqrt(d2)+.001,f=(1-d/r)*2.6;vx+=dx/d*f;vy+=dy/d*f}vx=(vx+(hx-x)*.05)*.84;vy=(vy+(hy-y)*.05)*.84;return[x+vx,y+vy,vx,vy]}
export function hwfWarmth(x:number,y:number,hx:number,hy:number,span:number){return span>0?Math.min(1,Math.hypot(x-hx,y-hy)/span):0}
export function hwfFitSize(measured:number,width:number){return measured>0?width/measured*100:0}

export default function HalftoneWordmarkFooter({wordmark="sarang",label="Sarang Batra",meta="Personal site / in progress",columns=[],backToTop=true,preset="paper",palette,dotGap=6,radius=80,crop=.15,grain=.1,interactive=true,fontFamily='Arial, Helvetica, sans-serif',fontWeight=800,monoFamily='ui-monospace, SFMono-Regular, Menlo, monospace',height="500px",className=""}:HalftoneWordmarkFooterProps){
  const colors={...PRESETS[preset],...palette}
  const rootRef=React.useRef<HTMLDivElement>(null), canvasRef=React.useRef<HTMLCanvasElement>(null)
  const key=[wordmark,dotGap,crop,grain,fontFamily,fontWeight,colors.background,colors.ink,colors.warm,radius,interactive,height].join('|')
  React.useEffect(()=>{
    const root=rootRef.current, canvas=canvasRef.current
    if(!root||!canvas)return
    const context=canvas.getContext('2d'); if(!context)return
    const ctx=context
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ink=hwfHex(colors.ink)||[0,0,0],warm=hwfHex(colors.warm)||[255,0,0]
    let w=0,h=0,dpr=1,frame=0,px=-1e5,py=-1e5,visible=true
    let ring={x:0,y:0,t:-1}; let dots=new Float32Array(0); let count=0
    let grainTile:HTMLCanvasElement|null=null
    const layout=()=>{
      const rect=root.getBoundingClientRect();w=Math.max(1,Math.round(rect.width));dpr=Math.min(window.devicePixelRatio||1,2)
      const mask=document.createElement('canvas')
      const m=mask.getContext('2d',{willReadFrequently:true});if(!m)return
      m.font=`${fontWeight} 100px ${fontFamily}`
      const fit=hwfFitSize(m.measureText(wordmark||' ').width,w*.98)
      m.font=`${fontWeight} ${fit}px ${fontFamily}`
      const box=m.measureText(wordmark||' '),cap=box.actualBoundingBoxAscent||fit*.72,descent=box.actualBoundingBoxDescent||0
      const cropAmount=Math.max(0,Math.min(.6,crop))
      const bottomPadding=height==='auto'?Math.max(4,Math.ceil(dotGap)):0
      // Size the canvas around the actual glyphs so the space above the word stays small.
      h=height==='auto'?Math.max(1,Math.ceil(cap+descent-cap*cropAmount+Math.max(12,Math.min(24,w*.015))+bottomPadding)):Math.max(1,Math.round(rect.height))
      if(height==='auto'&&root.style.height!==`${h}px`)root.style.height=`${h}px`
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)
      mask.width=w;mask.height=h
      m.font=`${fontWeight} ${fit}px ${fontFamily}`;m.fillStyle='#000';m.textBaseline='alphabetic'
      m.fillText(wordmark,(w-box.width)/2,h-bottomPadding-descent+cap*cropAmount)
      const data=m.getImageData(0,0,w,h).data,gap=Math.max(3,dotGap),tmp:number[]=[]
      for(let gy=0;gy<Math.ceil(h/gap);gy++)for(let gx=0;gx<Math.ceil(w/gap);gx++){
        let sum=0;for(let sy=0;sy<3;sy++)for(let sx=0;sx<3;sx++){const x=Math.min(w-1,Math.floor(gx*gap+(sx+.5)*gap/3)),y=Math.min(h-1,Math.floor(gy*gap+(sy+.5)*gap/3));sum+=data[(y*w+x)*4+3]}
        const cov=sum/(9*255);if(cov<.06)continue;const x=gx*gap+gap/2,y=gy*gap+gap/2;tmp.push(x,y,0,0,x,y,hwfRadius(cov,gap))
      }
      dots=new Float32Array(tmp);count=tmp.length/7
      grainTile=document.createElement('canvas');grainTile.width=128;grainTile.height=128;const g=grainTile.getContext('2d')
      if(g){const image=g.createImageData(128,128);for(let i=0;i<image.data.length;i+=4){const v=Math.random()*255;image.data[i]=image.data[i+1]=image.data[i+2]=v;image.data[i+3]=Math.random()<.5?0:255}g.putImageData(image,0,0)}
    }
    const draw=(now:number)=>{
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=colors.background;ctx.fillRect(0,0,w,h)
      const age=ring.t<0?1e9:now-ring.t, ringR=age*.9;let moving=false
      for(let i=0;i<count;i++){const j=i*7,hx=dots[j+4],hy=dots[j+5];let x=dots[j],y=dots[j+1],vx=dots[j+2],vy=dots[j+3]
        if(!reduced){if(age<900){const dx=hx-ring.x,dy=hy-ring.y,d=Math.sqrt(dx*dx+dy*dy)+.001,band=1-Math.min(1,Math.abs(d-ringR)/26);if(band>0){const f=band*3.2*(1-age/900);vx+=dx/d*f;vy+=dy/d*f}}
          ;[x,y,vx,vy]=hwfStep(x,y,vx,vy,hx,hy,px,py,interactive?radius:0)
          if(Math.abs(vx)+Math.abs(vy)>.02||Math.abs(x-hx)+Math.abs(y-hy)>.05)moving=true;else{x=hx;y=hy;vx=0;vy=0}
          dots[j]=x;dots[j+1]=y;dots[j+2]=vx;dots[j+3]=vy
        }
        const k=hwfWarmth(x,y,hx,hy,28);ctx.fillStyle=k>.02?`rgb(${ink.map((v,i)=>Math.round(v+(warm[i]-v)*k)).join(',')})`:colors.ink
        ctx.beginPath();ctx.arc(x,y,dots[j+6],0,Math.PI*2);ctx.fill()
      }
      if(grainTile&&grain>0){ctx.globalAlpha=Math.min(1,grain)*.09;ctx.globalCompositeOperation='overlay';const pattern=ctx.createPattern(grainTile,'repeat');if(pattern){ctx.fillStyle=pattern;ctx.fillRect(0,0,w,h)}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
      return !reduced&&(moving||age<900||px>-1e4)
    }
    const loop=(t:number)=>{frame=0;if(visible&&draw(t))frame=requestAnimationFrame(loop)}
    const wake=()=>{if(!frame&&visible)frame=requestAnimationFrame(loop)}
    const local=(e:PointerEvent)=>{const b=canvas.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}
    const move=(e:PointerEvent)=>{if(!interactive||reduced)return;[px,py]=local(e);wake()}
    const leave=()=>{px=-1e5;py=-1e5;wake()}
    const down=(e:PointerEvent)=>{if(!interactive||reduced||(e.target as HTMLElement).closest('a,button'))return;const [x,y]=local(e);ring={x,y,t:performance.now()};wake()}
    layout();draw(performance.now());root.addEventListener('pointermove',move);root.addEventListener('pointerleave',leave);root.addEventListener('pointerdown',down)
    const ro=new ResizeObserver(()=>{layout();draw(performance.now());wake()});ro.observe(root)
    const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;if(visible)wake()});io.observe(root)
    let alive=true;document.fonts?.ready.then(()=>{if(alive){layout();wake()}})
    return()=>{alive=false;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();root.removeEventListener('pointermove',move);root.removeEventListener('pointerleave',leave);root.removeEventListener('pointerdown',down)}
  // key represents the values read by the canvas effect.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[key])
  return <footer className={'hwf-footer '+className} style={{'--hwf-bg':colors.background,'--hwf-ink':colors.ink,'--hwf-mono':monoFamily} as React.CSSProperties}>
    <div ref={rootRef} className="hwf-root" style={{height}}><canvas ref={canvasRef} aria-hidden="true"/><span className="hwf-sr">{wordmark}</span></div>
    <div className="hwf-details"><div className="hwf-top"><div className="hwf-brand"><strong>{label}</strong><span>{meta}</span></div>{columns.map(col=><nav className="hwf-col" key={col.title} aria-label={col.title}><h3>{col.title}</h3><ul>{col.links.map(link=><li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul></nav>)}</div>
    <div className="hwf-rule">{backToTop&&<button type="button" className="hwf-up" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}>Back to top ↑</button>}</div></div>
  </footer>
}
