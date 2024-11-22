import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid, Button } from '@mui/material';
import Navbar from '../navbar';
import Header from './header';
import Filters from '../widgets/meetFilter';
import UserCard from '../../components/UserCard';
import { useSelector } from 'react-redux';
import community from '../../assets/community.avif';
// import { useSpeechSynthesis } from 'react-speech-kit';
function useSpeechSynthesis() {

}
const MeetUp = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  const { speak } = useSpeechSynthesis();

  const communityData = [
    {
      id: 1,
      image: 'https://www.workaway.info/gfx/2015/content/teaser_blog.jpg',
      title: 'Travel Buddy Blog',
      description: 'Stay tuned with our most recent travel tips, news and advice to plan your own journey.',
      sub: 'Read more'
    },
    {
      id: 2,
      image: 'https://www.workaway.info/gfx/2015/content/teaser_workaway-as-a-gift.jpg',
      title: 'Travel Buddy Photo Gallery',
      description: 'Explore the world through the lens of our community of workawayers and hosts.',
      sub: 'Explore Full Gallery'
    },
    {
      id: 3,
      image: 'https://www.workaway.info/gfx/2015/content/teaser_workawaytv.jpg',
      title: 'Travel Buddy TV',
      description:
        'Check out our travel vlogs and videos showcasing various Workaway experiences and stories.Stay tuned with our most recent travel tips, news and advice to plan your own journey.',
      sub: 'Watch Now'
    },
    {
      id: 4,
      image: 'https://www.workaway.info/gfx/2015/content/teaser_ambassadors.jpg',
      title: 'Travel Buddy Ambassadors',
      description: 'Meet our community of travel ambassadors and learn more about their experiences and adventures.',
      sub: 'Get Involved'
    },
    {
      id: 6,
      image: 'https://www.workaway.info/gfx/2015/content/teaser_workaway-as-a-gift.jpg',
      title: 'Gift',
      description: 'Give the gift of travel and help someone discover the world through Workaway.',
      sub: 'Buy Gift Membership'
    }
  ];

  const handleSubmit = async () => {
    await speak({
      text: 'The itinerary for this is as follows: Day 1 includes Trip to adventure park at 8 AM and then lunch at 1 PM '
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Navbar />
      <Header />
      <Box sx={{ width: '100%', mt: 4 }} data-aos="fade-up">
        <Grid container spacing={5}>
          {communityData.map((item) => (
            <Grid item spacing={3} xs={12} sm={6} md={4} data-aos="fade-up">
              <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '345px', width: '100%' }}>
                <img src={item.image} alt="" height={250} width={250} />
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Button variant="contained" onClick={handleSubmit}>
                  {item.sub}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MeetUp;
