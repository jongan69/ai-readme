import "@/styles/globals.css"
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;