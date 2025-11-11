import { Request, Response } from 'express';
import { executeCommand } from '../services/command.service';
import { epdService } from '../services/epd.service';

export interface CommandRequestBody {
  command: 'clear' | 'shutdown' | 'reboot';
}

const commandHandlers: { [key in CommandRequestBody['command']]: () => Promise<void> } = {
  clear: async () => {
    console.log('Executing command: clear');
    await epdService.clear();
  },
  shutdown: async () => {
    console.log('Executing command: shutdown');
    await executeCommand('sudo shutdown -h now');
  },
  reboot: async () => {
    console.log('Executing command: reboot');
    await executeCommand('sudo reboot');
  },
};

export const handleCommand = async (req: Request<{}, {}, CommandRequestBody>, res: Response) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).send('Command is required.');
  }

  const handler = commandHandlers[command];

  if (handler) {
    try {
      res.status(200).send(`Command "${command}" initiated.`);
      await handler();
    } catch (error) {
      // The response might have already been sent, but we log the error.
      console.error(`Error handling command "${command}":`, error);
    }
  } else {
    res.status(400).send(`Unknown command: ${command}`);
  }
};
