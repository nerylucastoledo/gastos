import React from 'react'
import styles from './Modal.module.css'

export const Modal = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles['modal']}>
      {children}
    </div>
  )
}
