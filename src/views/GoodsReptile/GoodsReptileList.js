import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, RefreshControl } from "react-native";
// import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Feather";
import { ListItem, Header } from 'react-native-elements';
import { observer, inject } from "mobx-react";
import goodsReptileStore from "../../store/GoodsReptileStore";

let { width, height } = Dimensions.get('window');
@observer
export default class GoodsReptileList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '爬虫'
  })
  constructor(props) {
    super(props);
    this.goodsReptileStore = new goodsReptileStore();
    this.page = 1;
    this.size = 20;
    this.isLoreMore = false;
    this.data = [
      {
        id: 1,
        name: '商品名称aaaa', // 商品名称
        site_name: '天猫', // 站点名称
        image_url: '', // 图片地址
        current_price: 21, // 当前价格
        vip_price: 19, // 会员价
        lowest_price: 19, // 最低价
        expect_price: 10, // 期望价
        code: 0
      },
      {
        id: 2,
        name: '商品名称bbbb', // 商品名称
        site_name: '京东', // 站点名称
        image_url: '', // 图片地址
        current_price: 98, // 当前价格
        vip_price: 98, // 会员价
        lowest_price: 98, // 最低价
        expect_price: 78, // 期望价
        code: 1
      }
    ]

  }
  componentDidMount() {
    this.getList({ page: this.page, size: this.size })
  }
  getList = () => {
    this.goodsReptileStore.getList({ page: this.page, size: this.size });
  }
  renderListItem = ({ item = {} }) => {
    return (
      <ListItem key={item.id}
        chevron
        bottomDivider
        leftAvatar={{ source: { uri: item.image_url || 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png' } }}
        title={item.name}
        subtitle={
          <View style={styles.listItemBrief}>
            <View style={[styles.listItemBriefBox, styles.listItemBriefSite]}><Text style={{ color: '#fff' }}>{item.site_name}</Text></View>
            {this.getPriceStatusIcon(item)}
            {
              item.vip_price ?
                <View style={[styles.listItemBriefBox, styles.listItemBriefVipPrice]}><Text style={{ color: '#e4c06a' }}>vip:{item.vip_price}</Text></View>
                : null
            }
            <View style={[styles.listItemBriefBox, styles.listItemBriefExpectPrice]}><Text style={{ color: '#090' }}>期望:{item.expect_price}</Text></View>
            <View style={[styles.listItemBriefBox, styles.listItemBriefLowestPrice]}><Text style={{ color: 'red' }}>最低:{item.lowest_price}</Text></View>
            {
              item.code ?
                <View style={[styles.listItemBriefBox, styles.listItemBriefCode]}><Text style={{ color: '#fff' }}>Error</Text></View> :
                null
            }
          </View>
        }
        onPress={this.navigateToDetail.bind(this, item.id)}
      />
    )
  }
  getPriceStatusIcon = (item = {}) => {
    return (
      <View style={[styles.listItemBriefBox, styles.listItemBriefCurrPrice]}>
        {
          item.current_price > item.expect_price ?
            <Text style={{ color: '#f54545' }}>{item.current_price}<Icon name={'arrow-up'} size={10} color={'#f54545'} /></Text> :
            <Text style={{ color: '#090' }}>{item.current_price}<Icon name={'arrow-down'} size={10} color={'#090'} /></Text>
        }
      </View>
    )
  }
  navigateToDetail = (id) => {
    this.props.navigation.navigate('GoodsReptileDetail', { id: id })
  }
  renderHeader = () => {
    return null;
  }

  renderFooter = () => {
    const { list = {}, fetching } = this.goodsReptileStore;
    if (fetching) {
      return (
        <View style={{
          height: 44,
          // backgroundColor: 'rgb(200,200,200)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>{'正在加载....'}</Text>
        </View>
      )
    } else if (!fetching && Math.ceil(list.count / this.size) === this.page) {
      return (
        <View style={{
          height: 44,
          // backgroundColor: '#f5f5f9',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>{'暂无更多'}</Text>
        </View>
      )
    } else {
      return null
    }

  }
  render() {
    const { list = {} } = this.goodsReptileStore;
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'refresh', color: '#fff', onPress: this.refreshList }}
          centerComponent={{ text: '商品价格', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={{ icon: 'add', color: '#fff', onPress: this.navigateToDetail.bind(this, null) }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}//是否显示垂直滚动条
          showsHorizontalScrollIndicator={false}//是否显示水平滚动条
          numColumns={1}//每行显示1个
          ref={(flatList) => this._flatList = flatList}
          ListHeaderComponent={this.renderHeader}//头部
          ListFooterComponent={this.renderFooter}//尾巴
          // ItemSeparatorComponent={this.renderSeparator}//每行底部---一般写下划线
          enableEmptySections={true}//数据可以为空
          keyExtractor={(item, index) => item.key = index}
          onEndReachedThreshold={0.1}//执行上啦的时候10%执行
          onEndReached={this.LoreMore}
          refreshControl={
            <RefreshControl
              refreshing={this.goodsReptileStore.fetching}
              onRefresh={this.refreshList}
              title="Loading..." />
          }
          data={list.rows}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
  LoreMore = () => {
    const { list = {} } = this.goodsReptileStore;
    if (Math.ceil((list.count || 0) / this.size) < this.page) {
      this.page++;
      this.getList()
    }
  }
  refreshList = () => {
    this.page = 1;
    this.getList()
  }
}

const styles = StyleSheet.create({
  basicList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  listItemBrief: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemBriefBox: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    marginHorizontal: 2,
    marginVertical: 0,
    fontSize: 12,
    borderRadius: 3,
  },
  listItemBriefSite: {
    marginLeft: 0,
    color: '#fff',
    backgroundColor: '#f54545',
  },
  listItemBriefCurrPrice: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#feb115',
  },
  listItemBriefVipPrice: {
    color: '#e4c06a',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e4c06a',
  },
  listItemBriefExpectPrice: {
    color: '#090',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#090',
  },
  listItemBriefLowestPrice: {
    color: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  listItemBriefCode: {
    color: '#fff',
    fontWeight: 'bold',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e4393c',
    backgroundColor: '#e4393c',
  },
})
