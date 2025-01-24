import React, { useState } from 'react';
import { Button, Typography, Box, Chip } from '@mui/material';
import { analyzeImage } from '../services/aiService';

const AIImageAnalysis = () => {
  const [file, setFile] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyzeImage = async () => {
    if (file) {
      const result = await analyzeImage(file);
      setAnnotations(result || []);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Image Analysis
      </Typography>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <Button variant="contained" color="primary" onClick={handleAnalyzeImage} style={{ marginTop: 8 }}>
        Analyze Image
      </Button>
      {annotations.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Annotations:</Typography>
          {annotations.map((annotation, index) => (
            <Chip key={index} label={annotation} style={{ margin: 4 }} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AIImageAnalysis;