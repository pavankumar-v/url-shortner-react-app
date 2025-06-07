import { envConfig } from '@/config/env';
import axios, { isAxiosError, AxiosError } from 'axios';

export const api = axios.create({
  baseURL: envConfig.apiBaseUrl(),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Enable detailed logging in debug mode
if (envConfig.debugMode()) {
  api.interceptors.request.use(request => {
    console.log('API Request:', request);
    return request;
  });

  api.interceptors.response.use(response => {
    console.log('API Response:', response);
    return response;
  });
}


export default function handleApiError(error: Error | AxiosError): Error {
  if (isAxiosError(error)) {
    if (error.response) {
      const message = error.response.data?.message || `Error ${error.response.status}`;
      return new Error(message);
    }
    if (error.request) {
      return new Error('No response received. Please check your network.');
    }
    return new Error(error.message);
  }

  return new Error('An unknown error occurred.');
}
