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

test('status.json is valid JSON reporting ok status', () => {
  const status = JSON.parse(readFileSync('public/status.json', 'utf8'));
  assert.deepEqual(status, { status: 'ok' });
});

test('the Pages app links to the machine-readable status page', () => {
  const html = readFileSync('public/index.html', 'utf8');
  assert.match(html, /<a[^>]+href="status\.json"[^>]*>Service status<\/a>/);
});
