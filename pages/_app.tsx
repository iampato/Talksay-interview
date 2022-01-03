import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreContext, store } from '../data/mobx/store';
import MobileSizedView from 'react-mobile-sized-view';
import AppWrapper from '../components/app_context';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </StoreContext.Provider>
  );

  // return <Component {...pageProps} />
}

export default MyApp
