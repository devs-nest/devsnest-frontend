import React from 'react';
import { Grid } from '@material-ui/core';
import GbuCard from './GbuCard';
import Header from '../romponents/Header';
import Container from '@material-ui/core/Container';
import FormDialog from './GbuDialog';

const Componentgbu = ({ gbu, addGbu, status }) => {
  return (
    <div>
      <Header />
      <Container>
        <Grid container style={{ paddingTop: '20px' }}>
          <Grid item md={1}>
            <FormDialog addGbu={addGbu} status={status} />
          </Grid>
          <Grid item md={11}>
            <GbuCard gbu={gbu} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Componentgbu;
