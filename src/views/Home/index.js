import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Tabs } from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
import { observer, inject } from "mobx-react";
import GameListItem from '../../components/GameListItem';

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

  }
  constructor(props) {
    super(props);
    this.pagination = {
      page: 1,
      size: 20,
    };
    this.tabKey = 'Metamorphosis';
    this.tabsKeys = ['Metamorphosis', 'Discount', 'H5'];
    this.swiperIndex = {
      Metamorphosis: 0,
      Discount: 0,
      H5: 0,
    };
    this.metamorphosisRef = null;
    this.autoPlaySwiperTimer = null;
    this.swiperTouch = '';
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
    if (this.swiperTouch === 'customer') {
      console.log('onSwiperIndexChanged', index);
      this.swiperIndex[key] = index;
      this.autoPlaySwiper();
    }
  }
  autoPlaySwiper = () => {
    this.swiperTouch = ''
    const counts = {
      Metamorphosis: 3,
      Discount: 3,
      H5: 3,
    };
    console.log('autoPlaySwiper');
    if (this.autoPlaySwiperTimer) clearInterval(this.autoPlaySwiperTimer);
    this.autoPlaySwiperTimer = setInterval(() => {
      const tabKey = this.tabKey;
      const swiperIndex = this.swiperIndex;
      let currentIndex = swiperIndex[tabKey];
      if (currentIndex >= counts[tabKey]) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      swiperIndex[tabKey] = currentIndex;
      console.log('定时器执行', tabKey, currentIndex);
      const refName = tabKey + 'Ref';
      if (this.refs[refName]) {
        this.refs[refName].scrollBy(currentIndex - 1);
      }
    }, 2500);
  }
  clearAutoPlaySwiperTimer = () => {
    console.log('clearAutoPlaySwiperTimeout');
    this.swiperTouch = 'touch';
    clearInterval(this.autoPlaySwiperTimer);
  }
  onSwiperTouchEnd = (e, state) => {
    if (this.swiperTouch === 'touch') {
      this.swiperTouch = 'customer';
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
  // 变态
  renderTabMetamorphosis = (row) => {
    const { swiperIndex } = this.state;
    return (
      <ScrollView>
        <Swiper
          ref="MetamorphosisRef"
          style={styles.wrapper}
          onTouchStart={this.clearAutoPlaySwiperTimer}
          onTouchEnd={this.onSwiperTouchEnd}
          onIndexChanged={index => this.onSwiperIndexChanged(index, 'Metamorphosis')}
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
        <View>
          <Text>人气推荐</Text>
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
        </View>
      </ScrollView>
    );
  }
  // 折扣
  renderTabDiscount = () => {
    return (
      <ScrollView>
        <Swiper style={styles.wrapper} >
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
      </ScrollView>
    );
  }
  // H5
  renderTabH5 = () => {
    return (
      <ScrollView>
        <Swiper style={styles.wrapper} >
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

const styles = StyleSheet.create({
  home: {
    flex: 1,
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
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  }
})
