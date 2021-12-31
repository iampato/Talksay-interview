import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreContext, store } from '../data/mobx/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );

  // return <Component {...pageProps} />
}

export default MyApp
