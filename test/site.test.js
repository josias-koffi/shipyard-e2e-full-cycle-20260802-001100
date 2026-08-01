import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

test('the Pages app keeps the deployment marker', () => {
  assert.match(readFileSync('public/index.html', 'utf8'), /shipyard-e2e-full-cycle-/);
});

test('the dependency evidence matches its manifest', () => {
  const manifest = JSON.parse(readFileSync('vendor/status-widget/package.json', 'utf8'));
  assert.equal(readFileSync('public/dependency-version.txt', 'utf8').trim(), manifest.version);
});
