import styles from './Products.module.css';
import React from 'react'
import { deleteProduct } from './productsAPI'
import { deleteProductAction, Product } from './productsSlice'
import { useAppDispatch } from '../../app/hooks'

const ProductBadge = (props: {product: Product, selectProduct: Function, toggleModal: Function, showModal: Boolean}) => {
  const dispatch = useAppDispatch();
  const product: Product = props.product

  const handleUpdateProduct = () => {
    props.selectProduct(product)
    setTimeout(() => {
      props.toggleModal(!props.showModal)
    }, 50);
  }

  const handleDeleteProduct = (event: React.SyntheticEvent) => {
    deleteProduct(product.id as number)
    dispatch(deleteProductAction(product.id))
    event.stopPropagation()
  }

  return (
    <li className={styles.li} onClick={() => handleUpdateProduct()}>
      <button className={styles.removeButton} onClick={(e) => handleDeleteProduct(e)}>X</button>
      <div className={styles.title}>
        {product.product_name}
      </div>
      <div className={styles.description}>
        {product.product_description}
      </div>
      <div className={styles.price}>
        {product.product_price.toLocaleString()}$
      </div>
    </li>
  )
}

export default ProductBadge