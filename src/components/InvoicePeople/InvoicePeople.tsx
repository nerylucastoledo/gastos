import React from 'react'
import styles from './InvoicePeople.module.css'

interface IProps {
  peoples: string[];
  peopleSelected: string;
  setPeopleSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const InvoicePeople = ({ peoples, setPeopleSelected, peopleSelected }: IProps) => {
  return (
    <ul className={`${styles['people-content']} ${styles['animate-right']}`}>
      <li 
        onClick={() => setPeopleSelected('Eu')} 
        className={`${styles['people-content-item']} ${'Eu' === peopleSelected ? `${styles['active']} active` : ''}`}
      >
        Eu
      </li>
      {peoples.map((people, index) => (
        <li 
          onClick={() => setPeopleSelected(people)} 
          key={`${people} - ${index + 1}`} 
          className={`${styles['people-content-item']} ${people === peopleSelected ? styles['active'] : ''}`}
        >
          {people}
        </li>
      ))}
    </ul>
  )
}
