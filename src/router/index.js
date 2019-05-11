import { createStackNavigator, createAppContainer } from 'react-navigation';
import defaultTransitionConfig from '../router/transitionConfig';
import Loading from '../views/loading';
import LoginStack from './loginStack';
import MainTab from './mainTab';
import DetailStack from './detailStack';


const AppNavigator = createStackNavigator({
  Loading: {
    screen: Loading
  },
  LoginStack: {
    screen: LoginStack
  },
  MainTab: {
    screen: MainTab
  },
  DetailStack: {
    screen: DetailStack
  },
},
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: { // 隐藏头部栏
      header: null
    },
    transitionConfig: defaultTransitionConfig
  });

export default AppContainer = createAppContainer(AppNavigator);
