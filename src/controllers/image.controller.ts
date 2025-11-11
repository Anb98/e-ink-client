import { Request, Response } from 'express';
import { epdService } from '../services/epd.service';

interface ImageRequestBody {
  url: string;
}

export const handleImage = async (req: Request<{}, {}, ImageRequestBody>, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('Image URL is required.');
  }

  // Respond immediately to the client
  res.status(202).send('Accepted: Image display process initiated.');

  // Start the long-running display process without blocking the response
  try {
    await epdService.displayImage(url);
  } catch (error) {
    console.error(`Failed to display image from ${url}:`, error);
    // This error is logged on the server, the client has already received a 202 response.
  }
};
