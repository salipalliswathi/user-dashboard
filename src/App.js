
import './App.css';
import AppRoutes from './router/index.js'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/store.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
         <AppRoutes/>
      </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
