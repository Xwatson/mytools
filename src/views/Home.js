import React from 'react';
import { View, Text, Button, TextInput } from "react-native";
import { observer, inject } from "mobx-react";
// import Header from '../components/Header';
import { Header } from 'react-native-elements';

@inject('homeStore') // 将store传递给组件props
@observer // 转换响应式组件
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '首页'
  })
  state = {
    text: '',
    loadText: ''
  }
  constructor(props) {
    super(props);
    this.homeStore = this.props.homeStore
  }

  render() {
    const { text = '123', num = 0 } = this.homeStore;
    return (
      <View>
        <Header
          centerComponent={{ text: '商品价格', style: { color: '#fff', fontSize: 18 } }}
        />
        <Text>{text}</Text>
        <Button title="add" onPress={() => this.homeStore.plus()} />
        <Text>{num}</Text>
        <Button title="Minu" onPress={() => this.homeStore.minus()} />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 5 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="存" onPress={() => this.saveStorage()} />
        <Text>{this.state.loadText}</Text>
        <Button title="取" onPress={() => this.loadStorage()} />
      </View>
    )
  }
  saveStorage = () => {
    storage.save({
      key: 'homeTextState',
      data: {
        text: this.state.text
      }
    })
  }
  loadStorage = () => {
    storage.load({
      key: 'homeTextState'
    }).then(ret => {
      this.setState({ loadText: ret.text })
    })
  }
}
