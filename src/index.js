import React from 'react';
import { ToastAndroid, BackHandler } from 'react-native';
import Router from './router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.isExit = true; // 是否退出
    this.lastBackPressed = null; // 最后一次返回时间
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.lastBackPressed = null;
  }

  handleBackPress = () => {
    if (this.isExit) { // 根界面
      // 2秒内再次返回
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return true;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    return false
  }

  onNavigationStateChange = (prevNav, nav, action) => {
    const routers = nav.routes;
    const currentRoutes = routers[routers.length - 1]; // 获取当前根路由
    // 如果是主页
    if (currentRoutes.routeName === 'MainTab') {
      const currentIndex = currentRoutes.routes[currentRoutes.index].index; // 根据当前根路由位置，找其子路由是否有index（代表是否在详情页面）
      this.isExit = currentIndex || true;
    } else {
      this.isExit = false;
    }
    // 如果是login页
    if (currentRoutes.routeName === 'LoginStack') {
      this.isExit = currentRoutes.index === 0;
    }
  }

  render() {
    return (
      <Router onNavigationStateChange={this.onNavigationStateChange} />
    )
  }
}
