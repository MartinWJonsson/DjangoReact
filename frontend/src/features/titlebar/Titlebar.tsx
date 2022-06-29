import styles from './Titlebar.module.css'
import ProductModal from '../products/ProductModal'
import { useState } from 'react'

function Titlebar(props: {handleToggleModal: Function}) {
  const [showModal, toggleModal] = useState(false)

  const handleGoldStar = () => {
    alert("💩")
  }

  const exitWindow = () => {
    alert("🚨 Please stand by, the police are on their way. 🚨")
  }

  return (
    <div className={styles.titleBar}>
      <ProductModal showModal={showModal} handleToggleModal={props.handleToggleModal} toggleModal={toggleModal} />
      <div>
        <h1>Tittle</h1>
      </div>
      <div className={styles.navbar}>
        <div>
          <button onClick={() => props.handleToggleModal(showModal, toggleModal)} className={styles.link} data-testid="add-product-button">Add new product</button>
          <button onClick={() => exitWindow()} className={styles.link} data-testid="tryck-inte-här">Tryck inte här</button>
          <button onClick={() => exitWindow()} className={styles.link} data-testid="eller-här">Eller här</button>
          <button className={styles.link} onClick={() => handleGoldStar()} data-testid="guld-stjärna">Guldstjärna!</button>
        </div>
      </div>
    </div>
  )
}

export default Titlebar