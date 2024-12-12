import { parentPort, workerData } from 'worker_threads';

// Access the shared buffer and convert it back to a string
const buffer = new Uint8Array(workerData.sharedBuffer);
const decoder = new TextDecoder();
const jsonString = decoder.decode(buffer.subarray(0, workerData.length));
console.log("Raw JSON string in worker:", jsonString);

try {
    const jsonData = JSON.parse(jsonString);

    // Modify the JSON data (This modification increases the size)
    jsonData.age = 40;
    jsonData.job = 'Senior Developer';
    jsonData.additionalInfo = 'This extra data makes the object larger'; // Example modification

    // Convert modified JSON back to string and binary
    const modifiedJsonString = JSON.stringify(jsonData);
    const encoder = new TextEncoder();
    const modifiedBinary = encoder.encode(modifiedJsonString);

    // Check if the modified binary data fits into the shared buffer
    if (modifiedBinary.length > buffer.length) {
        // If the modified data is too large for the buffer, send it using postMessage
        parentPort.postMessage({
            status: 'data_too_large',
            data: jsonData, // Send the entire modified data back as a message
        });
    } else {
        // Overwrite the shared buffer with modified data if it fits
        buffer.set(modifiedBinary);

        // Notify the main thread that the worker is done
        parentPort.postMessage({ status: 'done', length: modifiedBinary.length });
    }
} catch (error) {
    console.error("Error while parsing or modifying JSON:", error);
    parentPort.postMessage({ status: 'error', error: error.message });
}
