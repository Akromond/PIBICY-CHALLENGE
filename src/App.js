import React, { useState } from "react"
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box
} from "@mui/material"
import FileUpload from "./components/FileUpload"
import FileViewer from "./components/FileViewer"
import Toolbar from "./components/Toolbar"
import AITextExtraction from "./components/AITextExtraction"
import AISummarization from "./components/AISummarization"
import AIImageAnalysis from "./components/AIImageAnalysis"
import AIChatbot from "./components/AIChatbot" // Import the chatbot component
import theme from "./theme"

const App = () => {
  const [file, setFile] = useState(null)
  const [extractedText, setExtractedText] = useState("")

  const handleFileUpload = (selectedFile) => {
    setFile(selectedFile)
  }

  const handleExtractedText = (text) => {
    setExtractedText(text)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Pibicy Front-End Developer Challenge
          </Typography>
          <FileUpload onFileUpload={handleFileUpload} />
          {file && (
            <>
              <Toolbar file={file} />
              <FileViewer file={file} />
              {/* <AITextExtraction onExtractedText={handleExtractedText} />
              <AISummarization text={extractedText} />
              <AIImageAnalysis />
              <AIChatbot documentText={extractedText} />  */}
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
