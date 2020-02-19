import React from "react"

function SvgComponent(props) {
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
      className="prefix__feather prefix__feather-chevron-left"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export default SvgComponent
