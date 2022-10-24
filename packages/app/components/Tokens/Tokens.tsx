import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useSigner } from 'wagmi';
import useDropKit from '../../hooks/useDropKit';
import Mint from '../Mint';

type NftToken = {
  tokenId: number;
  image: string;
};

const Tokens: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dropKit = useDropKit();
  const { data: signer } = useSigner();
  const [tokens, setTokens] = React.useState<NftToken[]>([]);

  const getTokensCount = React.useCallback(async () => {
    if (!dropKit || !signer) {
      return;
    }
    try {
      setLoading(true);
      const address = await signer.getAddress();
      // NOTE: 'tokensOfOwner' is only available on ERC721A,
      // for ERC721, use 'tokenOfOwnerByIndex' along with 'balanceOf'
      const tokenIds = await dropKit.contract.tokensOfOwner(address);
      const newTokens: NftToken[] = [];
      tokenIds.map((tokenId) => {
        const token = {
          tokenId: tokenId.toNumber(),
          image:
            'https://bafkreihzjhvwxn4vf37co2ktvhxtg2ma44rocckn37nmeokilzjp4dn2oi.ipfs.nftstorage.link',
        };
        newTokens.push(token);
      });
      setTokens(newTokens);
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [dropKit, enqueueSnackbar, signer]);

  React.useEffect(() => {
    getTokensCount();
  }, [getTokensCount]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Grid sx={{ marginBottom: '10px' }}>
            <Mint onMinted={getTokensCount} />
          </Grid>
          <Grid container spacing={2}>
            {tokens.map((token) => (
              <Grid key={token.tokenId} item xs={2}>
                <Card key={token.tokenId}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={token.image}
                    alt="token image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Token # {token.tokenId}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Tokens;
