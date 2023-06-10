import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <div className="bg-gray-300 text-gray-600 font-mono">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
    
    
  </React.StrictMode>
);


