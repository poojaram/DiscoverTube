import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

var config = {
    apiKey: "AIzaSyClTDaZhhFBGv-EfnOkfEPepqcO71ulNfA",
    authDomain: "info340discovertube.firebaseapp.com",
    databaseURL: "https://info340discovertube.firebaseio.com",
    projectId: "info340discovertube",
    storageBucket: "info340discovertube.appspot.com",
    messagingSenderId: "48591040745"
  };
 firebase.initializeApp(config);

//show the content in the web page (inside #root)
ReactDOM.render(<App />, document.getElementById('root'));
