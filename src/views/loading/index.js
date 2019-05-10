import React from 'react';
import { View, Text } from 'react-native';

export default class My extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('MainTab')
    }, 2000)
  }
  render() {
    return (
      <View><Text>Loading...</Text></View>
    );
  }
}
