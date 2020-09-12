import React from 'react'

export default function StartButton({ start, started }) {
  return (
    <div>
      <button onClick={start} disabled={started} className="greenBtn">Start</button>
    </div>
  )
}
