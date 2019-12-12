import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCi-87qWZIwWFkt3o2LhqNv3NAfoiLm3XY",
  authDomain: "discovertube-cd88d.firebaseapp.com",
  databaseURL: "https://discovertube-cd88d.firebaseio.com",
  projectId: "discovertube-cd88d",
  storageBucket: "discovertube-cd88d.appspot.com",
  messagingSenderId: "969329114542",
  appId: "1:969329114542:web:15efef9124e83a7da11c3f",
  measurementId: "G-WCYMFVHMJ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//show the content in the web page (inside #root)
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));