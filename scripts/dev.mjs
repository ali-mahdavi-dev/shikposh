#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting development environment (Next.js + JSON Server)...\n');

// Function to check if port is available
function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    server.on('error', () => {
      resolve(false);
    });
  });
}

// Start JSON Server (mock API)
const jsonServer = spawn('yarn', ['json-server'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  shell: false,
});

jsonServer.stdout.on('data', (data) => {
  console.log(`[MockAPI] ${data.toString().trim()}`);
});

jsonServer.stderr.on('data', (data) => {
  console.error(`[MockAPI Error] ${data.toString().trim()}`);
});

jsonServer.on('error', (error) => {
  console.error(`[MockAPI Process Error] ${error.message}`);
});

// Start Next.js development server (after starting mock API)
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

nextDev.on('error', (error) => {
  console.error(`[Next.js Process Error] ${error.message}`);
});

nextDev.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`[Next.js] Process exited with code ${code} and signal ${signal}`);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Next.js and Mock API...');
  nextDev.kill();
  jsonServer.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Next.js and Mock API...');
  nextDev.kill();
  jsonServer.kill();
  process.exit(0);
});

setTimeout(() => {
  console.log('✅ Mock API on http://localhost:3001');
  console.log('✅ Next.js will start on http://localhost:3000');
  console.log('\nPress Ctrl+C to stop the server\n');
}, 500);

// Add process error handling
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
