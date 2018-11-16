import React, {Component} from 'react'
import { StyleSheet, View, Image, Alert, KeyboardAvoidingView} from 'react-native'
import PropTypes from 'prop-types'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'
import LoadingDialog from '../components/LoadingDialog'
import login from '../api/ApiLogin'
import validateEmail  from '../utils/validate'
import Device from 'react-native-device-detection'
import { AsyncStorage } from "react-native"
class LoadingScreen extends Component {

 

    componentDidMount(){
this._retrieveData()
    }
 

 _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if (value !== null) {
      
     
      this.props.navigation.navigate('Main')
    }else{
        this.props.navigation.navigate('Auth')
    }
   } catch (error) {
    this.props.navigation.navigate('Auth')
   }
}

_storeData = async value => {
  try {
    await AsyncStorage.setItem('user', value)
  } catch (error) {
  
  }
}

  render() {
    return <View style={styles.container}></View>
  }
}

export default withNavigation(LoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
  
})