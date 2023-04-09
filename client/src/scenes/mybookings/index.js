import { Box, Grid, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar1 from '../navbar/index';
import Filters from '../widgets/FilterWidget2';
import TripCard from '../../components/TripCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingCard from 'components/BookingCard';
import { setBookings } from 'state';

const MyBookings = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getBookings = async() => {
    const config = {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`,
         }
    }
    const response = await axios.post(`http://localhost:3001/payments/all`,{userid:_id},config);
    dispatch(setBookings(response.data))
    console.log(response.data);
  };

  useEffect(() => {
    // if (isProfile) {
    //   getUserPosts();
    // } else {
    //   getPosts();
    // }
    getBookings();
    // if(isProfile){
    //   getUserPosts();
    // }
  }, [dispatch]);
  
  const trips = useSelector(state=>state.bookings);
  return (
    <Box>
      <Navbar1 />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="center"
        data-aos="fade-up"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined} data-aos="fade-right">
          <Filters userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? '60%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'} data-aos="fade-left">
          {/* <MyPostWidget picturePath={picturePath} /> */}
          {/* <JobPostsWidget userId={_id} /> */}
          <Grid container spacing={4}>
            {trips && trips.map((item) => (
              <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
                <BookingCard
                  id={item._id}
                  userID={item.userID}
                  postID={item.postID}
                  BookingAmount={item.BookingAmount}
                  TripBookedAt={item.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default MyBookings;
