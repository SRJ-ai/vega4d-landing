import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Check, Copy } from '@phosphor-icons/react';
import { SectionHead } from './primitives/SectionHead';
import { integration } from '../data/site';

/**
 * Loader snippets in three languages.
 *
 * anime.js staggers the code lines in when the tab changes, which shows the visitor that
 * the panel swapped rather than leaving them to notice a silent replacement.
 */
export function Integration() {
  const [active, setActive] = useState(integration.tabs[0].key);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const reduce = useReducedMotion();

  const tab = integration.tabs.find((t) => t.key === active) ?? integration.tabs[0];

  useEffect(() => {
    const root = codeRef.current;
    if (!root || reduce) return undefined;
    const lines = root.querySelectorAll('[data-code-line]');
    if (!lines.length) return undefined;

    const animation = animate(lines, {
      opacity: [0, 1],
      translateX: [-6, 0],
      duration: 420,
      delay: stagger(28),
      ease: 'outQuad',
    });

    return () => animation?.revert?.();
  }, [active, reduce]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked. Selecting the block still works, so stay quiet.
      setCopied(false);
    }
  };

  return (
    <section className="u-rule">
      <div className="u-shell grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-5">
          <SectionHead title={integration.heading} body={integration.body} note={integration.note} />
        </div>

        <div className="lg:col-span-7">
          <div className="u-bezel bg-[var(--ink-100)]">
            <div className="flex items-stretch justify-between border-b border-[var(--line-100)]">
              <div role="tablist" aria-label="Client language" className="flex">
                {integration.tabs.map((item) => {
                  const on = item.key === active;
                  return (
                    <button
                      key={item.key}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      onClick={() => setActive(item.key)}
                      className={`u-mono border-r border-[var(--line-100)] px-4 py-3 text-[11px] tracking-[0.12em] uppercase transition-colors ${
                        on
                          ? 'bg-[var(--ink-300)] text-[var(--signal)]'
                          : 'text-[var(--text-300)] hover:text-[var(--text-100)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={copy}
                className="u-mono flex items-center gap-2 px-4 text-[11px] tracking-[0.12em] text-[var(--text-200)] uppercase transition-colors hover:text-[var(--text-100)]"
              >
                {copied ? (
                  <Check size={13} weight="bold" color="var(--live)" />
                ) : (
                  <Copy size={13} weight="regular" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre
              ref={codeRef}
              className="u-mono overflow-x-auto p-5 text-[12.5px] leading-[1.85] sm:p-6 sm:text-[13px]"
            >
              <code>
                {tab.code.split('\n').map((line, i) => (
                  <span key={`${tab.key}-${i}`} data-code-line className="block">
                    {tokenize(line)}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  A deliberately small highlighter: strings, comments, numbers, keywords, and call names.
  Anything richer would mean shipping a syntax-highlighting dependency for six snippets.
*/
const PATTERN =
  /("[^"]*"|'[^']*'|#[^\n]*|\/\/[^\n]*|\b(?:import|from|for|await|const|async|in|as|batch|of)\b|\$?\b[A-Z][A-Za-z0-9_]*\b|\b\d+(?:\.\d+)?\b|\$[A-Z_]+)/g;

const COLORS = {
  string: 'var(--signal)',
  comment: 'var(--text-300)',
  keyword: 'var(--live)',
  number: 'var(--text-100)',
  name: 'var(--text-100)',
};

function tokenize(line) {
  const parts = line.split(PATTERN).filter((part) => part !== undefined && part !== '');

  return parts.map((part, i) => {
    const key = `${i}-${part.slice(0, 6)}`;
    let kind = null;

    if (/^["']/.test(part)) kind = 'string';
    else if (/^(#|\/\/)/.test(part)) kind = 'comment';
    else if (/^(import|from|for|await|const|async|in|as|of)$/.test(part)) kind = 'keyword';
    else if (/^\$?[A-Z][A-Za-z0-9_]*$/.test(part) || /^\$[A-Z_]+$/.test(part)) kind = 'name';
    else if (/^\d/.test(part)) kind = 'number';

    if (!kind) {
      return (
        <span key={key} style={{ color: 'var(--text-200)' }}>
          {part}
        </span>
      );
    }

    return (
      <span key={key} style={{ color: COLORS[kind] }}>
        {part}
      </span>
    );
  });
}
