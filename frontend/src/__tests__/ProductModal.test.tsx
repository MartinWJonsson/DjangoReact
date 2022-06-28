import {  render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import ProductModal from '../features/products/ProductModal'
import { shallow } from "enzyme";

describe('Product Modal', () => {
  test('Create new Product doesn´t render on start', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={() => console.log()} />
      </Provider>
    )

    expect(queryByText(/Create a new product!/i)).not.toBeInTheDocument();
  })

  test('Update Product doesn´t render on start', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={() => console.log()} product={{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }} />
      </Provider>
    )

    expect(queryByText("Update product!")).not.toBeInTheDocument();
  })

  test('handleToggleModal', () => {
    const fn = jest.fn()
    render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={fn} />
      </Provider>
    )
    expect(fn).toHaveBeenCalledTimes(0)
  })
})