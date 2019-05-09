import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from "react-native";

export default class FlatListView extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data: game } = this.props;
    return (
      <View key={game.id} style={styles.gameItems}>
        <Image source={game.imageUrl} style={{ width: 50, height: 50 }} />
        <View style={styles.gameItemContent}>
          <Text style={styles.gameItemTitle} color="#333" fontSize="14" >{game.title}</Text>
          <Text style={styles.gameCategory} color="#ccc" fontSize="10" >{game.category.name}●{game.typeName}</Text>
          <View style={styles.gameItemSubTitle}>
            {
              game.subTitles.map(item => (
                <Text
                  key={item.id}
                  style={styles.subTitleItems}
                  backgroundColor={item.bgColor}
                  color={item.color} >
                    {item.name}
                </Text>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // 游戏列表
  gameItems: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    display: 'flex',
    alignItems: 'center',
  },
  // 游戏列表内容容器
  gameItemContent: {
    flex: 1,

  },
  // 游戏标题
  gameItemTitle: {
  },
  // 游戏分类
  gameCategory: {},
  // 游戏标签容器
  gameItemSubTitle: {
    display: 'flex',

  },
  // 游戏子标签
  subTitleItems: {
    paddingHorizontal: 5,
    fontSize: 10,
    marginRight: 5
  }

})
