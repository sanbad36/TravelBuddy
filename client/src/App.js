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

export const LanguageContext = React.createContext();

function App() {
  const [language, setLanguage] = useState('english');
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  // Alan
  const navigate = useNavigate();
  const alanKey = 'b2d9701a39c56f75626449da674777452e956eca572e1d8b807a3e2338fdd0dc/stage';
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
  }, []);

  return (
    <div className="app">
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/hero" element={<LandingPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/trips" element={<TravelPage />} />
            <Route path="/chatgpt" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/explore" element={<Shorts />} />
            <Route path="/newtrip" element={<NewTrip />} />
            <Route path="/shorts" element={<Explore />} />
            <Route path="/meetup" element={<MeetUp />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/maps" element={<WorldMap />} />
            <Route path="/video-chat" element={<JoinRoom />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/expense" element={<ExpenseTracker />} />
          </Routes>
          <Chatbot />
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
