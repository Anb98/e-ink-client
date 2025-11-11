import { exec } from 'child_process';

export const executeCommand = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${cmd}`, error);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};
