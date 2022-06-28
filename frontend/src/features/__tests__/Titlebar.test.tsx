import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import reducer, { addProductAction, deleteProductAction, updateProductAction, LoadingStatus } from '../products/productsSlice'
import App from '../../App';
import ProductModal from '../../features/products/ProductModal'

describe('Titlebar did render', () => {
  test('title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Tittle/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Add new product/i)).toBeInTheDocument();
  });
})