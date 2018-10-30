import React, {Component} from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import PropTypes from 'prop-types'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

/*
 <Mapbox.MapView
            zoomLevel={1.4}
            centerCoordinate={[-30,0]}
            style={styles.container}>         
        </Mapbox.MapView>
        */
class SignScreen extends Component {

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
    this.props.navigation.goBack(null)
 }

  render() {
    return <View style={styles.container}>
         <Image source={require('../components/assets/background.png')} style={{position:'absolute', width:'100%', height:'100%'}} />
        <View style={styles.content}>
       
            <View style={styles.box}>
                <Text style={{fontSize: 30, textAlign:'center', marginBottom: 10}}>
                    Join our growing community
                </Text>
                <Text style={{fontSize: 14, textAlign:'center',marginTop: 10, marginBottom: 30}}>
                To require access enter your data and our team will contact you
                </Text>
                
                <InputText placeholder="Name" />
                <InputText placeholder="Email" style={{marginTop: 10}} />
                <LigthButton onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Request Access
                </LigthButton>
                <TextButton onPress={this.onPressSign}>
                Already have an acount?
                    </TextButton>
            </View>
           
        </View>
    </View>
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