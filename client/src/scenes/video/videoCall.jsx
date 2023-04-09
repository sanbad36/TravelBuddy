import React, { useState, useEffect } from 'react';
import Navbar1 from '../navbar/index';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

export default function JoinRoom() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    window.location.assign(`/video/${room}`);
  };

  return (
    <>
      <Navbar1 />
      <h1 style={{textAlign:'center'}} data-aos="fade-up">Video Chatting</h1>
      <center>
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_ub60s1vk.json"  background="transparent"  speed="1"  style={{width: "300px", textAlign:'center'}}  loop autoplay></lottie-player>
      </center>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="mt-4 w-[75%] mx-auto flex flex-columns justify-center">
          <div>
            <div>
              {/* <input
                type="text"
                className="border-gray-300 border-[0.07rem] shadow-lg py-2 px-5 bg-grey" 
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter Room Name"
              /> */}
              <TextField
              fullWidth
              label="Enter Room Name"
              // value={}
              // onChange={(e) => {
              //   setEnquiry({
              //     ...enquiry,
              //     name: e.target.value,
              //   });
              // }}
              onChange={(e) => setRoom(e.target.value)}
              sx={{ width: '100%', mr: { md: 1 } }}
            />
            </div>
            <div style={{marginTop: "2rem"}}>
              {/* <button onClick={onSubmit} className="text-xl ml-11 mt-3 border-[0.05] px-5 py-2 border-gray-300">
                Submit
              </button> */}
              <Button variant="contained" sx={{ width: '100%', maxWidth:'200px' }} onClick={onSubmit}>
                Join Room
            </Button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export function Video({ match }) {
  const id = useParams().id;

  console.log(id);

  useEffect(() => {
    const domain = 'https://codingmickey.daily.co/';

    axios
      .get(`http://localhost:3001/video-call/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const script = document.createElement('script');
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

          document.body.appendChild(script);
          document.body.querySelector('body').style.height = '100vh';
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div></div>;
}
