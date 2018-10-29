import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import LigthButton from '../components/LigthButton'
import InputText from '../components/InputText'
import TextButton from '../components/TextButton'
import { withNavigation } from 'react-navigation'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

class LoginScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} />
  })

  static propTypes = {
    navigation: PropTypes.object
 }

 onPressLogin = ()=>{
    this.props.navigation.navigate('Main')
 }

  render() {
    return <View style={styles.container}>
         <Mapbox.MapView
            zoomLevel={1.4}
            centerCoordinate={[-30,0]}
            style={styles.container}>         
        </Mapbox.MapView>
        <View style={styles.content}>
            <View style={styles.box}>
                <InputText />
                <LigthButton onPress={this.onPressLogin}  style={{marginTop: 20, marginBottom:10}}>
                Login
                </LigthButton>
                <TextButton>
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