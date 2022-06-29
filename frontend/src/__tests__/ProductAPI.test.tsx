import axios from 'axios'
import * as API from '../features/products/productsAPI'
import { Product } from '../features/products/productsSlice'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API', () => {
  describe('fetchProducts', () => {
    test('uses the right API', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: null }),
      )

      await API.fetchProducts()

      const calledGetURL = mockedAxios.get.mock.calls[0][0]

      expect(calledGetURL.endsWith('api/products')).toBe(true)
    })

    test('resolves the returned promise with the response data', async () => {
      const response = {
        data: {
          product_name: "Korv",
          product_description: "Lång, för din njutning",
          product_price: 6.29
        },
        status: 200,
      }

      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(response),
      )

      await expect(API.fetchProducts()).resolves.toEqual(response.data)
    })
  })

  describe('postNewProduct', () => {
    test('uses the right API', async () => {
      mockedAxios.post.mockImplementationOnce(() =>
        Promise.resolve({ data: null }),
      )

      await API.postNewProduct({ product_name: "", product_description: "", product_price: 2 } as Product)

      const calledGetURL = mockedAxios.post.mock.calls[0][0]

      expect(calledGetURL.endsWith('api/products')).toBe(true)
    })

    test('resolves the returned promise with the response data', async () => {
      const response = {
        data: {
          product_name: "Korv",
          product_description: "Lång, för din njutning",
          product_price: 6.29
        },
        status: 200,
      }

      mockedAxios.post.mockImplementationOnce(() =>
        Promise.resolve(response),
      )

      await expect(API.postNewProduct(response.data)).resolves.toEqual(response.data)
    })

    test('return with an error', async () => {
      const response = {
        data: {
          id: 0,
        },
        status: 200,
      }

      const error = {
          message: 'Request failed with status code 401',
          response: {
              data: {
                  detail: 'Authentication credentials were not provided.',
              },
              status: 401,
          },
      }

      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error))

      await expect(API.postNewProduct({} as Product)).resolves.toBe(error)
    })
  })

  describe('updateProduct', () => {
    test('uses the right API', async () => {
      mockedAxios.put.mockImplementationOnce(() =>
        Promise.resolve({ data: null }),
      )

      await API.updateProduct({
        id: 0,
        product_name: "Korv",
        product_description: "Lång, för din njutning",
        product_price: 6.29
      } as Product)

      const calledGetURL = mockedAxios.put.mock.calls[0][0]

      expect(calledGetURL.endsWith('api/products/0')).toBe(true)
    })

    test('resolves the returned promise with the response data', async () => {
      const response = {
        data: {
          id: 0,
          product_name: "Korv",
          product_description: "Lång, för din njutning",
          product_price: 6.29
        },
        status: 200,
      }

      mockedAxios.put.mockImplementationOnce(() =>
        Promise.resolve(response),
      )

      await expect(API.updateProduct(response.data)).resolves.toEqual(response.data)
    })

    test('return with an error', async () => {
      const response = {
        data: {
          id: 0,
        },
        status: 200,
      }

      const error = {
          message: 'Request failed with status code 401',
          response: {
              data: {
                  detail: 'Authentication credentials were not provided.',
              },
              status: 401,
          },
      }

      mockedAxios.put.mockImplementationOnce(() => Promise.reject(error))

      await expect(API.updateProduct({} as Product)).resolves.toBe(error)
    })
  })

  describe('deleteProduct', () => {
    test('uses the right API', async () => {
      mockedAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({ data: null }),
      )

      await API.deleteProduct(0)

      const calledGetURL = mockedAxios.delete.mock.calls[0][0]

      expect(calledGetURL.endsWith('api/products/0')).toBe(true)
    })

    test('resolves the returned promise with the response data', async () => {
      const response = {
        data: {
          id: 0,
        },
        status: 200,
      }

      mockedAxios.delete.mockImplementationOnce(() =>
        Promise.resolve(response),
      )

      expect(await API.deleteProduct(0)).toEqual(undefined)
    })

    test('return with an error', async () => {
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

      await expect(API.deleteProduct(0)).resolves.toBe(undefined)
    })
  })
})