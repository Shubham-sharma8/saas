import katex from 'katex'

export function renderMathContent(content: string): string {
  try {
    if (!content) return ''
    
    // Clean up the LaTeX content
    const cleanContent = content
      .replace(/\\begin{array}{ll}/g, '\\begin{array}{l}')
      .replace(/\\\\$/gm, '\\\\[5pt]')
    
    return katex.renderToString(cleanContent, {
      throwOnError: false,
      displayMode: true,
      fleqn: false,
      leqno: false,
      strict: false,
      trust: true,
      macros: {
        "\\f": "f(#1)",
        "\\text": "\\textrm{#1}"
      }
    })
  } catch (error) {
    console.error('Error in renderMathContent:', error)
    return `<span class="text-red-500">Error rendering mathematical content</span>`
  }
}

