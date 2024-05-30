import 'bootstrap/dist/css/bootstrap.min.css';  // Importar estilos de Bootstrap
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';  // Importar estilos personalizados

// Renderizar el componente App en el elemento con id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
