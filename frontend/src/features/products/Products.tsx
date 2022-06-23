import styles from './Products.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchAsync } from './productsSlice'
import { useEffect, useState } from 'react';
import { Product, deleteProductAction, addProductAction, LoadingStatus } from './productsSlice'
import { postNewProduct, deleteProduct } from './productsAPI'
import ProductModal from './ProductModal'


export function Products() {
    const products = useAppSelector(state => state.products.products)
    const status = useAppSelector(state => state.products.status)
    const dispatch = useAppDispatch();
    const [showModal, toggleModal] = useState(false)
    const [chosenProduct, selectProduct] = useState()
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        if (status === LoadingStatus.IDLE) {
            dispatch(fetchAsync())
            setCurrentTime(Date.now() + 2500)
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

    const ShowBadge = (props: any) => {
        let product = props.product

        const handleUpdateProduct = () => {
            selectProduct(product)
            setTimeout(() => {
                toggleModal(!showModal)
            }, 50);
        }

        const handleDeleteProduct = (event: any) => {
            deleteProduct(product.id)
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
                                <ShowBadge key={index} product={product} />
                            )
                    })}
                </ul>
            </div>
        )
    }
}