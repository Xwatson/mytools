import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, RefreshControl, ActivityIndicator, Dimensions } from "react-native";
import { Tabs } from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
import { observer, inject } from "mobx-react";
import GameListItem from '../../components/GameListItem';
import LoadingMore from '../../components/LoadingMore';

@inject('homeStore')
@observer
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '首页'
  });
  static propTypes = {
    navigation: PropTypes.object
  }
  state = {
    loadMore: {
      Metamorphosis: false,
      Discount: false,
      H5: false,
    },
    refreshing: {
      Metamorphosis: false,
      Discount: false,
      H5: false,
    }
  }
  constructor(props) {
    super(props);
    this.pagination = {
      page: 1,
      size: 20,
    };
    this.tabKey = 'Metamorphosis';
    this.tabsKeys = ['Metamorphosis', 'Discount', 'H5'];
    this.txtPulling = {};
    this.txtPullok = {};
    this.txtPullrelease = {};
    this.metamorphosisRef = null;
    this.autoPlaySwiperTimer = null;
    this.swiperTouch = false;
  }

  getHotList = (pagination) => {
    const { fetchHotList } = this.props.homeStore;
    fetchHotList(pagination);
  }
  componentDidMount() {
    this.getHotList(this.pagination);
    setTimeout(() => {
      if (!this.autoPlaySwiperTimer) {
        this.autoPlaySwiper();
      }
    }, 1000);
  }
  onSwiperIndexChanged = (index, key) => {
  }
  autoPlaySwiper = () => {
    console.log('autoPlaySwiper');
    if (this.autoPlaySwiperTimer) clearInterval(this.autoPlaySwiperTimer);
    this.autoPlaySwiperTimer = setInterval(() => {
      const tabKey = this.tabKey;
      console.log('定时器执行', tabKey);
      const refName = tabKey + 'Ref';
      if (this.refs[refName]) {
        this.refs[refName].scrollBy(1);
      }
    }, 2500);
  }
  clearAutoPlaySwiperTimer = () => {
    console.log('clearAutoPlaySwiperTimeout');
    this.swiperTouch = true;
    clearInterval(this.autoPlaySwiperTimer);
  }
  onSwiperTouchEnd = (e, state) => {
    if (this.swiperTouch) {
      this.swiperTouch = false;
      this.autoPlaySwiper();
    }
  }
  onTabsChange = (tab, index) => {
    console.log('onTabsChange', this.tabsKeys[index]);
    this.tabKey = this.tabsKeys[index];
  }
  onFetchData = (pagination) => {
    this.pagination = pagination;
    this.getHotList(pagination);
  }
  onPressGameItem = (id) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetail', { id });
  }
  onRefresh = (key) => {
    const { refreshing } = this.state;
    refreshing[key] = true;
    this.setState({ refreshing });
    setTimeout(() => {
      refreshing[key] = false;
      this.setState({ refreshing });
    }, 2000);
  }
  onScroll = (event, key) => {
    const { loadMore } = this.state;
    if (loadMore[key]) {
      return;
    }
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      loadMore[key] = true;
      this.setState({ loadMore });
      setTimeout(() => {
        loadMore[key] = false;
        this.setState({ loadMore });
      }, 3000);
    }
    return;
  }
  // 渲染上拉加载更多
  renderLoadMore = (key) => {
    const { loadMore } = this.state;
    return (
      <LoadingMore
        isLoading={loadMore[key]}
        onLoading={() => {
          alert('fdfdfd');
        }}
      />
    );
  }
  // 变态
  renderTabMetamorphosis = (row) => {
    const { refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing.Metamorphosis}
            onRefresh={() => this.onRefresh('Metamorphosis')}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={(e) => this.onScroll(e, 'Metamorphosis')}
        scrollEventThrottle={50}
      >
        <Swiper
          ref="MetamorphosisRef"
          style={styles.wrapper}
          onTouchStart={this.clearAutoPlaySwiperTimer}
          onTouchEnd={this.onSwiperTouchEnd}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper111</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful222</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple333</Text>
          </View>
        </Swiper>
        <View style={styles.graySpace } />
        <View style={styles.hotCate}>
          <Text style={styles.hotRecommend}>人气推荐</Text>
        </View>
        <View>
          {row.map((item, index) => (
            <View
              style={{ ...styles.gameListItem, ...(index === row.length - 1 ? { borderBottomWidth: 0 } : {}) }}
              key={item.id}
            >
              <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPressGameItem(item.id)}>
                <GameListItem data={item} />
              </TouchableOpacity>
            </View>
          ))}
          {this.renderLoadMore('Metamorphosis')}
        </View>
      </ScrollView>
    );
  }
  // 折扣
  renderTabDiscount = () => {
    const { refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing.Discount}
            onRefresh={() => this.onRefresh('Discount')}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={(e) => this.onScroll(e, 'Discount')}
        scrollEventThrottle={50}
      >
        <Swiper
          style={styles.wrapper}
          ref="DiscountRef"
          onTouchStart={this.clearAutoPlaySwiperTimer}
          onTouchEnd={this.onSwiperTouchEnd}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        <Text>折扣</Text>
        {this.renderLoadMore('Discount')}
      </ScrollView>
    );
  }
  // H5
  renderTabH5 = () => {
    const { refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing.H5}
            onRefresh={() => this.onRefresh('H5')}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={(e) => this.onScroll(e, 'H5')}
        scrollEventThrottle={50}
      >
        <Swiper
          style={styles.wrapper}
          ref="H5Ref"
          onTouchStart={this.clearAutoPlaySwiperTimer}
          onTouchEnd={this.onSwiperTouchEnd}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        <Text>H5</Text>
        {this.renderLoadMore('H5')}
      </ScrollView>
    );
  }
  render() {
    const { page, size } = this.pagination;
    const { hotGameList: { row = [] } = {}, fetching } = this.props.homeStore;
    const tabs = [
      { title: '变态' },
      { title: '折扣' },
      { title: 'H5' },
    ];
    return (
      <View style={styles.home}>
        <Tabs tabs={tabs} initialPage={0} onChange={this.onTabsChange}>
          {this.renderTabMetamorphosis(row)}
          {this.renderTabDiscount(row)}
          {this.renderTabH5(row)}
        </Tabs>

      </View>
    )
  }
  componentWillUnmount() {
    this.autoPlaySwiperTimer && clearInterval(this.autoPlaySwiperTimer);
  }
}
const spaceBgColor = '#EFEFEF';
const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  hotCate: {
    borderBottomWidth: 1,
    borderBottomColor: spaceBgColor,
    paddingVertical: 8,
    marginBottom: 10,
    marginHorizontal: 10
  },
  hotRecommend: {
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFA032',
    color: '#FFA032',
    fontSize: 15,
    paddingVertical:4,
    paddingHorizontal:8,
  },
  graySpace: {
    height: 5,
    backgroundColor: spaceBgColor
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameListItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: spaceBgColor
  }
})
