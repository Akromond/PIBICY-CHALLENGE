// src/components/Toolbar.js
import React from "react"
import { ButtonGroup, Box } from "@mui/material"
import AddText from "./AddText"
import AddShape from "./AddShape"
import AddHighlight from "./AddHighlight"

const Toolbar = ({ file, setModifiedFile }) => {
  return (
    <Box my={2}>
      <ButtonGroup variant="contained" color="primary">
        <AddText file={file} setModifiedFile={setModifiedFile} />
        <AddShape file={file} setModifiedFile={setModifiedFile} />
        <AddHighlight file={file} setModifiedFile={setModifiedFile} />
      </ButtonGroup>
    </Box>
  )
}

export default Toolbar
