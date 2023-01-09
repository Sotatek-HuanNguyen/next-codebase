import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '~/assets/styles/styles.scss';
import { ReduxStore, reduxWrapper } from '~/stores/store';
import { Page } from '~/types/page';

type Props = AppProps & {
  Component: Page;
};

function App({ Component, pageProps }: Props) {
  const reduxStore = useStore();
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;
  return (
    <PersistGate loading={null} persistor={(reduxStore as ReduxStore).reduxPersistData}>
      {() => <Layout>{getLayout(<Component {...pageProps} />)}</Layout>}
    </PersistGate>
  );
}

export default reduxWrapper.withRedux(appWithTranslation(App));
