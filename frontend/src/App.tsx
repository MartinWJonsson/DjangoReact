import Products from './features/products/Products';
import Titlebar from './features/titlebar/Titlebar'
import './App.css';

function App() {
  return (
    <div className="App">
      <Titlebar/>
      <Products/>
    </div>
  );
}

export default App;
