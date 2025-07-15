import React from "react";
import ReactDom from 'react-dom/client'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import App from "./App";
import StoreContextProvider from "./context/storeContext.jsx";


ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>

)