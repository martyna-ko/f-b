import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  /** Value passed to onChange, e.g. "kids". */
  value: string;
  /** Visible label. */
  label: string;
}

export interface TabsProps {
  /** Accessible name of the tab list, e.g. "Show classes for". */
  label: string;
  /** The tabs. */
  items: TabItem[];
  /** Currently selected value (controlled). */
  value: string;
  /** Called with the new value when the user selects a tab. */
  onChange: (value: string) => void;
  /** Content of the selected tab. */
  children: ReactNode;
}

/**
 * Tabs — switch between views of the same content, e.g. the schedule for kids, family or adults.
 * Follows the WAI-ARIA tabs pattern: Tab moves into the list, arrow keys move between tabs,
 * Home/End jump to first/last, selection follows focus.
 */
export function Tabs({ label, items, value, onChange, children }: TabsProps) {
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    items.findIndex((i) => i.value === value),
  );

  const move = (index: number) => {
    const next = (index + items.length) % items.length;
    refs.current[next]?.focus();
    onChange(items[next].value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => move(selectedIndex + 1),
      ArrowLeft: () => move(selectedIndex - 1),
      Home: () => move(0),
      End: () => move(items.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.list}>
        {items.map((item, i) => {
          const selected = i === selectedIndex;
          return (
            <button
              key={item.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => onChange(item.value)}
              onKeyDown={onKeyDown}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${items[selectedIndex]?.value}`}
        className={styles.panel}
      >
        {children}
      </div>
    </div>
  );
}
