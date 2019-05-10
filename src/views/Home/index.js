import React from 'react';
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { observer, inject } from "mobx-react";
import GameListItem from '../../components/GameListItem';

@inject('homeStore')
@observer
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '首页'
  })
  constructor(props) {
    super(props);
    this.pagination = {
      page: 1,
      size: 20,
    }
  }

  getHotList = (pagination) => {
    const { fetchHotList } = this.props.homeStore;
    fetchHotList(pagination);
  }
  componentDidMount() {
    this.getHotList(this.pagination);
  }
  onFetchData = (pagination) => {
    this.pagination = pagination;
    this.getHotList(pagination)
  }
  render() {
    const { page, size } = this.pagination;
    const { hotGameList: { row = [] } = {}, fetching } = this.props.homeStore;
    return (
      <View style={styles.home}>
        <ScrollView>
          <View>
            <Text>人气推荐</Text>
            {row.map((item, index) => (
              <View
                style={{ ...styles.gameListItem, ...(index === row.length -1 ? { borderBottomWidth: 0 } : {}) }}
                key={item.id}>
                  <GameListItem data={item} />
                </View>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {},
  gameListItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  }
})
