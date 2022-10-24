import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useSnackbar } from 'notistack';
import { useSigner } from 'wagmi';
import { Stack } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { mintTo } from '../../services/api';

const Mint: React.FC<{ onMinted: () => void }> = ({ onMinted }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { openConnectModal } = useConnectModal();
  const { data: signer } = useSigner();
  const onMint = React.useCallback(async () => {
    if (!signer) {
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }
    try {
      setLoading(true);
      const address = await signer.getAddress();
      await mintTo(address, 1, 0);
      enqueueSnackbar('Minted!', { variant: 'success' });
      onMinted();
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, onMinted, openConnectModal, signer]);

  return (
    <>
      <Stack spacing={2}>
        <LoadingButton variant="contained" loading={loading} onClick={onMint}>
          Mint
        </LoadingButton>
      </Stack>
    </>
  );
};

export default Mint;
