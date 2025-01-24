import React, { useState } from 'react';
import { Button, TextField, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { askQuestion } from '../services/aiService';

const AIChatbot = ({ documentText }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleAskQuestion = async () => {
    if (question && documentText) {
      const answer = await askQuestion(documentText, question);
      setChatHistory([...chatHistory, { question, answer }]);
      setQuestion(''); // Clear the input after asking
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Chatbot
      </Typography>
      <TextField
        label="Ask a question about the document"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAskQuestion}
        style={{ marginTop: 8 }}
      >
        Ask
      </Button>
      {chatHistory.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Chat History:</Typography>
          <List>
            {chatHistory.map((chat, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Q: ${chat.question}`}
                  secondary={`A: ${chat.answer}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AIChatbot;