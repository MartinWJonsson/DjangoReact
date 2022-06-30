import { fireEvent, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Products from '../../features/products/Products'
import reducer, { addProductAction, LoadingStatus } from '../../features/products/productsSlice'
import * as API from '../../features/products/productsAPI'

jest.mock('../../features/products/ProductBadge')
jest.mock('../../features/products/ProductModal')

describe('Products', () => {
  test('fetchProducts', async () => {
    const toggleModalSpy = jest.fn()
    const fetchAPI = jest.spyOn(API, 'fetchProducts')

    const previousState = {
      products: [{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }],
      status: LoadingStatus.IDLE
    }

    const tempStore = (
      reducer(previousState, addProductAction({ product_name: "Chewing gum", product_description: "Now comes in PRE-CHEWED™", product_price: 1.12 }))
    )

    // console.log(tempStore)
    // console.log(store.getState())

    render(
      <Provider store={store}>
        <Products handleToggleModal={toggleModalSpy} />
      </Provider>
    )

    await expect(toggleModalSpy).not.toHaveBeenCalled()
    await expect(fetchAPI).toHaveBeenCalled()
  })
})