import axios, { Axios } from 'axios';
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const backendUrlLink = 'https://pos.begunipik.com';
// export const backendUrlLink = 'http://localhost:5003';
export const api = axios.create({
  withCredentials: true,
  baseURL: backendUrlLink,
});

// Add a request interceptor to automatically add the Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');  // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to the Authorization header
    }
    return config;  // Return the modified config object to continue the request
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
api.interceptors.response.use(null, async (error) => {
  const config = error.config;  // Get the request configuration from the error object

  // Set a retry count if it doesn't exist
  if (!config.__retryCount) {
    config.__retryCount = 0;
  }

  // Set the maximum number of retries
  const MAX_RETRIES = 3;

  // If the request has not exceeded the max retry count, retry the request
  if (config.__retryCount < MAX_RETRIES) {
    config.__retryCount += 1;  // Increment the retry count

    // Calculate the delay time (exponential backoff: 1000ms, 2000ms, 4000ms)
    const delay = Math.pow(2, config.__retryCount) * 1000;  // Delay is in milliseconds

    // Wait for the delay before retrying
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry the request with the updated configuration
    return api(config);
  }

  // If max retries reached, reject the error
  return Promise.reject(error);
});


