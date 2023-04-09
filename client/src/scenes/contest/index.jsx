import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid, Button } from '@mui/material';
import Navbar from '../navbar';
import Header from '../community/header'
import Filters from '../widgets/meetFilter';
import UserCard from '../../components/UserCard';
import { useSelector } from 'react-redux';
import community from '../../assets/community.avif';
import Swal from 'sweetalert2';

const Contest = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);

  const communityData = [
    {
      id: 1,
      image: 'data:image/jpeg;base64,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',
      title: 'Sunset India',
      description: 'Jigar Shah',
      sub: 'Read more'
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAHfqMsIswGN2eqBDTiMceqeXBDmbAtLV2Q&usqp=CAU',
      title: 'Sunset Vice city',
      description: 'Explore the world through the lens of our community of workawayers and hosts.',
      sub: 'Explore Full Gallery'
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAHfqMsIswGN2eqBDTiMceqeXBDmbAtLV2Q&usqp=CAU',
      title: 'Sunset NY',
      description:
        'Check out our travel vlogs and videos showcasing various Workaway experiences and stories.Stay tuned with our most recent travel tips, news and advice to plan your own journey.',
      sub: 'Watch Now'
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAHfqMsIswGN2eqBDTiMceqeXBDmbAtLV2Q&usqp=CAU',
      title: 'Sunset UCSD',
      description: 'Meet our community of travel ambassadors and learn more about their experiences and adventures.',
      sub: 'Get Involved'
    },
    {
      id: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRet3zh37YG-TV3__u-q2ADH4yhYFi6JZkdg&usqp=CAU',
      title: 'Sunset Arizona',
      description: 'Give the gift of travel and help someone discover the world through Workaway.',
      sub: 'Buy Gift Membership'
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Navbar />
      <h1 style={{textAlign:'center'}} data-aos="fade-up">Sunset Views for the week</h1>
      <Box sx={{ width: '100%', mt: 4 }} data-aos="fade-up">
        <Grid container spacing={5}>
          {communityData.map((item) => (
            <Grid item spacing={3} xs={12} sm={6} md={4} data-aos="fade-up">
              <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '345px', width: '100%' }} data-aos="fade-up">
                <img src={item.image} alt="" height={250} width={250} />
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Button variant="contained" onClick={()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Upvote Casted Successfully',
                        
                      })
                }}>Upvote</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Contest;
