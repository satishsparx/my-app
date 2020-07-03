import React from 'react';
import './App.css';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';

function App() {
  const store = createStore( reducers );
  return (
    <div className="App">
      <Provider store={store} >
        <header>
          <Home />
        </header>
      </Provider>
    </div>
  );
}

export default App;
