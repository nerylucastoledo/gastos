
import styles from './InvoiceItem.module.css'
import Edit from '../../assets/img/edit.png'
import Delete from '../../assets/img/delete.png'
import Info from '../../assets/img/info.png'
import { transformValueInReal } from '../../utils/utils'
import { useState } from 'react'
import { IBill } from '../InputSelect/Select'

interface IProps {
  invoice: IBill[];
  setModalEdit: React.Dispatch<React.SetStateAction<boolean | IBill>>;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean | IBill>>;
  setActiveTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  activeTooltip: boolean;
}

export const InvoiceItem = ({ invoice, setModalEdit, setModalDelete, setActiveTooltip, activeTooltip }: IProps) => {
  const [indexTooltip, setIndexTooltip] = useState(0)

  const handleClickInfo = (index: number) => {
    setActiveTooltip(true)
    setIndexTooltip(index)
  }

  return (
    <div className={`${styles['content']} ${styles['animate-right']}`}>
      {invoice.length ? invoice.map((item, index) => (
        <div key={`${item.item} - ${index + 1}`} className={styles['content-item']}>
          <div className={styles['content-item-icon']}>
            {item.description && (
              <>
                {activeTooltip && indexTooltip === index && (
                  <div className={styles['tooltip']}>
                    <p>{item.description}</p>
                  </div>
                )}
                <img onClick={() => handleClickInfo(index)} src={Info} alt="Icon info" />
              </>
            )}
            <img onClick={() => setModalEdit(item)} src={Edit} alt="Icon edit" />
            <img onClick={() => setModalDelete(item)} src={Delete} alt="Icon delete" />
          </div>
          <div className={styles['content-item-values']}>
            <p className={styles['content-item-values-title']}>{item.item}</p>
            <p style={{ display: 'block' }}>{transformValueInReal(item.value)}</p>
          </div>
        </div>
      )) : (
        <div className={styles['not-found']}>
          <p>Nenhum gasto \o/</p>
        </div>
      )}
    </div>
  )
}
