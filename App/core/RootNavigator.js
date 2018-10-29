import { 
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import MainScreen from '../screens/MainScreen'
import WineScreen from '../screens/WineScreen'
import LoginScreen from '../screens/LoginScreen'


const Main = createStackNavigator({
    Main: {screen: MainScreen},
    WineDetail:{screen:WineScreen}
  },{ initialRouteName:"Main" });

export default createSwitchNavigator({
    Main: { screen: Main },
    Login:{ screen : LoginScreen}
    }
    ,{ initialRouteName:"Login" })