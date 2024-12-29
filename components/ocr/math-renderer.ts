import katex from 'katex';

export function renderMathContent(content: string): string {
  const mathRegex = /\$(.*?)\$/g;
  let lastIndex = 0;
  let result = '';

  content.replace(mathRegex, (match, latex, offset) => {
    // Add text content before the math
    result += content.slice(lastIndex, offset);

    // Render math content
    try {
      result += katex.renderToString(latex, { displayMode: false });
    } catch (error) {
      console.error('Error rendering math:', error);
      result += match; // Fallback to original latex if rendering fails
    }

    lastIndex = offset + match.length;
    return match;
  });

  // Add any remaining text content
  result += content.slice(lastIndex);

  return result;
}
