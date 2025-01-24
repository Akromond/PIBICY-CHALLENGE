import React from "react"

const ImageViewer = ({ file }) => {
  const imageUrl = URL.createObjectURL(file)

  return (
    <div>
      <img
        src={imageUrl}
        alt="Uploaded"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}

export default ImageViewer
