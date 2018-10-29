import { 
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import MainScreen from '../screens/MainScreen'
import WineScreen from '../screens/WineScreen'
import LoginScreen from '../screens/LoginScreen'
import SignScreen from '../screens/SignScreen'


const Main = createStackNavigator({
    Main: {screen: MainScreen},
    WineDetail:{screen:WineScreen}
  },{ initialRouteName:"Main" })

const Auth = createStackNavigator({
    Login: {screen: LoginScreen},
    Sign: {screen:SignScreen}
  },{ initialRouteName:"Login" })

export default createSwitchNavigator({
    Main: { screen: Main },
    Auth:{ screen : Auth}
    }
    ,{ initialRouteName:"Auth" })