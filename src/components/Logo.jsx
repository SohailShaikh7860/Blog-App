import React from 'react'

function Logo({ width = "100px", className = "" }) {
  return (
    <div className={className} style={{ width }}>
      {/* Simple text logo placeholder */}
      <span className="font-extrabold text-xl">BlogApp</span>
    </div>
  )
}

export default Logo
