import React from 'react';
import { View, Text } from 'react-native';

export default class My extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '我的'
  })
  render() {
    return (
      <View><Text>我的</Text></View>
    );
  }
}
