import React, { useEffect, useState } from "react"
import { PDFDocument } from "pdf-lib"

const PDFViewer = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState("")

  useEffect(() => {
    const loadPdf = async () => {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    }

    loadPdf()
  }, [file])

  return <iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" />
}

export default PDFViewer
