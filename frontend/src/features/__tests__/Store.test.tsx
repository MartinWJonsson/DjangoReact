import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import reducer, { addProductAction, deleteProductAction, updateProductAction, LoadingStatus } from '../products/productsSlice'
import App from '../../App';
import ProductModal from '../../features/products/ProductModal'


test('Return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    {
      products: [],
      status: 0
    }
  )
})

test('Can add product into empy list', () => {
  const previousState = { products: [], status: LoadingStatus.IDLE }
  expect(reducer(previousState, addProductAction({ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }))).toEqual(
    {
      products: [{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }],
      status: LoadingStatus.IDLE
    }
  )
})

test('Can add product into existing list and check unsorted', () => {
  const previousState = {
    products: [{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }],
    status: LoadingStatus.IDLE
  }
  expect(reducer(previousState, addProductAction({ product_name: "Chewing gum", product_description: "Now comes in PRE-CHEWED™", product_price: 1.12 }))).not.toEqual(
    {
      products: [{
        product_name: "Korv",
        product_description: "Lång, för din njutning",
        product_price: 6.29
      }, {
        product_name: "Chewing gum",
        product_description: "Now comes in PRE-CHEWED™",
        product_price: 1.12
      },],
      status: LoadingStatus.IDLE
    }
  )
})

test('Can add product into existing list and sort it', () => {
  const previousState = {
    products: [{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }],
    status: LoadingStatus.IDLE
  }
  expect(reducer(previousState, addProductAction({ product_name: "Chewing gum", product_description: "Now comes in PRE-CHEWED™", product_price: 1.12 }))).toEqual(
    {
      products: [{
        product_name: "Chewing gum",
        product_description: "Now comes in PRE-CHEWED™",
        product_price: 1.12
      }, {
        product_name: "Korv",
        product_description: "Lång, för din njutning",
        product_price: 6.29
      },],
      status: LoadingStatus.IDLE
    }
  )
})

test('Can update a product', () => {
  const previousState = {
    products: [{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }],
    status: LoadingStatus.IDLE
  }
  expect(reducer(previousState, updateProductAction({ product_name: "Wiener", product_description: "Red, hot, and only contains 12% bug.", product_price: 1.99 }))).toEqual(
    {
      products: [{ product_name: "Wiener", product_description: "Red, hot, and only contains 12% bug.", product_price: 1.99 }],
      status: LoadingStatus.IDLE
    }
  )
})

test('Can remove product from list', () => {
  const previousState = { products: [{ id: 0, product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }], status: LoadingStatus.IDLE }
  expect(reducer(previousState, deleteProductAction(0))).toEqual(
    {
      products: [],
      status: LoadingStatus.IDLE
    }
  )
})