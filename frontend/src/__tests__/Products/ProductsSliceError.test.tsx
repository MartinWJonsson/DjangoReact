import * as slice from "../../features/products/productsSlice"
import { render, screen, act } from "@testing-library/react"
import { Provider } from "react-redux"
import Products from "../../features/products/Products"
import { store } from "../../app/store"
import axios from 'axios'
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Async Thunk', () => {
  test('fetching products with success', async () => {
    const fetchSpy = jest.spyOn(slice, 'fetchAsync')
    const mockHandleToggle = jest.fn()
    const error = {
        message: 'Request failed with status code 401',
        response: {
            data: {
                detail: 'Authentication credentials were not provided.',
            },
            status: 401,
        },
    }

    mockedAxios.delete.mockImplementationOnce(() => Promise.reject(error))

    await act(async () => {
      render(
        <Provider store={store}>
          <Products handleToggleModal={mockHandleToggle} />
        </Provider>
      )
    })

    await expect(fetchSpy).toHaveBeenCalled()
    expect(screen.getByTestId('product-ul').children.length).toEqual(0)
  })
})
