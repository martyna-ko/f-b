/**
 * Renders design tokens straight from the generated src/tokens/tokens.json,
 * so Storybook documentation can never drift from the real values.
 * Used only in Storybook docs (src/docs/*.mdx).
 */
import tokens from '../tokens/tokens.json';
import styles from './TokenTables.module.css';

const all: Record<string, string | number> = tokens;
const pick = (prefix: string) => Object.entries(all).filter(([name]) => name.startsWith(prefix));

export interface TokenTableProps {
  /** Token name prefix, e.g. "color-brand" or "space". */
  prefix: string;
}

/** Colour swatches with token name and value. */
export function ColorTokens({ prefix }: TokenTableProps) {
  return (
    <div className={styles.grid}>
      {pick(prefix).map(([name, value]) => (
        <figure key={name} className={styles.swatch}>
          <div className={styles.chip} style={{ background: `var(--${name})` }} />
          <figcaption>
            <code>--{name}</code>
            <span className={styles.value}>{value}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Spacing, radius and other dimension tokens as a table with a visual bar. */
export function DimensionTokens({ prefix }: TokenTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Value</th>
          <th scope="col">Preview</th>
        </tr>
      </thead>
      <tbody>
        {pick(prefix).map(([name, value]) => (
          <tr key={name}>
            <td>
              <code>--{name}</code>
            </td>
            <td>{value}</td>
            <td aria-label={`Preview of ${value}`}>
              <div
                aria-hidden="true"
                className={styles.bar}
                style={{ width: `min(var(--${name}), 100%)` }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Typography scale: each size rendered in the heading or body font. */
export function TypeScale({ prefix }: TokenTableProps) {
  return (
    <div>
      {pick(prefix).map(([name, value]) => (
        <p
          key={name}
          className={styles.sample}
          style={{
            fontSize: `var(--${name})`,
            fontFamily: name.includes('heading')
              ? 'var(--font-role-heading)'
              : 'var(--font-role-body)',
          }}
        >
          Find Balans — {value} <code>--{name}</code>
        </p>
      ))}
    </div>
  );
}
