import React, { useEffect, useState } from "react"
import { MsgParser } from "msg-parser"

const MsgViewer = ({ file }) => {
  const [msgContent, setMsgContent] = useState("")

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      const msgParser = new MsgParser(arrayBuffer)
      const msg = msgParser.parse()
      setMsgContent(JSON.stringify(msg, null, 2))
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  return <pre>{msgContent}</pre>
}

export default MsgViewer
