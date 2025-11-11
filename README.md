# E-Ink Display Client

This repository contains the source code for a simple Express.js server designed to act as a client for the [Waveshare 4-inch 6-color E-Paper display](https://www.waveshare.com/4inch-e-paper-hat-plus-e.htm?sku=27366). This server is intended to be run on a Raspberry Pi. It allows you to send commands and image URLs to a device equipped with the e-paper display.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later recommended)
- [npm](https://www.npmjs.com/)

## Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/Anb98/e-ink-client.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd e-ink-client
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Server

You can run the server in two modes:

### Development Mode

For development, you can run the server with `nodemon`, which will automatically restart the server when file changes are detected.

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

### Production Mode

To run the server in a more "production-like" environment using `ts-node`:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

## API Endpoints

The server exposes the following endpoints:

### Health Check

-   **URL:** `/healthcheck`
-   **Method:** `GET`
-   **Description:** A simple endpoint to verify that the server is running and responsive.
-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:** `OK`

### Send Image URL

-   **URL:** `/image`
-   **Method:** `POST`
-   **Description:** Receives a URL pointing to an image that should be displayed on the e-paper screen.
-   **Request Body:**
    ```json
    {
      "url": "https://example.com/path/to/your/image.png"
    }
    ```
-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:** `Image URL received: https://example.com/path/to/your/image.png`
-   **Error Response:**
    -   **Code:** 400 Bad Request
    -   **Content:** `Image URL is required.`

### Send Command

-   **URL:** `/command`
-   **Method:** `POST`
-   **Description:** Receives a command to be executed on the e-paper device.
-   **Request Body:**
    ```json
    {
      "command": "clear"
    }
    ```
-   **Available Commands:**
    -   `clear`: Clears the display.
    -   `shutdown`: Shuts down the device.
    -   `reboot`: Reboots the device.
-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:** `Command "<command-name>" executed.`
-   **Error Response:**
    -   **Code:** 400 Bad Request
    -   **Content:** `Command is required.` or `Unknown command: <command-name>`
