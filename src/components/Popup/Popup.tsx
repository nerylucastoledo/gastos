import React from 'react'
import styles from './Popup.module.css'

export const Popup = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles['container']}>
      <p data-testid={'text'}>{children}</p>
    </div>
  )
}
