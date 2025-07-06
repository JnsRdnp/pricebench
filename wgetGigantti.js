import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const wgetVars = ['GIGANTTI1', 'GIGANTTI2', 'GIGANTTI3', 'GIGANTTI4'];

async function runCmd(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${cmd}`);
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
      resolve();
    });
  });
}

async function runAll() {
  for (const varName of wgetVars) {
    const cmd = process.env[varName];
    if (!cmd) {
      console.warn(`No command found in env variable: ${varName}`);
      continue;
    }
    await runCmd(cmd);
  }
  console.log('All downloads finished!');
}

runAll().catch((e) => {
  console.error('Failed:', e);
  process.exit(1);
});