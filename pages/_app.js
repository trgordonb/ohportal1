import '../styles/globals.css'
import 'react-chatbot-kit/build/main.css'
import '../styles/chatbot.css'
import { AppStateProvider } from '../hooks/use-appstate'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { appWithTranslation } from '../utils/i18n';
import NextNProgress from 'nextjs-progressbar';

const AppComponent = ({ Component, pageProps, footerData }) => {
  return (
      <AppStateProvider>
        <NextNProgress />
        <Header />
        <Component {...pageProps} />
        <Footer data={footerData} />
      </AppStateProvider>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps();
  }

  return {
    pageProps
  }
}

export default appWithTranslation(AppComponent)