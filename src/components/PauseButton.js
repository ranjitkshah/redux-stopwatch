import React from 'react'

export default function PauseButton({ pause }) {
  return (
    <div>
      <button onClick={pause}>Pause</button>
    </div>
  )
}
