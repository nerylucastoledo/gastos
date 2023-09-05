import React from 'react'
import styles from './Popup.module.css'

interface IProps extends React.PropsWithChildren{
  background?: string;
}

export const Popup = ({ children, background }: IProps) => {
  return (
    <div className={styles['container']} style={{ background: background ?? 'red'}}>
      <p data-testid={'text'}>{children}</p>
    </div>
  )
}
