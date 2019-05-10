import React from 'react';
import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';

export default class CoreLayout extends React.PureComponent {
  static defaultProps = {
    statusBar: {
      barStyle: 'dark-content',
      backgroundColor: '#fff'
    }
  }
  static propsType = {
    children: PropTypes.element.isRequired,
    statusBar: PropTypes.object
  }
  render() {
    const { children, statusBar } = this.props;
    return (
      <View>
        <StatusBar {...statusBar} />
        {children}
      </View>
    );
  }
}
