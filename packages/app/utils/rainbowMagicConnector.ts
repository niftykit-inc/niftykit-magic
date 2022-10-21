import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector';
import { Chain } from 'wagmi';

const chainId = Number(process.env.NEXT_PUBLIC_APP_CHAIN_ID);
const rpcUrl =
  chainId === 80001
    ? 'https://matic-mumbai.chainstacklabs.com'
    : 'https://polygon-rpc.com';

export const rainbowMagicConnector = ({ chains }: { chains: Chain[] }) => ({
  id: 'magic',
  name: 'Magic',
  iconUrl: 'https://svgshare.com/i/iJK.svg',
  iconBackground: '#fff',
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        apiKey: process.env.NEXT_PUBLIC_APP_MAGIC_KEY || '',
        magicSdkConfiguration: {
          network: {
            rpcUrl,
            chainId,
          },
        },
      },
    });
    return {
      connector,
    };
  },
});
