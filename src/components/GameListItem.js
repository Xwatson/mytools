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
      <View style={styles.gameItems}>
        <Image style={styles.gameItemImage} source={{ uri: game.imageUrl }} />
        <View style={styles.gameItemContent}>
          <Text style={styles.gameItemTitle} >{game.title}</Text>
          <Text style={styles.gameCategory} >{game.category.name}·{game.typeName}</Text>
          <View style={styles.gameItemSubTitle}>
            {
              game.subTitles.map(item => (
                <Text
                  key={item.id}
                  style={{ ...styles.subTitleItems, backgroundColor: item.bgColor, color: item.color }} >
                    {item.name}
                </Text>
              ))
            }
          </View>
        </View>
        <View style={styles.download}><Text style={{ color: '#ffffff' }}>下载</Text></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // 游戏列表
  gameItems: {
    flex: 1,
    // height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 图片
  gameItemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  // 游戏列表内容容器
  gameItemContent: {
    flex: 1,
    marginLeft: 10,
  },
  // 游戏标题
  gameItemTitle: {
    color: '#373737',
    fontSize: 14,
  },
  // 游戏分类
  gameCategory: {
    color: '#A4A4A4',
    fontSize: 11,
  },
  // 游戏标签容器
  gameItemSubTitle: {
    width: 220,
    height: 33,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  // 游戏子标签
  subTitleItems: {
    borderRadius: 2,
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontSize: 11,
    marginRight: 5,
    marginBottom: 2,
  },
  // 下载
  download: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#FFA032',
    borderRadius: 2,
  }
})
