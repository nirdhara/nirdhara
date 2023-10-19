'use client';
import { useEffect } from 'react';

/**
 *
 * Global Error Boundary: A "catch-all" error handler for root layout and template which wraps the entire application.
 *
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
