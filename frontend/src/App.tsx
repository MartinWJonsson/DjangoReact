import Products from './features/products/Products';
import Titlebar from './features/titlebar/Titlebar';
import './App.css';

export const handleToggleModal = (showModal: boolean, toggleModal: Function) => {
  if (showModal) {
    setTimeout(() => {
      toggleModal(false)
    }, 250);
    return false
  }
  else {
    toggleModal(true)
    return true
  }
}

function App() {
  return (
    <div className="App" data-testid="app-container">
      <Titlebar handleToggleModal={handleToggleModal} />
      <Products handleToggleModal={handleToggleModal} />
    </div>
  );
}

export default App;
