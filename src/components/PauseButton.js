import React from 'react'

export default function PauseButton({ pause }) {
  return (
    <div>
      <button onClick={pause} className="redBtn">Pause</button>
    </div>
  )
}
