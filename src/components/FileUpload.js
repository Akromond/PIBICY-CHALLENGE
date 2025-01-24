import React from "react"
import { Button, Typography } from "@mui/material"

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <div>
      <input
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.msg"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginTop: 8 }}
      >
        Supported formats: PDF, DOC, XLS, JPG, PNG, MSG
      </Typography>
    </div>
  )
}

export default FileUpload
