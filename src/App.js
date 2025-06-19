import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataEntry from './Components/DataEntery';
import Home from './Components/Home';
import CounterApp from './Redux/CounterApp';
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data_entry" element={<DataEntry />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
