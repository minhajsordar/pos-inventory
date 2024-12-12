import { Worker } from "worker_threads";
import fs from 'fs';

const workerController = (req, res) => {

    // Example JSON data
    const jsonData = { name: "John", age: 30, job: "Developer" };

    // Convert JSON to string and then to a Uint8Array (binary)
    const jsonString = JSON.stringify(jsonData);
    const encoder = new TextEncoder();
    const jsonBinary = encoder.encode(jsonString);

    // Allocate a SharedArrayBuffer with a fixed size (you can preallocate more space if needed)
    const sharedBuffer = new SharedArrayBuffer(jsonBinary.length); // Initial size based on the data
    const buffer = new Uint8Array(sharedBuffer);
    buffer.set(jsonBinary);

    // Log data before sending to worker
    console.log("Buffer before worker modifies:", new TextDecoder().decode(buffer));

    // Create a worker and pass the shared buffer
    const worker = new Worker('./backend/controllers/worker/w.js', { workerData: { sharedBuffer, length: jsonBinary.length } });

    worker.on('message', (message) => {
        if (message.status === 'done') {
            // The worker successfully modified the data within the buffer
            const modifiedJsonString = new TextDecoder().decode(buffer);
            const modifiedJsonData = JSON.parse(modifiedJsonString);
            console.log("Modified data received from worker (within buffer):", modifiedJsonData);

            return res.json({ data: modifiedJsonData })
        } else if (message.status === 'data_too_large') {
            // If the worker sends modified data that is larger than the buffer
            console.log("Modified data received from worker (via message):", message.data);
            return res.json({ data: message.data })
        } else if (message.status === 'error') {
            console.error('Error occurred in worker:', message.error);
            return res.json({ error: "Error occurred in worker:" })
        } else {
            return res.json({ error: "Could not pocess." })
        }
    });
}
const workerImageController=(req,res)=>{

// Read image file as a buffer
const imageBuffer = fs.readFileSync('./path/to/image.jpg');

// Create a SharedArrayBuffer and copy image data
const sharedBuffer = new SharedArrayBuffer(imageBuffer.length);
const buffer = new Uint8Array(sharedBuffer);
buffer.set(imageBuffer);

// Log the buffer before modification
console.log('Image buffer before worker:', buffer);

// Create worker and pass the shared buffer
const worker = new Worker('./backend/controllers/worker/imagew.js', { workerData: { sharedBuffer } });

worker.once('message', () => {
    // The worker has modified the shared buffer directly
    fs.writeFileSync('./path/to/modified_image.jpg', buffer);
    console.log('Image modified and saved');
});

}
export {
    workerController,
    workerImageController
}