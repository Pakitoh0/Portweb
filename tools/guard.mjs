// Guardián del repositorio: falla (exit 1) si se versiona algo que no debe o si se
// debilitan las protecciones del repo. Se ejecuta en el CI y en local con `pnpm check:guard`.
// Sin dependencias: solo Node y git.
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, existsSync } from 'node:fs';

const errors = [];
const fail = (msg) => errors.push(msg);

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean);
const tracked = git('ls-files');

// ── 1. Nada versionado que .gitignore diga que se ignora ──────────────────────
for (const file of git('ls-files', '-ci', '--exclude-standard')) {
  fail(`${file}: está versionado pero .gitignore lo ignora. Sácalo con "git rm --cached ${file}".`);
}

// ── 2. Lista negra fija (no depende de .gitignore: aunque alguien lo edite, salta) ──
const forbidden = [
  [/(^|\/)\.env(\.(?!example$)[^/]+)?$/, 'variables de entorno'],
  [/\.(pem|key|crt|cer|p12|pfx|jks|keystore|gpg|asc|ppk)$/i, 'clave o certificado'],
  [/(^|\/)id_(rsa|ed25519|ecdsa|dsa)(\.pub)?$/, 'clave SSH'],
  [/(^|\/)(\.npmrc|\.netrc|\.htpasswd)$/, 'fichero con credenciales'],
  [/(^|\/)(credentials|secrets?|service-account)[^/]*\.json$/i, 'credenciales en JSON'],
  [/\.(sql|sqlite3?|db|dump|bak|backup)$/i, 'base de datos o copia de seguridad'],
  [
    /(^|\/)(node_modules|dist|\.astro|\.lighthouseci|coverage|playwright-report)\//,
    'dependencias o artefactos de build',
  ],
  [/(^|\/)(package-lock\.json|yarn\.lock|bun\.lockb?)$/, 'lockfile de otro gestor (usamos pnpm)'],
  [/(^|\/)(\.claude|\.codex|\.cursor|\.idea)\//, 'configuración local de agentes o editores'],
  [/\.log$/i, 'log'],
];
for (const file of tracked) {
  for (const [pattern, what] of forbidden) {
    if (pattern.test(file)) fail(`${file}: ${what}; no debe estar en el repositorio.`);
  }
}

// ── 3. Estructura: en la raíz solo lo previsto ────────────────────────────────
const allowedRoot = new Set([
  '.github',
  'config',
  'ops',
  'public',
  'src',
  'tests',
  'tools',
  '.gitignore',
  'README.md',
  'CHANGELOG.md',
  'astro.config.mjs',
  'lefthook.yml',
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.json',
]);
for (const root of new Set(tracked.map((f) => f.split('/')[0]))) {
  if (!allowedRoot.has(root)) {
    fail(
      `${root}: no está previsto en la raíz. Muévelo a config/, tools/, ops/ o src/, o añádelo a allowedRoot en tools/guard.mjs si es intencionado.`,
    );
  }
}

// ── 4. Ficheros críticos que no pueden desaparecer ────────────────────────────
const required = [
  'package.json',
  'pnpm-lock.yaml',
  'astro.config.mjs',
  'tsconfig.json',
  '.gitignore',
  '.github/workflows/deploy.yml',
  '.github/workflows/release.yml',
  '.github/workflows/scorecard.yml',
  '.github/dependabot.yml',
  '.github/SECURITY.md',
  'ops/maintenance.html',
  'tools/check-links.mjs',
  'tools/guard.mjs',
  'tools/commit-msg.mjs',
  'tools/serve.mjs',
  'tools/themes/palettes.mjs',
  'tools/themes/generate.mjs',
  'tools/themes/check.mjs',
  'src/styles/themes.css',
  'lefthook.yml',
  'tests/e2e/portweb.spec.ts',
];
for (const file of required) {
  if (!tracked.includes(file)) fail(`${file}: fichero crítico ausente o sin versionar.`);
}

// ── 5. Tamaño máximo (evita binarios enormes o volcados por error) ────────────
const MAX_KB = 1024;
for (const file of tracked) {
  if (!existsSync(file)) continue; // borrado en el árbol de trabajo
  const kb = statSync(file).size / 1024;
  if (kb > MAX_KB) fail(`${file}: ocupa ${Math.round(kb)} KB (máximo ${MAX_KB} KB).`);
}

// ── 6. Contenido: claves privadas y tokens con formato conocido ───────────────
const secretPatterns = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'clave privada'],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}\b/, 'token de GitHub'],
  [/\bgithub_pat_[A-Za-z0-9_]{60,}\b/, 'token de GitHub'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'clave de AWS'],
  [/\bsk-(ant-|proj-)?[A-Za-z0-9_-]{32,}\b/, 'clave de API (OpenAI/Anthropic)'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, 'token de Slack'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'clave de Google API'],
];
const textExt = /\.(astro|ts|mjs|js|json|ya?ml|md|html|css|txt|svg)$|(^|\/)\.gitignore$/;
for (const file of tracked) {
  if (!textExt.test(file) || !existsSync(file) || file === 'pnpm-lock.yaml') continue;
  const text = readFileSync(file, 'utf8');
  for (const [pattern, what] of secretPatterns) {
    if (pattern.test(text)) fail(`${file}: parece contener: ${what}.`);
  }
}

// ── 7. .gitignore conserva las entradas de seguridad mínimas ──────────────────
const ignore = readFileSync('.gitignore', 'utf8')
  .split('\n')
  .map((l) => l.trim());
for (const entry of [
  'node_modules/',
  'dist/',
  '.env',
  '.env.*',
  '*.pem',
  '*.key',
  '.claude/',
  '.npmrc',
]) {
  if (!ignore.includes(entry)) fail(`.gitignore: falta la entrada de seguridad "${entry}".`);
}

// ── 8. Endurecimiento de los workflows ────────────────────────────────────────
for (const wf of tracked.filter((f) => /^\.github\/workflows\/.+\.ya?ml$/.test(f))) {
  const yml = readFileSync(wf, 'utf8');
  if (!/^permissions:\s*\{\}\s*$/m.test(yml)) {
    fail(`${wf}: debe declarar "permissions: {}" a nivel global (permisos mínimos).`);
  }
  if (/pull_request_target/.test(yml)) {
    fail(`${wf}: usa pull_request_target, que ejecuta código de forks con permisos de escritura.`);
  }
  for (const [, ref] of yml.matchAll(/^\s*-?\s*uses:\s*([^\s#]+)/gm)) {
    if (ref.startsWith('./') || ref.startsWith('docker://')) continue;
    if (!/@[0-9a-f]{40}$/.test(ref))
      fail(`${wf}: "${ref}" no está fijada a un SHA de 40 caracteres.`);
  }
  const checkouts = (yml.match(/uses:\s*actions\/checkout@/g) ?? []).length;
  const noCreds = (yml.match(/persist-credentials:\s*false/g) ?? []).length;
  if (checkouts !== noCreds) {
    fail(
      `${wf}: cada actions/checkout debe llevar "persist-credentials: false" (${noCreds}/${checkouts}).`,
    );
  }
}

// ── 9. Gestor de paquetes ─────────────────────────────────────────────────────
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (!String(pkg.packageManager ?? '').startsWith('pnpm@')) {
  fail('package.json: "packageManager" debe ser pnpm.');
}

// ── Resultado ─────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`✗ Guardián: ${errors.length} problema(s)\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ Guardián: ${tracked.length} ficheros revisados, todo en orden`);
