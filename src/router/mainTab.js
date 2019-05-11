import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/AntDesign";
import CoreLayout from '../layout/CoreLayout';
import Home from '../views/home';
import Transaction from '../views/transaction';
import OpenServer from '../views/openServer';
import My from '../views/my';
// import GoodsReptileList from '../views/goodsReptile/GoodsReptileList';

export default MainTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true })
  },
  Transaction,
  OpenServer,
  My,
  // GoodsReptileList
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Transaction':
            iconName = 'pay-circle-o1';
            break;
          case 'OpenServer':
            iconName = 'profile';
            break;
          case 'My':
            iconName = 'user';
            break;
          default:
            iconName = 'home';
            break;
        }
        // 在此处可以返回任何组件
        return <Icon name={iconName} size={20} color={tintColor} />;
      },
    }),
    swipeEnabled: true,//是否可以滑动切换
    animationEnabled: true,//切换是否有动画
    initialRouteName: 'Home', //进入App的首页面
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
      activeTintColor: '#FFA032',
      inactiveTintColor: '#0F1A14',
    }
  }
)
