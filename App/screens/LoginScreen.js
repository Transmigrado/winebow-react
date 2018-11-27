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
class LoginScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: null
  })

  static propTypes = {
    navigation: PropTypes.object
 }

 state ={
   value : '',
   loading: false
 }

 componentWillMount(){
  this._retrieveData()
 }

 _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if (value !== null) {
      
      this.props.navigation.navigate('Main')
    }
   } catch (error) {
   
   }
}

_storeData = async value => {
  try {
    await AsyncStorage.setItem('user', value)
  } catch (error) {
    
  }
}

 
showAlert = message => {
  setTimeout(()=>{
  Alert.alert(
    'Login',
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )},100)
}




 onPressLogin = ()=>{
    const { value } = this.state

    this.setState({loading:true})
    login(value)
    .then(response => {
      this.setState({loading:false})

      this._storeData(value)

      if(response.status === 200){
       this.props.navigation.navigate('Main')
      }else if(response.status === 404){
        this.showAlert('User not found')
      }else{
        this.showAlert('Something went wrong, Try again.')
      }
    }).catch(error => {
      this.showAlert('Something went wrong, Try again.')
    })

  }
   
    

 onPressSign = ()=>{
    this.props.navigation.navigate('Sign')
}

onChangeText = value =>{
  this.setState({value})
}

  render() {
    const { loading , value} = this.state

    const styleBox = (Device.isTablet)? {width: 400} : {}

    return <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={0}>
         {!Device.isTablet && <Image source={require('../components/assets/background.png')} style={{position:'absolute', width:'100%', height:'100%'}} />}
         {Device.isTablet && <Image source={require('../components/assets/backgroundBig.png')} style={{position:'absolute', width:'100%', height:'100%'}} />}
        <View style={styles.content}>
        <Image source={require('../components/assets/mainlogo.png')} style={{marginBottom: 40}} />
            <View style={[styles.box, styleBox]}>
                <InputText onChangeText={this.onChangeText} placeholder="Email" />
                <LigthButton disabled={!validateEmail(value)}  onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Login
                </LigthButton>
                <TextButton onPress={this.onPressSign}>
                Doesn't have and account?
                </TextButton>
            </View>
           
        </View>
        {loading && <LoadingDialog text="Loading" />}
    </KeyboardAvoidingView>
  }
}

export default withNavigation(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content:{
    position:'absolute',
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    padding:32
  },
  box:{
      width:'100%',
      backgroundColor:'white',
      padding:33,
      shadowColor: '#333333',
      shadowRadius: 6,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5
  }
  
})