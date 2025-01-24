import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { summarizeText } from '../services/aiService';

const AISummarization = ({ text }) => {
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    if (text) {
      const result = await summarizeText(text);
      setSummary(result || 'Failed to generate summary.');
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Summarization
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSummarize}>
        Summarize
      </Button>
      {summary && (
        <TextField
          label="Summary"
          value={summary}
          multiline
          fullWidth
          variant="outlined"
          style={{ marginTop: 16 }}
        />
      )}
    </Box>
  );
};

export default AISummarization;