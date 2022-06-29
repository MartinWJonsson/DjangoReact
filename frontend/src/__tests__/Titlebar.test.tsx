import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import Titlebar from '../features/titlebar/Titlebar'

describe('Titlebar rendering', () => {
  test('title', () => {
    const mockToggle = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    expect(getByText(/Tittle/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const mockToggle = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    expect(getByText(/Add new product/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const mockToggle = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    expect(getByText(/Tryck inte här/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const mockToggle = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    expect(getByText(/Eller här/i)).toBeInTheDocument();
  });

  test('add product', () => {
    const mockToggle = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    expect(getByText(/Guldstjärna!/i)).toBeInTheDocument();
  });
})

describe('Functions', () => {
  test('toggleModal', async () => {
    const mockToggle = jest.fn()

    render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('add-product-button'))
    expect(window.alert).toBeCalled
    
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  test('clicking on Tryck inte här', () => {
    global.alert = jest.fn()
    const mockToggle = jest.fn()

    render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('tryck-inte-här'))
    expect(window.alert).toBeCalled
  })

  test('clicking on Eller här', () => {
    global.alert = jest.fn()
    const mockToggle = jest.fn()

    render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('eller-här'))
    expect(window.alert).toBeCalled
  })

  test('clicking on Guldstjärna', () => {
    global.alert = jest.fn()
    const mockToggle = jest.fn()

    render(
      <Provider store={store}>
        <Titlebar handleToggleModal={mockToggle}/>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('guld-stjärna'))
    expect(window.alert).toBeCalled
  })
})