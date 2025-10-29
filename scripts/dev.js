#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting development environment...\n');

// Start JSON Server
const jsonServer = spawn('yarn', ['json-server'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  shell: false,
});

jsonServer.stdout.on('data', (data) => {
  console.log(`[JSON Server] ${data.toString().trim()}`);
});

jsonServer.stderr.on('data', (data) => {
  console.error(`[JSON Server Error] ${data.toString().trim()}`);
});

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
  console.log('\n🛑 Shutting down development servers...');
  jsonServer.kill();
  nextDev.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development servers...');
  jsonServer.kill();
  nextDev.kill();
  process.exit(0);
});

// Wait a bit for JSON Server to start before starting Next.js
setTimeout(() => {
  console.log('✅ JSON Server started on http://localhost:3001');
  console.log('✅ Next.js will start on http://localhost:3000');
  console.log('📚 API Documentation: http://localhost:3001');
  console.log('\nPress Ctrl+C to stop both servers\n');
}, 2000);
