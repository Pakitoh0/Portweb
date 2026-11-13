// Valida que los mensajes de commit siguen Conventional Commits (los usa release-please
// para versionar y generar el changelog).
//   Hook local:  node tools/commit-msg.mjs <fichero-del-mensaje>
//   CI (PR):     node tools/commit-msg.mjs --range <base>..<head>
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];
const PATTERN = new RegExp(`^(${TYPES.join('|')})(\\([\\w./-]+\\))?!?: \\S.{0,99}$`);
// Mensajes que genera git o GitHub y no hay que validar
const EXEMPT = /^(Merge |Revert "|fixup! |squash! )/;

function check(subject) {
  return EXEMPT.test(subject) || PATTERN.test(subject);
}

const help = `Formato: <tipo>(<ámbito opcional>): <descripción de 1-100 caracteres>
Tipos: ${TYPES.join(', ')}
Ejemplo: feat(terminal): añadir el comando history`;

const args = process.argv.slice(2);
let subjects;
if (args[0] === '--range') {
  const out = execFileSync('git', ['log', '--format=%h %s', args[1]], { encoding: 'utf8' });
  subjects = out
    .split('\n')
    .filter(Boolean)
    .map((l) => ({ id: l.slice(0, l.indexOf(' ')), s: l.slice(l.indexOf(' ') + 1) }));
} else if (args[0]) {
  const first = readFileSync(args[0], 'utf8')
    .split('\n')
    .find((l) => l.trim() && !l.startsWith('#'));
  subjects = [{ id: 'nuevo commit', s: (first ?? '').trim() }];
} else {
  console.error('Uso: node tools/commit-msg.mjs <fichero> | --range <base>..<head>');
  process.exit(2);
}

const bad = subjects.filter(({ s }) => !check(s));
if (bad.length) {
  console.error(
    `✗ Commits que no siguen Conventional Commits:\n${bad.map(({ id, s }) => `  - ${id}: "${s}"`).join('\n')}\n\n${help}`,
  );
  process.exit(1);
}
console.log(`✓ ${subjects.length} mensaje(s) de commit válidos`);
