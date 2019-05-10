
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Loading from '../views/loading';
import LoginStack from './loginStack';
import MainTab from './mainTab';


const AppNavigator = createStackNavigator({
  Loading: {
    screen: Loading
  },
  LoginStack: {
    screen: LoginStack
  },
  MainTab: {
    screen: MainTab
  }
},
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: { // 隐藏头部栏
      header: null
    }
  });

export default AppContainer = createAppContainer(AppNavigator);
