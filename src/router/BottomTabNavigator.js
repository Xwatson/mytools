import React, { PureComponent } from 'react'
import {
    Image,
    StyleSheet, 
} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from "react-native-vector-icons/Feather";
import Home from '../views/Home'
import GoodsReptileList from '../views/GoodsReptile/GoodsReptileList'

export default MainTab = createBottomTabNavigator({
        Home,
        GoodsReptileList
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Home':
                        iconName = `home`;
                        break;
                    case 'GoodsReptileList':
                        iconName = `target`;
                        break;
                    default:
                        iconName = `home`;
                        break;
                }
                // 在此处可以返回任何组件！
                // 我们通常使用react-native-vector-icons中的图标组件
                return <Icon name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2089dc',
            inactiveTintColor: 'gray',
        }
    }
)

/* export default MainTab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:({navigation, screeProps}) => ({
            //这里设置StackNavigator属性和一般情况下Tabbar不同页面可能会不同的属性

            //设置StackNavigator属性
            header:null,
            headerTitle: '首页',
            headerStyle: styles.navigator,
            headerTitleStyle: styles.navigatorTitle,
            gesturesEnabled:true,

            //这里设置Tabbar不同页面可能会不同的属性
            tabBarVisible: true,
            tabBarLabel:'首页',
            tabBarIcon:(({tintColor,focused}) => {
                return (
                    <Icon name={'home'} style={styles.tabBarIcon(focused)} />
                )
            }),
        })
    },
    GoodsReptileList: {
        screen: GoodsReptileList,
        navigationOptions:({navigation, screeProps}) => ({
            header:null,
            headerTitle: '商品爬虫',
            headerStyle: styles.navigator,
            headerTitleStyle: styles.navigatorTitle,
            gesturesEnabled:true,

            tabBarVisible: true,
            tabBarLabel: '爬虫',
            tabBarIcon:(({tintColor,focused}) => {
                return (
                    <Icon name={'target'} style={styles.tabBarIcon(focused)} />
                )
            }),
        })
    }
})


const styles = StyleSheet.create({
    navigatorTitle:{
        fontSize:17,
        color:'white',
    },
    navigator:{
        backgroundColor:'#d81e06',
    },
    tabBarIcon: (focused) => ({
        width:25,
        height:25,
        color: focused ? '#06f' : '#eee'
    }),
}) */