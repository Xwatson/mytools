import { createStackNavigator } from 'react-navigation';
import GameDetail from '../views/gameDetail';

export default DetailStack = createStackNavigator({
  GameDetail: GameDetail,
}, {
  initialRouteName: 'GameDetail',
});
