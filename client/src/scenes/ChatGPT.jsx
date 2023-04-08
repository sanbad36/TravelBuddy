import { useState } from 'react';
import { Container, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './navbar';
import { Configuration, OpenAIApi } from 'openai';
import { useSpeechSynthesis } from 'react-speech-kit';


const ChatContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const ChatPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  minHeight: '80vh'
}));

const ChatHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2)
}));

const ChatInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const ChatButton = styled(Button)(({ theme }) => ({
  height: '100%',
  borderRadius: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

function ChatPage() {
  const configuration = new Configuration({
    apiKey: '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'
  });

  const [pitch, setPitch] = useState(2);
  const [rate, setRate] = useState(2);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });
  const voice = voices[voiceIndex] || null;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const openai = new OpenAIApi(configuration);

  const handleSendMessage = async () => {
    speak({ text:"JigAR shah", voice, rate, pitch })
    if (message) {
      setMessages([...messages, message]);
      setIsLoading(true);

      try {
        // const response = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ message })
        // });
        let object = { prompt: message, model: 'text-davinci-003', max_tokens: 200 };

        const response = await openai.createCompletion(object);
        console.log(response);

        // const data = await response.json();
        setMessages([...messages, response.data.choices[0].text]);
        // setMessages([...messages, data.message]);
      } catch (error) {
        console.error(error);
        setMessages([...messages, 'Oops! Something went wrong. Please try again later.']);
      }

      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <ChatContainer maxWidth="sm">
        <ChatPaper elevation={3}>
          <ChatHeader variant="h4">Chat to get more info</ChatHeader>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {messages.map((message, index) => (
                <Typography key={index} sx={{ my: 2 }} variant="body1">
                  {message}
                </Typography>
              ))}
              {isLoading && <Typography variant="body1">Loading...</Typography>}
            </Grid>
            <Grid item xs={9}>
              <ChatInput
                label="Type your message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid item xs={3}>
              <ChatButton variant="contained" onClick={()=>{
                
              }} fullWidth>
                Send
              </ChatButton>
            </Grid>
          </Grid>
        </ChatPaper>
      </ChatContainer>
    </>
  );
}

export default ChatPage;
