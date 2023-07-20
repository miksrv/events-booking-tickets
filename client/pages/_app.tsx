import { wrapper } from '@/api/store'
import { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'
import { Provider } from 'react-redux'

const montserrat = Montserrat({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps)

    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, shrink-to-fit=no'
                />
                <link
                    rel='shortcut icon'
                    href='/favicon.png'
                    key='shortcutIcon'
                />
                <link
                    rel='manifest'
                    href='/manifest.json'
                />
            </Head>
            <Provider store={store}>
                <main className={montserrat.className}>
                    <Component {...props.pageProps} />
                </main>
            </Provider>
        </>
    )
}

export default App
