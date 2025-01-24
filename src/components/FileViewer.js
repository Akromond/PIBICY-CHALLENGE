import React from "react"
import PDFViewer from "./PDFViewer"
import ImageViewer from "./ImageViewer"
import DocViewer from "./DocViewer"
import ExcelViewer from "./ExcelViewer"
import MsgViewer from "./MsgViewer"

const FileViewer = ({ file }) => {
  const fileType = file?.type

  const renderViewer = () => {
    if (fileType === "application/pdf") {
      return <PDFViewer file={file} />
    } else if (fileType === "image/jpeg" || fileType === "image/png") {
      return <ImageViewer file={file} />
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <DocViewer file={file} />
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <ExcelViewer file={file} />
    } else if (fileType === "application/vnd.ms-outlook") {
      return <MsgViewer file={file} />
    } else {
      return <div>Unsupported file type</div>
    }
  }

  return <div style={{ marginTop: 16 }}>{renderViewer()}</div>
}

export default FileViewer
