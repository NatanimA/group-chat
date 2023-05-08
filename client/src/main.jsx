import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {BrowserRouter,Routes , Route} from "react-router-dom"
import Auth from './components/Auth/Auth';
import ProtectedRoute from "./components/ProtectedRoute"
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="816245556656-0im4cmjtje32l2mtdathau612mb8pftt.apps.googleusercontent.com">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
              <Route path='/'  element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>} />
              <Route path='/auth/login' element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
  </GoogleOAuthProvider>
  ,
)
