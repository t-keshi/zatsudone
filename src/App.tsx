import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as yup from 'yup';
import { Providers } from './containers/Providers';
import { firebaseConfig } from './firebaseConfig';
import { Routes } from './routes/Routes';
import { yupLocaleJP } from './utility/yupLocaleJP';

yup.setLocale(yupLocaleJP);

firebase.initializeApp(firebaseConfig);

export const App: React.VFC = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);
