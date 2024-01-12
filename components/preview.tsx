"use client"
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import "react-quill/dist/quill.bubble.css"

interface PreviewProps{
    value:string
}

export const Preview = ({value}:PreviewProps) => {
    const ReactQuill=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[])
  return (
    <div className="bg-white">
        <ReactQuill 
        theme="snow"
        value={value}
        readOnly/>
    </div>
  )
}
