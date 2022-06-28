import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import Titlebar from '../features/titlebar/Titlebar'

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

  test('add product', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Tryck inte här/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Eller här/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Guldstjärna!/i)).toBeInTheDocument();
  });
})