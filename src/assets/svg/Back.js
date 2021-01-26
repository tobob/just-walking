import React from "react"

function Back(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-chevrons-left"
      {...props}
    >
      <path d="M11 17l-5-5 5-5m7 10l-5-5 5-5" />
    </svg>
  )
}

export default Back
