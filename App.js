
import React from 'react';
import { Provider } from "mobx-react";
import store from "./src/store";
import './src/utils/storage';
import AppContainer from './src/index';

export default () => (
  <Provider {...store} >
    <AppContainer />
  </Provider>
)
