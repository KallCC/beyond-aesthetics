import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './app/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

