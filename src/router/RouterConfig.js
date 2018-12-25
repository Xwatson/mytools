import BottomTab from './BottomTabNavigator'
import GoodsReptileDetail from '../views/GoodsReptile/GoodsReptileDetail'

/*
    --- 路由配置 ---
   * 所有组件都必须在这里注册
   * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
   * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。
*/
const RouteConfig = {
    BottomTab: {
        screen: BottomTab,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    GoodsReptileDetail: {
        screen: GoodsReptileDetail,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    }
}

export default RouteConfig;