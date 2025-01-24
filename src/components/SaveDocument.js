import React from "react"
import { saveAs } from "file-saver"
import { Button } from "@mui/material"

const SaveDocument = ({ file, modifiedFile }) => {
  const handleSave = () => {
    if (modifiedFile) {
      saveAs(modifiedFile, file.name)
    } else {
      alert("No modifications to save.")
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Document
      </Button>
    </div>
  )
}

export default SaveDocument
