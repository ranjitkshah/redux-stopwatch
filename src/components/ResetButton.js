import React from 'react'

export default function ResetButton({ reset }) {
  return (
    <div>
      <button onClick={reset} className="redBtn">Reset</button>
    </div>
  )
}
