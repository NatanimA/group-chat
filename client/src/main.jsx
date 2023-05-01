import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {BrowserRouter,Routes , Route} from "react-router-dom"
import Auth from './components/Auth/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/chat'  element={<App />} />
          <Route path='/auth/login' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
