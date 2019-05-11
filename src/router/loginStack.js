import { createStackNavigator } from 'react-navigation';
import Login from '../views/login';
import Register from '../views/register';

export default LoginStack = createStackNavigator({
  Login: Login,
  Register: Register,
}, {
  initialRouteName: 'Login',
});
