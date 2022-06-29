import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import ProductModal from '../features/products/ProductModal'

describe('Product Modal', () => {
  test('Modal does render', () => {
    const handleToggleSpy = jest.fn()

    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={true} toggleModal={() => console.log()} handleToggleModal={handleToggleSpy} />
      </Provider>
    )

    expect(queryByText(/Create a new product!/i)).toBeInTheDocument();
  })

  test('Create new Product doesn´t render on start', () => {
    const handleToggleSpy = jest.fn()

    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={() => console.log()} handleToggleModal={handleToggleSpy} />
      </Provider>
    )

    expect(queryByText(/Create a new product!/i)).not.toBeInTheDocument();
  })

  test('Update Product doesn´t render on start', () => {
    const handleToggleSpy = jest.fn()

    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={() => console.log()} handleToggleModal={handleToggleSpy} product={{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }} />
      </Provider>
    )

    expect(queryByText("Update product!")).not.toBeInTheDocument();
  })

  test('close modal by clicking background', () => {
    const toggleSpy = jest.fn()
    const handleToggleSpy = jest.fn()

    render(
      <Provider store={store}>
        <ProductModal showModal={false} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
      </Provider>
    )
    expect(toggleSpy).toHaveBeenCalledTimes(0)
  })

  test('submit form new product', async () => {
    const toggleSpy = jest.fn()
    const handleToggleSpy = jest.fn()
    global.alert = jest.fn()

    render(
      <Provider store={store}>
        <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} product={{ product_name: 'Halogen', product_description: 'Makes the night bareable', product_price: 10 }} />
      </Provider>
    )

    fireEvent.click(screen.getByTestId('submit-button'))
    expect(window.alert).toBeCalled
    setTimeout(() => {
      expect(handleToggleSpy).toHaveBeenCalled()
    }, 60);
  })

  test('submit form no product', async () => {
    const toggleSpy = jest.fn()
    const handleToggleSpy = jest.fn()
    global.alert = jest.fn()

    render(
      <Provider store={store}>
        <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
      </Provider>
    )

    fireEvent.click(screen.getByTestId('submit-button'))
    expect(window.alert).toBeCalled
    expect(toggleSpy).not.toHaveBeenCalled()
  })
})