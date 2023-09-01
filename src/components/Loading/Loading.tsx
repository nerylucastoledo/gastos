import React from 'react'

const style: React.CSSProperties = {
  border: " 2rem solid var(--color-5)",
  borderRightColor: "var(--color-7)",
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
  animation: "spin 1s infinite",
}

export const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px'}}>
      <div style={{ ...style }}></div>
    </div>
  )
}