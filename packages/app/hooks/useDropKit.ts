import DropKit from '@niftykit/dropkit';

import React from 'react';
import { useProvider, useSigner } from 'wagmi';

function useDropKit(): DropKit | null {
  const provider = useProvider();
  const { data } = useSigner();
  const [dropKit, setDropKit] = React.useState<DropKit | null>(null);
  const isDev = Number(process.env.NEXT_PUBLIC_APP_CHAIN_ID) === 80001;

  React.useEffect(() => {
    async function bootstrap() {
      setDropKit(
        await DropKit.create(
          data ? data : provider,
          process.env.NEXT_PUBLIC_APP_NIFTYKIT_API_KEY || '',
          isDev
        )
      );
    }
    bootstrap();
  }, [data, isDev, provider]);

  return dropKit;
}

export default useDropKit;
