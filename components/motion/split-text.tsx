import { Fragment } from 'react';

export function SplitText({ text, className = '' }: { text: string; className?: string }) {
  return <span className={`split-text ${className}`} aria-label={text} role="text">{text.split(' ').map((word, wordIndex) => <Fragment key={wordIndex}>{wordIndex > 0 && ' '}<span className="split-word" aria-hidden="true">{Array.from(word).map((letter, index) => <span className="split-char" key={index}>{letter}</span>)}</span></Fragment>)}</span>;
}
