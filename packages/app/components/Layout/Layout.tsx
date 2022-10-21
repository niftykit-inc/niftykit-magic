import { AppBar, Container, Toolbar } from '@mui/material';

import React from 'react';
import Wallet from '../Wallet';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <AppBar position="sticky">
        <Container disableGutters>
          <Toolbar>
            <Wallet />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" style={{ paddingTop: '40px' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
