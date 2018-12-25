
import React, { Component } from 'react';
import { Provider } from "mobx-react";

import { createStackNavigator, createAppContainer } from 'react-navigation';
import RouteConfig from './src/router/RouterConfig';
import StackNavigatorConfig from './src/router/StackNavigatorConfig';
import store from "./src/store";
import './src/utils/storage';

const Navigator = createAppContainer(createStackNavigator(RouteConfig, StackNavigatorConfig));

export default class App extends Component {
 
  render() {
    return (
      <Provider {...store} >
        <Navigator />
      </Provider>
    )
  }
}