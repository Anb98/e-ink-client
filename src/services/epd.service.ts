import { EPDWrapper } from "./epd-wrapper";

class EPDService {
  private epd: EPDWrapper;

  constructor() {
    this.epd = new EPDWrapper();
  }

  async initialize(): Promise<void> {
    try {
      await this.epd.start();
      await this.epd.init();
      console.log("E-Ink Display Service initialized successfully.");
    } catch (error) {
      console.error("Failed to initialize E-Ink Display Service:", error);
      // Depending on the application's needs, you might want to exit the process
      // if the display fails to initialize.
      // process.exit(1);
    }
  }

  async clear(): Promise<void> {
    return this.epd.clear();
  }

  async displayImage(imageUrl: string): Promise<void> {
    console.log(`Fetching image from: ${imageUrl}`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Error downloading image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    console.log("Image downloaded, preparing to display.");
    await this.epd.clear();
    await this.epd.displayBuffer(imageBuffer);
    console.log("Displaying image for 10 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await this.epd.sleep();
    console.log("Image display process complete.");
  }
}

// Export a singleton instance of the service
export const epdService = new EPDService();
