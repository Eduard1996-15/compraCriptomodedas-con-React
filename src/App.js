import './App.css';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from './componentes/Dashboard';
import { store } from './Store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
