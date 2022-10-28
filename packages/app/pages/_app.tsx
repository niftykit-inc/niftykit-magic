import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  connectorsForWallets,
  RainbowKitProvider,
  DisclaimerComponent,
  Wallet,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SnackbarProvider } from 'notistack';
import theme from '../theme';
import createEmotionCache from '../utils/createEmotionCache';
import { rainbowMagicConnector } from '../utils/rainbowMagicConnector';

const chainId =
  Number(process.env.NEXT_PUBLIC_APP_CHAIN_ID) === 80001
    ? chain.polygonMumbai
    : chain.polygon;

const { chains, provider } = configureChains([chainId], [publicProvider()]);

const customConnectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [rainbowMagicConnector({ chains }) as unknown as Wallet],
  },
]);

const { connectors } = getDefaultWallets({
  appName: 'NiftyKit Magic',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: () => {
    return [...customConnectors(), ...connectors()];
  },
  provider,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your accounts, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            appInfo={{
              appName: 'Magic.link Demo',
              learnMoreUrl: 'https://niftykit.com/',
              disclaimer: Disclaimer,
            }}
            modalSize="compact"
            chains={chains}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
