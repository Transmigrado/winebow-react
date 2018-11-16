import { 
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import MainScreen from '../screens/MainScreen'
import WineScreen from '../screens/WineScreen'
import LoginScreen from '../screens/LoginScreen'
import SignScreen from '../screens/SignScreen'
import LoadingScreen from '../screens/LoadingScreen'


const Main = createStackNavigator({
    Main: {screen: MainScreen},
    WineDetail:{screen:WineScreen}
  },{ initialRouteName:"Main" })

const Auth = createStackNavigator({
    Login: {screen: LoginScreen},
    Sign: {screen:SignScreen}
  },{ initialRouteName:"Login" })

export default createSwitchNavigator({
    MainScreen: { screen: Main },
    Auth:{ screen : Auth},
    Loading: {screen: LoadingScreen}
    }
    ,{ initialRouteName:"Loading" })