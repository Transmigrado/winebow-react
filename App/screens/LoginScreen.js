import React, {Component} from 'react'
import { StyleSheet, View, Image} from 'react-native'
import PropTypes from 'prop-types'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'
import LoadingDialog from '../components/LoadingDialog'

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

 validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

 onPressLogin = ()=>{
    const { value } = this.state
   if( this.validateEmail(value)){
    this.setState({loading:true})
   }else{

   }
  }
   
    

 onPressSign = ()=>{
    this.props.navigation.navigate('Sign')
}

onChangeText = value =>{
  this.setState({value})
}

  render() {
    const { loading , value} = this.state
    console.log('loading', loading)
    return <View style={styles.container}>
         <Image source={require('../components/assets/background.png')} style={{position:'absolute', width:'100%', height:'100%'}} />
        <View style={styles.content}>
        <Image source={require('../components/assets/mainlogo.png')} style={{marginBottom: 40}} />
            <View style={styles.box}>
                <InputText onChangeText={this.onChangeText} placeholder="Email" />
                <LigthButton disabled={!this.validateEmail(value)}  onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Login
                </LigthButton>
                <TextButton onPress={this.onPressSign}>
                Doesn't have and account?
                </TextButton>
            </View>
           
        </View>
        {loading && <LoadingDialog text="Loading" />}
    </View>
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