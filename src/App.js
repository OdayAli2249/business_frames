import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './state_management/store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
