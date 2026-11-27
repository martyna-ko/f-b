// Deterministic content checks. Run: npm run content:check (part of npm run check).
// 1. content/studio.json matches content/schema/studio.schema.json
// 2. Data makes sense: unique ids, schedule points to real class types, start < end
// 3. content/en.json and content/pl.json have exactly the same keys and list lengths
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const errors = [];

// 1. Schema
const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);
ajv.addFormat('email', /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
ajv.addFormat('uri', /^https?:\/\/\S+$/);
const studio = read('content/studio.json');
const validate = ajv.compile(read('content/schema/studio.schema.json'));
if (!validate(studio)) {
  for (const e of validate.errors) errors.push(`studio.json${e.instancePath || ''}: ${e.message}`);
}

// 2. Integrity
const unique = (list, what) => {
  const seen = new Set();
  for (const { id } of list) {
    if (seen.has(id)) errors.push(`duplicate ${what} id: ${id}`);
    seen.add(id);
  }
};
unique(studio.classTypes ?? [], 'class type');
unique(studio.schedule ?? [], 'schedule');
unique(studio.prices ?? [], 'price');
const typeIds = new Set((studio.classTypes ?? []).map((c) => c.id));
for (const s of studio.schedule ?? []) {
  if (!typeIds.has(s.classTypeId))
    errors.push(`schedule ${s.id}: unknown classTypeId "${s.classTypeId}"`);
  if (s.start >= s.end)
    errors.push(`schedule ${s.id}: start ${s.start} is not before end ${s.end}`);
}

// 3. Translation parity
const compare = (a, b, path) => {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return errors.push(`${path}: list in en, not in pl`);
    if (a.length !== b.length) errors.push(`${path}: ${a.length} items in en, ${b.length} in pl`);
    a.forEach((v, i) => b[i] !== undefined && compare(v, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) {
      if (!(k in b)) errors.push(`${path}.${k}: missing in pl.json`);
      else compare(a[k], b[k], `${path}.${k}`);
    }
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`${path}.${k}: missing in en.json`);
  } else if (typeof b !== 'string' || !b.trim()) {
    errors.push(`${path}: empty or not text in pl.json`);
  }
};
compare(read('content/en.json'), read('content/pl.json'), 'content');

if (errors.length) {
  console.error(`✘ ${errors.length} content problem(s):\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(
  `✔ Content valid: ${studio.classTypes.length} class types, ${studio.schedule.length} weekly classes, ${studio.prices.length} prices; en/pl texts match.`,
);
