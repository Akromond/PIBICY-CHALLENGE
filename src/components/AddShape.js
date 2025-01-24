// src/components/AddShape.js
import React from "react"
import { Button, Typography, Box } from "@mui/material"
import { PDFDocument, rgb } from "pdf-lib"

const AddShape = ({ file, setModifiedFile }) => {
  const handleAddShape = async () => {
    if (!file) {
      alert("No file selected.")
      return
    }

    try {
      if (file.type === "application/pdf") {
        // Handle PDF files
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Draw a rectangle (shape) on the first page
        firstPage.drawRectangle({
          x: 50,
          y: firstPage.getHeight() - 150,
          width: 100,
          height: 100,
          borderColor: rgb(1, 0, 0), // Red border
          borderWidth: 2
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

          // Draw a rectangle (shape) on the canvas
          ctx.strokeStyle = "red"
          ctx.lineWidth = 2
          ctx.strokeRect(50, 50, 100, 100) // Draw a rectangle at (50, 50)

          // Convert canvas to a new image file
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setModifiedFile(blob)
              } else {
                alert("Failed to create image blob.")
              }
            },
            file.type,
            1 // Quality (0 to 1)
          )
        }

        img.onerror = (error) => {
          console.error("Error loading image:", error)
          alert("Failed to load image.")
        }
      } else {
        alert("Adding shapes is only supported for PDF and image files.")
      }
    } catch (error) {
      console.error("Error adding shape:", error)
      alert("Failed to add shape to the document.")
    }
  }

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>
        Add Shape
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddShape}>
        Add Rectangle
      </Button>
    </Box>
  )
}

export default AddShape
