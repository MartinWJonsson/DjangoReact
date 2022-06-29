import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { useAppDispatch } from '../../app/hooks'
import { postNewProduct, updateProduct } from './productsAPI'
import { Product, addProductAction, updateProductAction } from './productsSlice'

export default function ProductModal(props: { showModal: boolean, toggleModal: Function, handleToggleModal: Function, product?: Product }) {
  const dispatch = useAppDispatch();
  const [pName, updateName] = useState<string>("")
  const [pDesc, updateDescription] = useState<string>("")
  const [pPrice, updatePrice] = useState<number>(0)
  let title = props.product ? "Update product!" : "Create a new product!"

  useEffect(() => {
    if (props.product !== undefined) {
      handleNameChange(props.product.product_name)
      handleDescChange(props.product.product_description)
      handlePriceChange(props.product.product_price)
    }
  }, [props.product])

  const handleNameChange = (value: string) => {
    updateName(value)
  }

  const handleDescChange = (value: string) => {
    updateDescription(value)
  }

  const handlePriceChange = (value: number) => {
    updatePrice(value)
  }

  const handlePriceFocus = (event: any) => {
    event.target.select()
  }

  const handleToggleModal = () => {
    let modal = window.document.querySelector('.modal')
    if (modal !== null) modal.classList.toggle("hidden")
    if (props.product === undefined)
      setTimeout(() => {
        updateName("")
        updateDescription("")
        updatePrice(0)
      }, 250);
    props.handleToggleModal(props.showModal, props.toggleModal)
  }

  const submitProductForm = (event: React.SyntheticEvent, newProduct: {id?: number, product_name: string, product_description: string, product_price: number}) => {
    if (pName.length < 5 || pDesc.length < 5 || pPrice < .1) {
      alert("Please enter all of the fields correctly")
      event.preventDefault()
      return("Failed to submit")
    } else {
      if (props.product !== undefined) {
        const product: Product = { id: props.product.id, product_name: pName, product_description: pDesc, product_price: pPrice }
        updateProduct(product)
          .then((value) => dispatch(updateProductAction(value)))
        event.preventDefault()
        updateName("")
        updateDescription("")
        updatePrice(0)
      }
      else {
        const product: Product = { product_name: newProduct.product_name, product_description: newProduct.product_description, product_price: newProduct.product_price }
        postNewProduct(product)
          .then((responseProduct) =>
            dispatch(addProductAction(responseProduct))
          )
        event.preventDefault()
        updateName("")
        updateDescription("")
        updatePrice(0)
      }
      setTimeout(() => {
        handleToggleModal()
      }, 50);
      return props.product
    }
  }

  if (props.showModal) {
    return (
      <div className={styles.modal} id="modal" onClick={() => handleToggleModal()} data-testid="modal-background">
        <div className={styles.modalForm} onClick={(e) => e.stopPropagation()}>
          <div className={styles.title}>
            {title}
          </div>
          <form onSubmit={(e) => submitProductForm(e, {product_name: pName, product_description: pDesc, product_price: pPrice})}>
            <div className={styles.formCell}>
              <label>Product name</label>
              <input type="text" id="pname" className={styles.inputTextField} value={pName} onChange={(e) => handleNameChange(e.target.value)} placeholder="Name" autoFocus onFocus={(e) => e.target.select()}/>
            </div>
            <div className={styles.formCell}>
              <label>Description</label>
              <input type="text" id="pname" className={styles.inputTextField} value={pDesc} onChange={(e) => handleDescChange(e.target.value)} placeholder="Description" />
            </div>
            <div className={styles.formCell}>
              <label>Price</label>
              <input type="number" id="pname" className={styles.inputTextField} value={pPrice} onFocus={(e) => handlePriceFocus(e)} onChange={(e) => handlePriceChange(e.target.value !== "" ? parseFloat(e.target.value) : 0)} placeholder="0" step="any"/>
            </div>
            <input type="submit" value="Submit" className={styles.submit} data-testid="submit-button"/>
          </form>
        </div>
      </div>
    )
  }
  else {
    return (<></>)
  }
}