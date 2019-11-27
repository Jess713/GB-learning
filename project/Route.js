import WatchVideo from './screens/Video';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
/**
 * These are the screens for the "first-half" of the application where the user is
 * either authenticating or creating a new account
 */
const AuthStack = createStackNavigator(
  {
    
    LoginScreen:{screen: LoginScreen},
    RegisterScreen: {screen: RegisterScreen},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  }
);
/**
 * These are the screens for the "second-half" of the application where the user is
 * shown the learning module video sections.
 */
const MainNavigator = createStackNavigator(
  {
    LandingScreen: {screen: LandingScreen},
    WatchVideo: {screen: WatchVideo},
  }
);
/**
 * This ensures that the user cannot jump to and from the authstack and main navigator
 * stack unless they were to log out from the main navigator
 */
const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: MainNavigator,
    }));

export default Routes;