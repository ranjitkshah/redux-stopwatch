import React from 'react'

export default function ResumeButton({ resume }) {
  return (
    <div>
      <button onClick={resume} className="greenBtn" >Resume</button>
    </div>
  )
}

