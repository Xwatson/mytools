import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, RefreshControl } from "react-native";

export default class FlatListView extends React.PureComponent {
  static propTypes = {
    // 数据
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    // 分页器对象
    pagination: PropTypes.objectOf({
      // 当前页数
      page: PropTypes.number.isRequired,
      // 每页显示个数
      size: PropTypes.number.isRequired,
      // 分页总个数
      total: PropTypes.number.isRequired,
    }).isRequired,
    // 请求数据回调 参数：pagination
    onFetchData: PropTypes.func.isRequired,
    // fetching状态
    fetching: PropTypes.bool.isRequired,
    // 渲染ListItem
    renderItem: PropTypes.func.isRequired,
    // 上拉加载事件 参数：pagination
    onLoreMore: PropTypes.func,
    // 下拉刷新事件 参数：pagination
    onRefreshList: PropTypes.func,
    // 渲染头 参数：pagination
    renderHeader: PropTypes.func,
    // 渲染脚 参数：pagination
    renderFooter: PropTypes.func,
  }
  // 上拉加载更多
  onLoreMore = () => {
    const { pagination, onLoreMore, onFetchData } = this.props;
    if (Math.ceil((pagination.total || 0) / pagination.size) < pagination.page) {
      pagination.page += 1;
      onFetchData(pagination);
    }
    if (typeof onLoreMore === 'function') {
      onLoreMore(pagination)
    }
  }
  // 下拉刷新
  onRefreshList = () => {
    const { onRefresh, onFetchData } = this.props;
    onFetchData(1);
    if (typeof onRefresh === 'function') {
      onRefresh(1);
    }
  }
  render() {
    const { data, fetching, renderItem } = this.props;
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
          enableEmptySections={false}//数据可以为空
          keyExtractor={(item, index) => item.key || index}
          onEndReachedThreshold={0.1}//执行上啦的时候10%执行
          onEndReached={this.onLoreMore}
          refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={this.onRefreshList}
              title="玩命加载..." />
          }
          data={data}
          renderItem={renderItem}
        />
      </View>
    );
  }
  // 渲染头部
  renderHeader = () => {
    const { renderHeader, pagination } = this.props;
    if (typeof renderHeader === 'function') {
      return renderHeader(pagination);
    }
    return null;
  }
  // 渲染底部
  renderFooter = () => {
    const { pagination, fetching, renderFooter } = this.props;
    if (typeof renderFooter === 'function') {
      return renderFooter(pagination)
    }
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
    } else if (!fetching && Math.ceil(pagination.total / pagination.size) === pagination.page) {
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
      return null;
    }
  }
}
