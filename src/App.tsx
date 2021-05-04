import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import * as yup from 'yup';
import { Providers } from './containers/Providers';
import { Routes } from './routes/Routes';
import { yupLocaleJP } from './constants/yupLocaleJP';

yup.setLocale(yupLocaleJP);

const firebaseConfig = {
  apiKey: 'AIzaSyA2HuHqiV_v8pyFVILMVM3Tvzqg5cLJsgI',
  authDomain: 'symphony-forum.firebaseapp.com',
  projectId: 'symphony-forum',
  storageBucket: 'symphony-forum.appspot.com',
  messagingSenderId: '790819168126',
  appId: '1:790819168126:web:9b06137671a85be7181d2f',
  measurementId: 'G-BZN0NKFS63',
};

firebase.initializeApp(firebaseConfig);

export const App: React.VFC = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);
