import { parentPort, workerData } from 'worker_threads';

// Access the shared buffer as a Uint8Array
const buffer = new Uint8Array(workerData.sharedBuffer);

// Modify the buffer (example: change pixel data)
for (let i = 0; i < buffer.length; i++) {
    // Just an example modification; real image manipulation is more complex
    buffer[i] = (buffer[i] + 10) % 256;  // Modify pixel values
}

// Notify the main thread that the worker has finished modifying data
parentPort.postMessage('done');
