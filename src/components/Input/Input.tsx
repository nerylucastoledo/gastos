import React from 'react'
import styles from './Input.module.css'

interface IInput extends React.ComponentProps<'input'> {
  label: string;
  typeInput: "border" | "normal";
  styleLabel?: React.CSSProperties
}

export const Input = ({ label, styleLabel, typeInput, ...props }: IInput) => {
  return (
    <>
      <label htmlFor={label.toLowerCase()} style={{ ...styleLabel }}>{label}</label>
      <input className={`${styles['input']} ${styles[typeInput]}`} name={label.toLowerCase()} id={label.toLowerCase()} { ...props }/>
    </>
  )
}
