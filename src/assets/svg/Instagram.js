import * as React from "react"

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
      className="prefix__feather prefix__feather-instagram"
      {...props}
    >
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <path d="M16 11a4 4 0 11-3-3 4 4 0 013 3zm2-4h0" />
    </svg>
  )
}

export default SvgComponent
