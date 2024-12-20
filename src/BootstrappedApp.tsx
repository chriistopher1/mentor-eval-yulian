import React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// You shoudd wrap the App component with the QueryClientProvider
// You can also use ReactQueryDevtools to debug the queries

const queryClient = new QueryClient();

export const BootstrappedApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
