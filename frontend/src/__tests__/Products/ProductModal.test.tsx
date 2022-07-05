import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { resolve } from 'path';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ProductModal from '../../features/products/ProductModal'


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

  test('Update Product does render on start', () => {
    const handleToggleSpy = jest.fn()

    const { queryByText } = render(
      <Provider store={store}>
        <ProductModal showModal={true} toggleModal={() => console.log()} handleToggleModal={handleToggleSpy} product={{ product_name: "Korv", product_description: "Lång, för din njutning", product_price: 6.29 }} />
      </Provider>
    )

    expect(queryByText("Update product!")).toBeInTheDocument();
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

  test('close modal by clicking background', async () => {
    const toggleSpy = jest.fn()
    const handleToggleSpy = jest.fn()

    render(
      <Provider store={store}>
        <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
      </Provider>
    )

    await expect(screen.getByTestId('modal-background')).not.toHaveClass("hidden")
    fireEvent.click(screen.getByTestId('modal-background'))
    await expect(screen.getByTestId('modal-background')).toHaveClass("hidden")
    await waitFor(async () => await expect(handleToggleSpy).toHaveBeenCalled())
  })

  describe('Submitters', () => {
    describe('Update product', () => {
      test('submit form new product with product prop, no changes', async () => {
        const toggleSpy = jest.fn()
        const handleToggleSpy = jest.fn()
        global.alert = jest.fn()
    
        render(
          <Provider store={store}>
            <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} product={{ product_name: 'Halogen', product_description: 'Makes the night bareable', product_price: 10 }} />
          </Provider>
        )
    
        expect((screen.getByTestId('form-name-field') as HTMLInputElement).value).toBe('Halogen')
        expect((screen.getByTestId('form-desc-field') as HTMLInputElement).value).toBe('Makes the night bareable')
        expect((screen.getByTestId('form-price-field') as HTMLInputElement).value).toBe('10')
    
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(window.alert).not.toBeCalled()
      })
  
      test('submit form new product with product prop, remove values', async () => {
        const toggleSpy = jest.fn()
        const handleToggleSpy = jest.fn()
        global.alert = jest.fn()
  
        render(
          <Provider store={store}>
            <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} product={{ product_name: 'Halogen', product_description: 'Makes the night bareable', product_price: 10 }} />
          </Provider>
        )
  
        fireEvent.change(screen.getByTestId('form-name-field'), { target: { value: '' } })
        fireEvent.change(screen.getByTestId('form-desc-field'), { target: { value: '' } })
        fireEvent.change(screen.getByTestId('form-price-field'), { target: { value: '0' } })
  
        expect((screen.getByTestId('form-name-field') as HTMLInputElement).value).toBe("")
        expect((screen.getByTestId('form-desc-field') as HTMLInputElement).value).toBe("")
        expect((screen.getByTestId('form-price-field') as HTMLInputElement).value).toBe('0')
  
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(window.alert).toBeCalled()
      })
    })

    describe('Post new product', () => {
      test('submit form no product, enter correct values', async () => {
        const toggleSpy = jest.fn()
        const handleToggleSpy = jest.fn()
        global.alert = jest.fn()
  
        render(
          <Provider store={store}>
            <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
          </Provider>
        )
  
        fireEvent.change(screen.getByTestId('form-name-field'), { target: { value: 'Tea and biscuits' } })
        fireEvent.change(screen.getByTestId('form-desc-field'), { target: { value: 'elevensies' } })
        fireEvent.change(screen.getByTestId('form-price-field'), { target: { value: '12.49' } })
  
        expect((screen.getByTestId('form-name-field') as HTMLInputElement).value).toBe('Tea and biscuits')
        expect((screen.getByTestId('form-desc-field') as HTMLInputElement).value).toBe('elevensies')
        expect((screen.getByTestId('form-price-field') as HTMLInputElement).value).toBe('12.49')
  
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(window.alert).not.toBeCalled()
      })
  
      test('submit form no product, enter wrong values', async () => {
        const toggleSpy = jest.fn()
        const handleToggleSpy = jest.fn()
        global.alert = jest.fn()
  
        render(
          <Provider store={store}>
            <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
          </Provider>
        )
  
        expect((screen.getByTestId('form-name-field') as HTMLInputElement).value).toBe('')
        expect((screen.getByTestId('form-desc-field') as HTMLInputElement).value).toBe('')
        expect((screen.getByTestId('form-price-field') as HTMLInputElement).value).toBe('0')
  
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(window.alert).toBeCalled()
      })
  
      test('test autoFocus and autoSelection', async () => {
        const toggleSpy = jest.fn()
        const handleToggleSpy = jest.fn()
  
        render(
          <Provider store={store}>
            <ProductModal showModal={true} toggleModal={toggleSpy} handleToggleModal={handleToggleSpy} />
          </Provider>
        )

        await expect(document.activeElement).toEqual(screen.getByTestId('form-name-field'))
        fireEvent.focus(screen.getByTestId('form-price-field'))
      })
    })
  })
})