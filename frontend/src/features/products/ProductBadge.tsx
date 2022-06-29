import styles from './Products.module.css';
import React from 'react'
import { deleteProduct } from './productsAPI'
import { deleteProductAction, Product, handleUpdateProduct } from './productsSlice'
import { useAppDispatch } from '../../app/hooks'

const ProductBadge = (props: {product: Product, selectProduct: Function, handleToggleModal: Function, showModal: Boolean, toggleModal: Function, handleDelete: Function}) => {
  const dispatch = useAppDispatch();
  const product: Product = props.product

  return (
    <li className={styles.li} onClick={() => handleUpdateProduct(product, props.selectProduct, props.toggleModal)} data-testid="product-badge-click">
      <button className={styles.removeButton} onClick={(e) => props.handleDelete(e, product.id as number, dispatch)} data-testid="product-badge-remove">X</button>
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