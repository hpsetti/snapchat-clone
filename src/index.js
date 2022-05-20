import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import { store } from './app/store';
import App from './App';
// import Sample from './Components/Preview'
import './index.css';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      {/* <Routes> */}
      {/* <Route path="/" element={<App />} /> */}
      {/* <Route path="/sample" element={<Sample />} /> */}
      {/* </Routes> */}
    </Provider>
  </React.StrictMode>
  // </BrowserRouter>
  
);


