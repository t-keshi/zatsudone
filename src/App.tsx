import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as yup from 'yup';
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from './containers/entities/env';
import { Providers } from './containers/Providers';
import { Routes } from './routes/Routes';
import { yupLocaleJP } from './utility/yupLocaleJP';

yup.setLocale(yupLocaleJP);

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const App: React.VFC = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);
