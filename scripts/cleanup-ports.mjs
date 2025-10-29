#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function killProcessOnPort(port) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    const pids = stdout
      .trim()
      .split('\n')
      .filter((pid) => pid);

    if (pids.length > 0) {
      console.log(`🔍 Found processes on port ${port}: ${pids.join(', ')}`);
      for (const pid of pids) {
        try {
          await execAsync(`kill -9 ${pid}`);
          console.log(`✅ Killed process ${pid} on port ${port}`);
        } catch (error) {
          console.log(`⚠️  Could not kill process ${pid}: ${error.message}`);
        }
      }
    } else {
      console.log(`✅ Port ${port} is already free`);
    }
  } catch (error) {
    console.log(`✅ Port ${port} is already free`);
  }
}

async function cleanupPorts() {
  console.log('🧹 Cleaning up ports 3000 and 3001...\n');

  await killProcessOnPort(3000);
  await killProcessOnPort(3001);

  console.log('\n✨ Port cleanup completed!');
}

cleanupPorts().catch(console.error);
