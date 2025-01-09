import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import App from './App.jsx'

import './index.css'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store = {Store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
