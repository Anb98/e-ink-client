import app from './app';
import { epdService } from './services/epd.service';

const port = 3000;

const startServer = async () => {
  // Initialize the E-Ink display service
  await epdService.initialize();

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();