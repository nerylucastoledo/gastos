import styles from './ProfileItem.module.css'

import { CardList, CategoryList, PeopleList } from '../../Context/DataByFilters';

import IconDelete from '../../assets/img/delete.png'
import IconEdit from '../../assets/img/edit.png'

import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { Input } from '../input/Input';
import { Button } from '../Button/Button';
import { sendData } from '../../utils/SendDataApi';
import { Popup } from '../Popup/Popup';

interface IProps {
  title: string;
  nameItem: 'category' | 'people' | 'card';
  data: CardList[] | PeopleList[] | CategoryList[] | undefined;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const KEY_MAP = {
  "category": "Categoria",
  "people": "Pessoa",
  "card": "Cartão",
}

export const ProfileItem = ({ title, nameItem, data, setUpdate }: IProps) => {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [name, setName] = useState('')
  const [itemSelected, setItemSelected] = useState<CardList | PeopleList | CategoryList | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  
  const username = window.localStorage.getItem('username')

  const openModalEdit = (item: CardList | PeopleList | CategoryList) => {
    setItemSelected(item)
    setName(item.name)
    setIsModalOpenEdit(true)
  }

  const openModalDelete = (item: CardList | PeopleList | CategoryList) => {
    setItemSelected(item)
    setName(item.name)
    setIsModalOpenDelete(true)
  }

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (isModalOpenEdit || isModalOpenDelete) {
      const target = event.target as HTMLElement

      if (target.classList.value.includes('container')) {
        setIsModalOpenEdit(false)
        setIsModalOpenDelete(false)
      }
    }
  }

  const updateItem = () => {
    if (itemSelected) {
      const config = {
        method: 'PUT',
        body: JSON.stringify({ 
          id: itemSelected.id,
          name: name, 
          username: username
        }),
        headers: {
        'Content-Type': 'application/json',
        },
      }
  
      const response = sendData(`http://localhost:8080/${nameItem}/${itemSelected?.id}`, { ...config })
      response.then((res) => {
        if (res.ok) {
          setUpdate(true)
          setIsModalOpenEdit(false)
          return
        }

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 2000)
      })
    }
  }

  const deleteItem = () => {
    if (itemSelected) {
      const response = sendData(`http://localhost:8080/${nameItem}/${itemSelected?.id}`, { method: 'DELETE' })
      response.then((res) => {
        if (res.ok) {
          setUpdate(true)
          setIsModalOpenDelete(false)
          return
        }

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 2000)
      })
    }
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    if (isModalOpenEdit) {
      updateItem()
      return
    }

    deleteItem()
  }

  if (data === null) return null
  return (
    <div className={`${styles['container']} ${(isModalOpenEdit || isModalOpenDelete) && styles.active}`} onClick={closeModal}>

      {isModalOpenEdit && (
        <>
          <Modal>
            {showPopup ? <Popup background={'red'}>Ocorreu um erro interno!</Popup> : null}
            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '32px' }}>
              <Input
                label={KEY_MAP[nameItem]}
                typeInput="normal" 
                placeholder="Digite o nome" 
                type="text"
                data-testid='input-name'
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                style={{ width: '100%', marginTop: '6px' }}
                styleLabel={{ color: 'var(--color-7)', fontWeight: 'bold' }}
              />
            </div>

            <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Atualizar</Button>
          </form>
        </Modal></>
      )}

      {isModalOpenDelete && (
        <>
          <Modal>
            {showPopup ? <Popup background={'red'}>Ocorreu um erro interno!</Popup> : null}
            <p className={styles['text-delete']}>Todos os dados com esse nome serão deletados. <br></br> Tem certeza que quer deletar o(a) <b>{itemSelected?.name}</b>?</p>
            <div className={styles['btn-delete']}>
              <Button typeBtn='accepted' onClick={() => handleSubmit()}>Sim</Button>
              <Button typeBtn='refused' onClick={() => setIsModalOpenDelete(false)}>Não</Button>
            </div>
        </Modal></>
      )}

      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['profile']}>
        {data ? data.map((item) => (
          <div className={styles['profile-item']} key={`${item.name} - ${item.id}`}>
            <p>{item.name}</p>

            <img 
              onClick={() => openModalEdit(item)} 
              style={{ marginRight: '8px' }} 
              src={IconEdit} 
              alt="Icon editar" 
            />
            <img 
              onClick={() => openModalDelete(item)} 
              src={IconDelete} 
              alt="Icon deletar" 
            />
          </div>
        )) : <p>OLa</p>}
      </div>
    </div>
  )
}
