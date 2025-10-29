#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting development environment...\n');

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

jsonServer.on('error', (error) => {
  console.error(`[JSON Server Process Error] ${error.message}`);
});

jsonServer.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`[JSON Server] Process exited with code ${code} and signal ${signal}`);
  }
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

// Add process error handling
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
