import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import TravelPage from 'scenes/TravelPage.jsx';
import NotFound from 'components/NotFound';
import LandingPage from 'scenes/LandingPage';
import Explore from 'scenes/explore';
import NewTrip from 'scenes/newtrip';
import Shorts from 'scenes/shorts';
import ChatGPT from 'scenes/ChatGPT';
import { Chat } from 'scenes/Chat';
import MeetUp from 'scenes/meetUp';
import Safety from 'scenes/safety';
import Community from 'scenes/community';
import WorldMap from 'components/UserMap';
import JoinRoom, { Video } from 'scenes/video/videoCall';
import ExpenseTracker from 'scenes/expense/ExpenseTracker';
import alanBtn from '@alan-ai/alan-sdk-web';
import Contest from 'scenes/contest';
import Chatbot from 'components/Chatbot';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import MyBookings from 'scenes/mybookings';

export const LanguageContext = React.createContext();

function App() {
  AOS.init()
  const [language, setLanguage] = useState('english');
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  // Alan
  const navigate = useNavigate();
  const alanKey = 'b2d9701a39c56f75626449da674777452e956eca572e1d8b807a3e2338fdd0dc/stage';
  // const alanKey = '9945293841bada83da738adf4a55f93a2e956eca572e1d8b807a3e2338fdd0dc/stage';
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === 'login') {
          navigate('/');
          // } else if (command === 'signup') {
          //   navigate('/signup');
        } else if (command === 'home') {
          navigate('/home');
        } else if (command === 'community') {
          navigate('/community');
        } else if (command === 'blogs') {
          navigate('/blogs');
        }
      }
    });
  }, [navigate]);

  return (
    <div className="app">
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={!isAuth ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/hero" element={<LandingPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/trips" element={isAuth ? <TravelPage /> : <Navigate to="/" />} />
            <Route path="/chatgpt" element={isAuth ? <Chat /> : <Navigate to="/" />} />
            <Route path="/chat" element={isAuth ? <Chat /> : <Navigate to="/"/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/explore" element={isAuth ? <Shorts /> : <Navigate to="/"/>} />
            <Route path="/newtrip" element={isAuth ? <NewTrip /> : <Navigate to="/"/>} />
            <Route path="/shorts" element={isAuth ? <Explore /> : <Navigate to="/"/>} />
            <Route path="/meetup" element={isAuth ? <MeetUp /> : <Navigate to="/"/>} />
            <Route path="/safety" element={isAuth ? <Safety /> : <Navigate to="/"/>} />
            <Route path="/community" element={isAuth ? <Community /> : <Navigate to="/"/>} />
            <Route path="/contest" element={isAuth ? <Contest /> : <Navigate to="/"/>} />
            <Route path="/maps" element={isAuth ? <WorldMap /> : <Navigate to="/"/>} />
            <Route path="/video-chat" element={isAuth ? <JoinRoom /> : <Navigate to="/"/>} />
            <Route path="/video/:id" element={isAuth ? <Video /> : <Navigate to="/"/>} />
            <Route path="/expense" element={isAuth ? <ExpenseTracker /> : <Navigate to="/"/>} />
            <Route path="/mybookings" element={isAuth ? <MyBookings /> : <Navigate to="/"/>} />
          </Routes>
          <Chatbot />
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
