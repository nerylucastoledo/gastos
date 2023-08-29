import React from 'react'
import styles from './Input.module.css'

interface IInput extends React.ComponentProps<'input'> {
  label: string;
  typeInput: "border" | "normal";
}

export const Input = ({ label, typeInput, ...props }: IInput) => {
  return (
    <>
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input className={`${styles['input']} ${styles[typeInput]}`} name={label.toLowerCase()} id={label.toLowerCase()} { ...props }/>
    </>
  )
}
