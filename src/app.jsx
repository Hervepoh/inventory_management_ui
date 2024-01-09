/* eslint-disable perfectionist/sort-imports */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

const client = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
