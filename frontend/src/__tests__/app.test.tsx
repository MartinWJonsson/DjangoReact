import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store';
import App, { handleToggleModal} from '../App'

describe('App', () => {
  test('handleToggleModal', async () => {
    const mockToggle = jest.fn()
    
    await expect(handleToggleModal(false, mockToggle)).toBe(true)
    await expect(handleToggleModal(true, mockToggle)).toBe(false)

    expect(mockToggle).toHaveBeenCalled()
  })
})