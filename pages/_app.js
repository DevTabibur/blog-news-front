// scroll bar
import 'simplebar';
import 'simplebar/src/simplebar.css'

// theme
import ThemeConfig from 'theme'
import GlobalStyles from 'theme/globalStyles';

// components
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { CollapseDrawerProvider } from '../src/contexts/CollapseDrawerContext';
import createEmotionCache from '@/utils/CreateEmotionCache';
import { ContextProvider } from '../src/contexts/dataProviderContext';
import Layout from '@/components/_App/Layout';
import ThemePrimaryColor from '@/components/ThemePrimaryColor'
// import ThemeLocalization from '@/components/ThemeLocalization'
import RtlLayout from '@/components/RtlLayout';
import NotistackProvider from '@/components/NotistackProvider';
import { ProgressBarStyle } from '@/components/LoadingScreen';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react'

// style for landing page
import '@/styles/bootstrap.min.css'
import 'animate.css'
import '@/styles/boxicons.min.css'
import '@/styles/flaticon.css'
import "@/styles/slick.css"
import 'react-accessible-accordion/dist/fancy-example.css'
import "swiper/css";
import "swiper/css/bundle";

// Global Style
import '@/styles/style.css';
// Global Responsive Style
import '@/styles/responsive.css'
// Global RTL Style
import '@/styles/rtl.css'




const clientSideEmotionCache = createEmotionCache()

export default function App(props) {

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <>
            <ContextProvider>

                <SettingsProvider>
                    <CollapseDrawerProvider>
                        <CacheProvider value={emotionCache}>
                            <Head>
                                <meta
                                    name="viewport"
                                    content="initial-scale=1, width=device-width"
                                />
                            </Head>
                            <ThemeConfig>
                                <ThemePrimaryColor>
                                    <RtlLayout>

                                        <NotistackProvider>
                                            <GlobalStyles />
                                            <ProgressBarStyle />
                                            <Layout />


                                            <Component {...pageProps} />
                                        </NotistackProvider>
                                    </RtlLayout>
                                </ThemePrimaryColor>
                            </ThemeConfig>
                        </CacheProvider>
                    </CollapseDrawerProvider>

                </SettingsProvider>

            </ContextProvider>



        </>
    )
}