import React from 'react';
import { View, Text } from 'react-native';

export default class My extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '交易'
  })
  render() {
    return (
      <View><Text>交易</Text></View>
    );
  }
}
