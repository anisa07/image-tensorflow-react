import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MlReactProvider } from "./context";

ReactDOM.render(<MlReactProvider><App/></MlReactProvider>, document.getElementById('root'));
