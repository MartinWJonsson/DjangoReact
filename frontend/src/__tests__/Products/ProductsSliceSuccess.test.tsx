import * as slice from "../../features/products/productsSlice"
import { render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import Products from "../../features/products/Products"
import { store } from "../../app/store"

describe('Async Thunk', () => {
  test('fetching products with success', async () => {
    const fetchSpy = jest.spyOn(slice, 'fetchAsync')
    const mockHandleToggle = jest.fn()

    render(
      <Provider store={store}>
        <Products handleToggleModal={mockHandleToggle} />
      </Provider>
    )

    await expect(fetchSpy).toHaveBeenCalled()
    await waitFor(() => expect(screen.getByTestId('product-ul').children.length).toBeGreaterThanOrEqual(1))
  })
})
