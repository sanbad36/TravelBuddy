import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, useTheme } from '@mui/material';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(4),
    textAlign: 'center'
  }
}));

const Header = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(https://picsum.photos/1680/720)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        className={classes.banner}
        data-aos="fade-up"
      ></Box>
      {/* <Box
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          p: 5
        }}
      >
        <Box>
          <Typography variant="h3" component="p">
            Plan Your Trip With a Travel Buddy
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p" sx={{ maxWidth: '1400px', mt: 2, textAlign: 'center' }}>
            Thousands of Workaway members are looking for a travel partner. New travel-mates added daily. Lots of
            opportunities to find exactly the right travel buddy for you. Choose the places you want to visit, write a
            quick note explaining the type of person you'd like to travel with or what you are intending to do while
            away. You'll then appear on the list. Other travellers can find you, get in contact and discuss plans.
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Header;
