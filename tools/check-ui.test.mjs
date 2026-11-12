import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const checker = fileURLToPath(new URL('./check-ui.mjs', import.meta.url));
const repo = fileURLToPath(new URL('../', import.meta.url));

function run(args, cwd = repo) {
  const result = spawnSync(process.execPath, [checker, ...args], { cwd, encoding: 'utf8' });
  assert.ifError(result.error);
  return result;
}

test('examples keep their expected exit codes and counts', () => {
  const after = run(['examples/after']);
  assert.equal(after.status, 0);
  assert.match(after.stdout, /1ファイルを確認し、0件/);
  const before = run(['examples/before']);
  assert.equal(before.status, 1);
  assert.match(before.stdout, /48件の指摘/);
});

test('missing arguments return usage exit code', () => {
  const result = run([]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /使い方/);
});

test('LF and CRLF give identical findings in paths containing spaces and Japanese', t => {
  const dir = mkdtempSync(join(tmpdir(), 'check-ui-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(join(dir, '画面 samples'));
  const file = join(dir, '画面 samples', 'index.html');
  // Exactly 1000 characters: CRLF must not make the checker skip this line.
  const line = '<p class="transition-all">'.padEnd(996, 'x') + '</p>';
  let expected;
  for (const eol of ['\n', '\r\n']) {
    writeFileSync(file, ['<main>', line, '</main>', ''].join(eol));
    const result = run([file], dir);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /^画面 samples[/\\]index.html:2  \[transition-all\]/);
    assert.match(result.stdout, /1件の指摘/);
    if (expected) assert.equal(result.stdout, expected);
    expected = result.stdout;
  }
});

test('native relative paths and absolute paths give identical results', t => {
  const dir = mkdtempSync(join(tmpdir(), 'check-ui-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(join(dir, 'src'));
  writeFileSync(join(dir, 'src', 'screen.html'), '<p class="transition-all">本文</p>\n');
  const relative = run([join('src', 'screen.html')], dir);
  const absolute = run([join(dir, 'src', 'screen.html')], dir);
  assert.equal(relative.status, 1);
  assert.equal(absolute.status, 1);
  assert.equal(relative.stdout, absolute.stdout);
  assert.match(relative.stdout, /^src\/screen.html:1/);
});
