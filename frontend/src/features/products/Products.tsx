import styles from './Products.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useEffect, useState } from 'react';
import { fetchAsync, LoadingStatus, handleDeleteProduct } from './productsSlice'
import ProductModal from './ProductModal'
import ProductBadge from './ProductBadge'

function Products(props: { handleToggleModal: Function }) {
  const products = useAppSelector(state => state.products.products)
  const status = useAppSelector(state => state.products.status)
  const dispatch = useAppDispatch();
  const [showModal, toggleModal] = useState(false)
  const [chosenProduct, selectProduct] = useState()

  useEffect(() => {
    dispatch(fetchAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === LoadingStatus.LOADING) {
    return (
      <div className={styles.loader} data-testid="products-loader"></div>
    )
  } else {
    return (
      <div>
        <ProductModal showModal={showModal} toggleModal={toggleModal} handleToggleModal={props.handleToggleModal} product={chosenProduct} />
        <ul className={styles.ul} data-testid="product-ul">
          {products.map((product, index) => {
            return (
              <ProductBadge key={index} product={product} selectProduct={selectProduct} handleToggleModal={props.handleToggleModal} showModal={showModal} toggleModal={toggleModal} handleDelete={handleDeleteProduct} />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Products