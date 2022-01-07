import '../styles/globals.css'
import buildClient from '../api/build-client'
import { AppStateProvider } from '../hooks/use-appstate'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { appWithTranslation } from '../utils/i18n'
import NextNProgress from 'nextjs-progressbar';

const AppComponent = (ctx) => {
  //{ Component, pageProps, currentUser, footerData }
  console.log(ctx)
  const Component = ctx.Component
  return (
      <AppStateProvider>
        <NextNProgress />
        <Header currentUser={ctx.currentUser} />
        <Component currentUser={ctx.currentUser} {...ctx.pageProps} />
        <Footer data={ctx.footerData} />
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