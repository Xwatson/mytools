import React from 'react';
import { View, Text } from 'react-native';

export default class My extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '开服'
  })
  render() {
    return (
      <View><Text>开服</Text></View>
    );
  }
}
