#!/usr/bin/env node
/**
 * simple-build.mjs — Simplified build script
 */

import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const VERSION = '2.1.88'

// Run prepare-src first
console.log('🔧 Running prepare-src...')
execSync('node scripts/prepare-src.mjs', { cwd: ROOT, stdio: 'inherit' })

// Create a simple entry point
const entryContent = `#!/usr/bin/env node
// Claude Code v${VERSION} — built from source
// Copyright (c) Anthropic PBC. All rights reserved.
import './src/entrypoints/cli.tsx'
`

import { writeFileSync } from 'node:fs'
writeFileSync(join(ROOT, 'entry.ts'), entryContent)

console.log('🔨 Building with esbuild...')

try {
  execSync([
    'npx esbuild',
    'entry.ts',
    '--bundle',
    '--platform=node',
    '--target=node18',
    '--format=esm',
    '--outfile=dist/cli.js',
    `--banner:js=$'#!/usr/bin/env node\n// Claude Code v${VERSION} (built from source)\n// Copyright (c) Anthropic PBC. All rights reserved.\n'`,
    '--packages=external',
    '--external:bun:*',
    '--allow-overwrite',
    '--log-level=info',
  ].join(' '), {
    cwd: ROOT,
    stdio: 'inherit',
  })
  console.log('\n✅ Build succeeded!')
  console.log('\n   Usage:  node dist/cli.js --version')
  console.log('           node dist/cli.js -p "Hello"')
} catch (e) {
  console.error('\n❌ Build failed.')
  process.exit(1)
}
