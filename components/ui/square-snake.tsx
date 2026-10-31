"use client"

import { motion, useReducedMotion } from 'framer-motion'

export function SquareSnake({ size = 40 }: { size?: number }) {
  const reduced = useReducedMotion()
  return <div className="grid grid-cols-3 gap-1" style={{ width: size, height: size }} aria-hidden="true">
    {[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]].map(([x,y], i) =>
      <motion.div key={i} className="bg-zinc-800 rounded-sm w-full h-full"
        animate={reduced ? { opacity: 1 } : { opacity: [0.1, 1, 0.1] }}
        transition={reduced ? { duration: 0 } : { duration: 1.5, repeat: Infinity, delay: (x+y)*0.15, ease: 'easeInOut' }}/>
    )}
  </div>
}
export default SquareSnake
