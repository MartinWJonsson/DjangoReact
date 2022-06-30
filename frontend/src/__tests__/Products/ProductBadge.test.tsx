import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import * as Slice from '../../features/products/productsSlice'
import ProductBadge from '../../features/products/ProductBadge'
import * as API from '../../features/products/productsAPI'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Product Badge', () => {
  test('component did render', () => {
    const selectProductSpy = jest.fn()
    const toggleModalSpy = jest.fn()
    const handleToggleModalSpy = jest.fn()
    const removeProductSpy = jest.fn()

    const product: Slice.Product = { product_name: 'foo', product_description: 'bar', product_price: 100 }

    const { getByText } = render(
      <Provider store={store}>
        <ProductBadge product={product} selectProduct={selectProductSpy} toggleModal={toggleModalSpy} handleToggleModal={handleToggleModalSpy} showModal={false} handleDelete={removeProductSpy} />
      </Provider>
    );

    expect(getByText(/foo/i)).toBeInTheDocument();
    expect(getByText(/bar/i)).toBeInTheDocument();
  });

  describe('Functions', () => {
    test('clicking on badge', () => {
      const selectProductSpy = jest.fn()
      const toggleModalSpy = jest.fn()
      const handleToggleModalSpy = jest.fn()
      const removeProductSpy = jest.fn()

      const product: Slice.Product = { product_name: 'foo', product_description: 'bar', product_price: 100 }

      const { getByTestId } = render(
        <Provider store={store}>
          <ProductBadge product={product} selectProduct={selectProductSpy} toggleModal={toggleModalSpy} handleToggleModal={handleToggleModalSpy} showModal={false} handleDelete={removeProductSpy} />
        </Provider>
      );

      fireEvent.click(getByTestId('product-badge-click'))
      expect(selectProductSpy).toHaveBeenCalled()
      setTimeout(() => {
        expect(toggleModalSpy).toHaveBeenCalled()
      }, 60)
    });

    test('clicking remove product', () => {
      const selectProductSpy = jest.fn()
      const toggleModalSpy = jest.fn()
      const handleToggleModalSpy = jest.fn()
      const deleteSpy = jest.spyOn(API, 'deleteProduct')
      const sliceDeleteSpy = jest.spyOn(Slice, 'handleDeleteProduct')
      const response = {
        data: {
          id: 0,
        },
        status: 200,
      }

      mockedAxios.delete.mockImplementationOnce(() =>
        Promise.resolve(response),
      )

      const product: Slice.Product = { product_name: 'foo', product_description: 'bar', product_price: 100 }

      const { getByTestId } = render(
        <Provider store={store}>
          <ProductBadge product={product} selectProduct={selectProductSpy} toggleModal={toggleModalSpy} handleToggleModal={handleToggleModalSpy} showModal={false} handleDelete={Slice.handleDeleteProduct} />
        </Provider>
      );

      fireEvent.click(getByTestId('product-badge-remove'))
      expect(deleteSpy).toHaveBeenCalled()
      expect(sliceDeleteSpy).toHaveBeenCalled()
    });
  })
})