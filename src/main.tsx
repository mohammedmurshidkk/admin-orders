import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ThemeComponent from './core/theme/ThemeComponent.tsx';
import store from './libs/store/configureStore.ts';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Conversation from './Conversation.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeComponent>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Conversation} />
            <Route path='/orders' Component={App} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeComponent>
  </React.StrictMode>,
);
