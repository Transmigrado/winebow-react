import React, {Component} from 'react'
import { StyleSheet, View, Text, Image, Alert, KeyboardAvoidingView} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import PropTypes from 'prop-types'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'
import validateEmail from '../utils/validate'
import signup from '../api/ApiSignup'
import LoadingDialog from '../components/LoadingDialog'
import Device from 'react-native-device-detection'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

class SignScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: null
  })

  static propTypes = {
    navigation: PropTypes.object
 }

 state = {
  emailValue:'',
  nameValue:'',
  loading:false,
  finish:false
 }

 showAlert = message => {
  setTimeout(()=>{
  Alert.alert(
    'Sign Up',
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )},100)
}


 onPressLogin = ()=>{
 
  const { emailValue, nameValue} = this.state

    this.setState({loading:true})
    signup({ email:emailValue, name:nameValue})
    .then(response => {
      this.setState({loading:false})
      if(response.status === 200){
        this.setState({finish:true})
      }else if(response.status === 422){
        this.showAlert('This Email already exists.')
      }else{
        this.showAlert('Something went wrong, Try again.')
      }
    }).catch(error => {
      this.setState({loading:false})
       this.showAlert('Something went wrong, Try again.')
    })
  
 }

 onPressSign = ()=>{
    this.props.navigation.goBack(null)
 }

 onChangeTextEmail = emailValue => {
  this.setState({ emailValue })
 }

 onChangeTextName = nameValue => {
  this.setState({ nameValue })
 }

  renderForm = () => {

    const { emailValue, nameValue} = this.state

    const disabled = !validateEmail(emailValue) || nameValue.length < 2

    return <React.Fragment>
      <Text style={{fontSize: 30, textAlign:'center', marginBottom: 10, fontFamily: 'IBMPlexSans'}}>
                    Request Access
                </Text>
                <Text style={{fontSize: 14, textAlign:'center',marginTop: 10, marginBottom: 30, fontFamily: 'IBMPlexSans'}}>
                To require access enter your data and our team will contact you
                </Text>
                
                <InputText onChangeText={this.onChangeTextName} placeholder="Name" />
                <InputText onChangeText={this.onChangeTextEmail} placeholder="Email" style={{marginTop: 20}} />

                <LigthButton disabled={disabled} onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Request Access
                </LigthButton>
                <TextButton onPress={this.onPressSign}>
                Already have an acount?
                    </TextButton>
      </React.Fragment>
  }
  
  renderSuccess = () => {
    return <React.Fragment>
          <Text style={{fontSize: 30, textAlign:'center', marginBottom: 10, fontFamily:'IBMPlexSans-Bold'}}>
          Form Submitted Successfully
                </Text>
                <Text style={{fontSize: 14, textAlign:'center',marginTop: 10, marginBottom: 30, fontFamily:'IBMPlexSans'}}>
                We have received your request access. Soon, our team will contact you and send your access data to your email.
                </Text>
                
                <LigthButton disabled={false} onPress={this.onPressSign}  style={{marginTop: 20, marginBottom:10}}>
                Go back to login
                </LigthButton>
            
    </React.Fragment>
  }

  render() {
    const { loading, finish} = this.state
    const styleBox = (Device.isTablet)? {width: 400} : {}

    return<KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={0}>
         {!Device.isTablet && <Image source={require('../components/assets/background.png')} style={{position:'absolute', width:'100%', height:'100%'}} />}
         {Device.isTablet && <Image source={require('../components/assets/backgroundBig.png')} style={{position:'absolute', width:'100%', height:'100%'}} />}
        <View style={styles.content}>
       
            <View style={[styles.box,styleBox]}>
               {finish && this.renderSuccess()}
               {!finish && this.renderForm()}
            </View>
           
        </View>
        {loading && <LoadingDialog text="Loading" />}
    </KeyboardAvoidingView>
  }
}

export default withNavigation(SignScreen)

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