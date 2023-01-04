import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReduxStore, reduxWrapper } from '~/stores/store';
import { useStore } from 'react-redux';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  const reduxStore = useStore();
  return (
    <PersistGate loading={null} persistor={(reduxStore as ReduxStore).reduxPersistData}>
      {() => <Component {...pageProps} />}
    </PersistGate>
  );
}

export default reduxWrapper.withRedux(appWithTranslation(App));
