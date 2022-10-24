import { Grid } from '@mui/material';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Tokens from '../components/Tokens';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Tokens />
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
