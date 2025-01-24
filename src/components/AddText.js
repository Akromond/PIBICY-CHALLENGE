import React, { useState } from "react"
import { Button, TextField, Typography, Box } from "@mui/material"
import { PDFDocument, rgb } from "pdf-lib"

const AddText = ({ file, setModifiedFile }) => {
  const [text, setText] = useState("")

  const handleAddText = async () => {
    if (!file || !text) return

    try {
      if (file.type === "application/pdf") {
        // Handle PDF files
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Add text to the first page
        firstPage.drawText(text, {
          x: 50,
          y: firstPage.getHeight() - 50, // Position text at the top-left
          size: 30,
          color: rgb(0, 0, 0) // Black text
        })

        // Save the modified PDF
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: "application/pdf" })
        setModifiedFile(blob)
      } else if (file.type.startsWith("image/")) {
        // Handle image files (JPG, PNG)
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onload = async () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0)

          // Add text to the canvas
          ctx.font = "30px Arial"
          ctx.fillStyle = "black"
          ctx.fillText(text, 50, 50) // Position text at the top-left

          // Convert canvas to a new image file
          canvas.toBlob((blob) => {
            setModifiedFile(blob)
          }, file.type)
        }
      } else {
        alert("Adding text is only supported for PDF and image files.")
      }
    } catch (error) {
      console.error("Error adding text:", error)
      alert("Failed to add text to the document.")
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      <TextField
        label="Enter Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddText}
        style={{ marginTop: 8 }}
      >
        Add Text
      </Button>
    </div>
  )
}

export default AddText
