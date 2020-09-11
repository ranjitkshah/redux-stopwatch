import React from 'react'
import Timer from './components/Timer'
import './app.css'
import { createStore } from 'redux'
import reducer from './redux/reducer'
import { Provider } from 'react-redux'


const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
})


function App() {

  return (
    <Provider store={store}>
      <div className="appContainer">
        <Timer></Timer>
      </div>
    </Provider>
  )
}


export default App;
