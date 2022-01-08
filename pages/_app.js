import '../styles/globals.css'
import buildClient from '../api/build-client'
import { AppStateProvider } from '../hooks/use-appstate'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { appWithTranslation } from '../utils/i18n';
import NextNProgress from 'nextjs-progressbar';

const AppComponent = ({ Component, pageProps, currentUser, footerData }) => {
  return (
      <AppStateProvider>
        <NextNProgress />
        <Header currentUser={currentUser} />
        <Component currentUser={currentUser} {...pageProps} />
        <Footer data={footerData} />
      </AppStateProvider>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data
  }
}

export default appWithTranslation(AppComponent)