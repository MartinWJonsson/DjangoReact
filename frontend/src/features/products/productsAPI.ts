import { Product } from './productsSlice'
import axios from 'axios';

export async function fetchProducts() {
  const result = await (axios.get('http://127.0.0.1:8000/api/products'))
    .then((response) => { return response.data })
  return result;
}

export async function postNewProduct(product: Product) {
  const result = await (axios.post('http://127.0.0.1:8000/api/products', {
    product_name: product.product_name,
    product_description: product.product_description,
    product_price: product.product_price,
  }, {
    auth: { username: 'admin', password: 'password' }
  }))
    .then((response) => { return response.data })
    .catch((err) => { return err })
  return Promise.resolve(result)
}

export async function updateProduct(product: Product) {
  const result = await (axios.put('http://127.0.0.1:8000/api/products/' + product.id, {
    id: product.id,
    product_name: product.product_name,
    product_description: product.product_description,
    product_price: product.product_price,
  }, {
    auth: { username: 'admin', password: 'password' }
  }))
    .then((response) => { return response.data })
    .catch((err) => { return err })
  return Promise.resolve(result)
}

export async function deleteProduct(id: number) {
  await axios.delete('http://127.0.0.1:8000/api/products/' + id, {
    auth: { username: 'admin', password: 'password' }
  })
    .then((response) => { return response.data })
    .catch((err) => { return err })
}