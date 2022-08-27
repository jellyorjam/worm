import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import "./App.css"
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#efebe9',
      light: '#ffffff',
      dark: '#c7c7c7',
    },
    background: {
      default: "#ffffff"
      // default: '#bec5b7',
      // home: "#ffffff"
    },
    secondary: {
      // main: '#558b2f',
      main: "#79b700",
      light: '#85bb5c',
      dark: '#255d00',
    },
  },
  typography: {
    fontFamily: 
      "Lora",
    color: "#000000"
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
      </ThemeProvider>
      </Provider>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
