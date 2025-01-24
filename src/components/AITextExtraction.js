import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { extractTextFromImage } from '../services/aiService';

const AITextExtraction = ({ onExtractedText }) => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExtractText = async () => {
    if (file) {
      const text = await extractTextFromImage(file);
      setExtractedText(text || 'Failed to extract text.');
      onExtractedText(text); // Pass the extracted text to the parent component
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Text Extraction
      </Typography>
      <input type="file" onChange={handleFileChange} accept="image/*, application/pdf" />
      <Button variant="contained" color="primary" onClick={handleExtractText} style={{ marginTop: 8 }}>
        Extract Text
      </Button>
      {extractedText && (
        <TextField
          label="Extracted Text"
          value={extractedText}
          multiline
          fullWidth
          variant="outlined"
          style={{ marginTop: 16 }}
        />
      )}
    </Box>
  );
};

export default AITextExtraction;