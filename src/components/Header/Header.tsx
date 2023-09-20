import { useState } from 'react'
import Logo from '../../assets/img/logo.png'
import Logout from '../../assets/img/logout.png'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { NewCard } from '../FormNewCard/NewCard'
import { FormInsert } from '../FormGeneric/FormInsert'
import { useTheme } from '../../Context/ThemeContext'

export const Header = () => {
  const navigate = useNavigate()
  const { theme, switchTheme } = useTheme()

  const [mobileMenu, setMobileMenu] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemModal, setItemModal] = useState('')

  const handleLogout = () => {
    window.localStorage.clear()
    navigate('/login')
  }

  const openModal = (itemMenu: string) => {
    setMobileMenu(false)
    setItemModal(itemMenu)
    setIsModalOpen(true)
  }

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (isModalOpen) {
      const target = event.target as HTMLElement

      if (target.classList.value.includes('container')) {
        setIsModalOpen(false)
      }
    }
  }

  const itemSelected = () => {
    switch (itemModal) {
      case 'card':
        return <NewCard setIsModalOpen={setIsModalOpen} />
      case 'category':
        return <FormInsert nameInput='categoria' url='category' setIsModalOpen={setIsModalOpen} />
      case 'people':
        return <FormInsert nameInput='pessoa' url='people' setIsModalOpen={setIsModalOpen} />
      default:
        break
    }
  }

  return (
    <div className={`${styles['container']} ${isModalOpen && styles.active}`} onClick={closeModal}>
      <button
        aria-label='Menu'
        data-testid='btnMenu'
        className={`${styles['mobile-button']} ${mobileMenu && styles['mobile-button-active']}`}
        onClick={() => setMobileMenu(!mobileMenu)}>
      </button>

      <nav id='menu' className={`${styles['nav-mobile']} ${mobileMenu && styles['nav-mobile-active']}`}>
        <button onClick={() => openModal('card')}>Inserir cartão</button>
        <button onClick={() => openModal('category')}>Inserir categoria</button>
        <button onClick={() => openModal('people')}>Inserir pessoa</button>
        <button onClick={() => navigate('/new-bill')}>Inserir gasto</button>
        <button onClick={() => navigate('/report')}>Relatório</button>
        <a href='/profile'>Meu perfil</a>
      </nav>

      <img width={130} height={88} onClick={() => navigate('/')} src={Logo} alt="Logo da empresa" />

      <div className={styles['box-logout-theme']}>
        <label className="switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={switchTheme}/>
          <span className="slider round"></span>
        </label>
      </div>

      <img width={32} height={32} src={Logout} onClick={handleLogout} alt="Sair" />

      {isModalOpen && (
        <Modal>
          {itemSelected()}
        </Modal>
      )}
    </div>
  )
}
