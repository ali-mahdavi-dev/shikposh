#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Next.js development server...\n');

// Start Next.js development server
const nextDev = spawn('yarn', ['dev'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  shell: false,
});

nextDev.stdout.on('data', (data) => {
  console.log(`[Next.js] ${data.toString().trim()}`);
});

nextDev.stderr.on('data', (data) => {
  console.error(`[Next.js Error] ${data.toString().trim()}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Next.js...');
  nextDev.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Next.js...');
  nextDev.kill();
  process.exit(0);
});

setTimeout(() => {
  console.log('✅ Next.js will start on http://localhost:3000');
  console.log('\nPress Ctrl+C to stop the server\n');
}, 500);
