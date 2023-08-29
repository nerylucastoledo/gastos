import React from 'react'
import styles from './Button.module.css'

export interface BtnProps extends React.ComponentProps<"button"> {
  typeBtn: "principal" | "accepted" | "refused"
}

export const Button = ({ typeBtn, children, ...props }: BtnProps) => {
  return (
    <button 
      className={`${styles['button']} ${styles[typeBtn]}`} 
      { ...props }
    >
      {children}
    </button>
  )
}
