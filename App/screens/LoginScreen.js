import React, {Component} from 'react'
import { StyleSheet, View, Image} from 'react-native'
import PropTypes from 'prop-types'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'


class LoginScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: null
  })

  static propTypes = {
    navigation: PropTypes.object
 }

 onPressLogin = ()=>{
    this.props.navigation.navigate('Main')
 }

 onPressSign = ()=>{
  this.props.navigation.navigate('Sign')
}

  render() {
    return <View style={styles.container}>
         <Image source={require('../components/assets/background.png')} style={{position:'absolute', width:'100%', height:'100%'}} />
        <View style={styles.content}>
        <Image source={require('../components/assets/mainlogo.png')} style={{marginBottom: 40}} />
            <View style={styles.box}>
                <InputText placeholder="Email" />
                <LigthButton onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Login
                </LigthButton>
                <TextButton onPress={this.onPressSign}>
                Doesn't have and account?
                    </TextButton>
            </View>
           
        </View>
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