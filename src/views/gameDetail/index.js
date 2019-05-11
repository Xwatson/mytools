import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class GameDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '详情页'
  });
  static propTypes = {
    navigation: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.id = props.navigation.state.params.id
  }
  render() {
    return (
      <View><Text>详情页-{this.id}</Text></View>
    );
  }
}
