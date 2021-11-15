import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, App } from '.';
import './index.css';
import reportWebVitals from './reportWebVitals';

export * from './alert';
export * from './App';
export * from './client';
export * from './components';
export * from './pages';

export const endpoint =
    'https://rk9tp93op3.execute-api.ap-northeast-2.amazonaws.com/stage/v1';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
