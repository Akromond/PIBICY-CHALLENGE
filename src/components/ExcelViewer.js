import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"

const ExcelViewer = ({ file }) => {
  const [htmlContent, setHtmlContent] = useState("")

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const html = XLSX.utils.sheet_to_html(worksheet)
      setHtmlContent(html)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default ExcelViewer
