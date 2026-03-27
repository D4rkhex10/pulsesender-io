interface TerminalProps {
  content: string;
  height?: string;
}

export function Terminal({ content, height = '256px' }: TerminalProps) {
  return (
    <div className="terminal" style={{ height }}>
      <pre>{content || 'No output yet.'}</pre>
    </div>
  );
}
