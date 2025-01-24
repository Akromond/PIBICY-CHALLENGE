import React, { useState } from "react"
import { Button, Typography, Box } from "@mui/material"
import { PDFDocument, rgb } from "pdf-lib"

const AddHighlight = ({ file, setModifiedFile }) => {
  const handleAddHighlight = async () => {
    if (!file) return

    try {
      if (file.type === "application/pdf") {
        // Handle PDF files
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Draw a semi-transparent rectangle (highlight) on the first page
        firstPage.drawRectangle({
          x: 50,
          y: firstPage.getHeight() - 150,
          width: 100,
          height: 100,
          color: rgb(1, 1, 0), // Yellow highlight
          opacity: 0.5 // Semi-transparent
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

          // Draw a semi-transparent rectangle (highlight) on the canvas
          ctx.fillStyle = "rgba(255, 255, 0, 0.5)" // Yellow highlight
          ctx.fillRect(50, 50, 100, 100) // Draw a rectangle at (50, 50)

          // Convert canvas to a new image file
          canvas.toBlob((blob) => {
            setModifiedFile(blob)
          }, file.type)
        }
      } else {
        alert("Adding highlights is only supported for PDF and image files.")
      }
    } catch (error) {
      console.error("Error adding highlight:", error)
      alert("Failed to add highlight to the document.")
    }
  }

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        Add Highlight
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddHighlight}>
        Add Highlight
      </Button>
    </Box>
  )
}

export default AddHighlight
