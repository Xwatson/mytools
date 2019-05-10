import { createStackNavigator } from 'react-navigation';
import Login from '../views/login';
import Register from '../views/register';

export default LoginRouter = createStackNavigator({
  Login: Login,
  Register: Register,
}, {
  initialRouteName: 'Login',
});
