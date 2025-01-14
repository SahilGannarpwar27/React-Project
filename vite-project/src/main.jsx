import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import App from './App.jsx'

import './index.css'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persister = persistStore(Store)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter>
      <PersistGate persistor={persister}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
)

{
  /* <PersistGate persistor={persister}></PersistGate> */
}
