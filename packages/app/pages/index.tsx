import { Grid } from '@mui/material';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Mint from '../components/Mint';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Mint />
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
