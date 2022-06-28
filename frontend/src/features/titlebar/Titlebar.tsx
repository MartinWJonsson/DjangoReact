import styles from './Titlebar.module.css'
import ProductModal from '../products/ProductModal'
import { useState } from 'react'

function Titlebar() {
  const [showModal, toggleModal] = useState(false)
  
  const handleToggleModal = () => {
    if (showModal) {
      setTimeout(() => {
        toggleModal(!showModal)
      }, 250);
    }
    else {
      toggleModal(!showModal)
    }
  }

  const handleGoldStar = () => {
    alert("💩")
  }

  const exitWindow = () => {
    alert("🚨 Please stand by, the police are on their way. 🚨")
  }

  return (
    <div className={styles.titleBar}>
      <ProductModal showModal={showModal} toggleModal={handleToggleModal} />
      <div>
        <h1>Tittle</h1>
      </div>
      <div className={styles.navbar}>
        <div>
          <button onClick={() => handleToggleModal()} className={styles.link}>Add new product</button>
          <button onClick={() => exitWindow()} className={styles.link}>Tryck inte här</button>
          <button onClick={() => exitWindow()} className={styles.link}>Eller här</button>
          <button className={styles.link} onClick={() => handleGoldStar()}>Guldstjärna!</button>
        </div>
      </div>
    </div>
  )
}

export default Titlebar