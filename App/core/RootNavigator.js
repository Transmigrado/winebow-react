import { 
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import MainScreen from '../screens/MainScreen'


const Main = createStackNavigator({
    Main: {
      screen: MainScreen
    },
  },{ initialRouteName:"Main" });

export default createSwitchNavigator({
    Main: {
        screen: Main,
    }}
    ,{ initialRouteName:"Main" })