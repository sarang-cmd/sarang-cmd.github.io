const groups = [
  { name: 'Languages', items: [
    ['Python','py.svg','https://www.python.org/'], ['JavaScript','js.svg','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
    ['TypeScript','ts.svg','https://www.typescriptlang.org/'], ['HTML','html.svg','https://developer.mozilla.org/en-US/docs/Web/HTML'],
    ['CSS','css.svg','https://developer.mozilla.org/en-US/docs/Web/CSS'], ['C','c.svg','https://www.cprogramming.com/'],
    ['C++','cpp.svg','https://isocpp.org/'], ['C#','cs.svg','https://learn.microsoft.com/en-us/dotnet/csharp/'],
    ['Bash','bash.svg','https://www.gnu.org/software/bash/'], ['PHP','php.svg','https://www.php.net/'],
  ]},
  { name: 'Web & apps', items: [
    ['React','react.svg','https://react.dev/'], ['React Native','react.svg','https://reactnative.dev/'],
    ['Next.js','nextjs.svg','https://nextjs.org/'], ['Vue','vue.svg','https://vuejs.org/'],
    ['Vite','vite.svg','https://vite.dev/'], ['Tailwind','tailwind.svg','https://tailwindcss.com/'],
    ['Node.js','nodejs.svg','https://nodejs.org/'], ['Electron','electron.svg','https://www.electronjs.org/'],
    ['.NET','dotnet.svg','https://dotnet.microsoft.com/'], ['Firebase','firebase.svg','https://firebase.google.com/'],
    ['Git','git.svg','https://git-scm.com/'], ['Google Cloud','gcp.svg','https://cloud.google.com/'],
  ]},
  { name: 'AI & creative tools', items: [
    ['PyTorch','pytorch.svg','https://pytorch.org/'], ['TensorFlow','tensorflow.svg','https://www.tensorflow.org/'],
    ['ChatGPT','openai-icon_rounded.png','https://chatgpt.com/'], ['Claude','claude-ai-icon.png','https://claude.ai/'],
    ['Claude Code','claudecode-color.png','https://claude.ai/download'], ['Google Gemini','google-gemini-icon.png','https://gemini.google.com/'],
    ['Google AI Studio','google-ai-studio-icon_rounded.png','https://aistudio.google.com/'], ['DeepSeek','deepseek-logo-icon.png','https://www.deepseek.com/'],
    ['Ollama','ollama-icon_rounded.png','https://ollama.com/'], ['Perplexity','perplexity-ai-icon.png','https://www.perplexity.ai/'],
    ['Figma','figma.svg','https://www.figma.com/'], ['Blender','blender.svg','https://www.blender.org/'],
    ['Arduino','arduino.svg','https://www.arduino.cc/'], ['Unity','unity.svg','https://unity.com/'],
    ['Photoshop','photoshop.svg','https://www.adobe.com/products/photoshop.html'], ['Illustrator','illustrator.svg','https://www.adobe.com/products/illustrator.html'],
  ]},
] as const

export function TechStack() {
  return <section className="tech-stack" id="tech-stack" aria-labelledby="tech-title">
    <div className="section-head"><div><div className="section-kicker"><span>04</span> MY TOOLKIT</div><h2 id="tech-title">My tech stack<span>.</span></h2></div></div>
    <div className="tech-groups">{groups.map((group, index) => <div className="tech-group" key={group.name}>
      <div className="tech-group-head"><h3>{group.name}</h3><span aria-hidden="true">0{index + 1}</span></div>
      <ul className="tech-grid">{group.items.map(([name, icon, href]) => <li key={name}>
        <a className="tech-item" href={href} target="_blank" rel="noopener noreferrer">
          <span className="tech-icon"><img src={'/tech-icons/' + icon} alt="" width="40" height="40" loading="eager" decoding="async"/></span><span>{name}</span>
        </a>
      </li>)}</ul>
    </div>)}</div>
  </section>
}
