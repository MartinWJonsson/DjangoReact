import styles from './Products.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchAsync } from './productsSlice'
import { useEffect, useState } from 'react';
import { LoadingStatus } from './productsSlice'
import ProductModal from './ProductModal'
import ProductBadge from './ProductBadge'


function Products() {
  const products = useAppSelector(state => state.products.products)
  const status = useAppSelector(state => state.products.status)
  const dispatch = useAppDispatch();
  const [showModal, toggleModal] = useState(false)
  const [chosenProduct, selectProduct] = useState()

  useEffect(() => {
    if (status === LoadingStatus.IDLE) {
      dispatch(fetchAsync())
    }
  }, [])

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

  if (status === LoadingStatus.LOADING) {
    return (
      <div className={styles.loader}></div>
    )
  } else {

    return (
      <div>
        <ProductModal showModal={showModal} toggleModal={handleToggleModal} product={chosenProduct} />
        <ul className={styles.ul}>
          {products.map((product, index) => {
            if (product !== undefined)
              return (
                <ProductBadge key={index} product={product} selectProduct={selectProduct} toggleModal={handleToggleModal} showModal={showModal}/>
              )
          })}
        </ul>
      </div>
    )
  }
}

export default Products