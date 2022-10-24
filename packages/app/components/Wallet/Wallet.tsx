import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@mui/material';

const Wallet: React.FC<{}> = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    onClick={openConnectModal}
                    type="button">
                    Magic.Link Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    onClick={openChainModal}
                    type="button">
                    Wrong Network
                  </Button>
                );
              }

              return (
                <Button
                  size="large"
                  color="inherit"
                  variant="outlined"
                  onClick={openAccountModal}
                  type="button">
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ''}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Wallet;
