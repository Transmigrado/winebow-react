import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ModalContainer from '../containers/ModalContainer'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

class MainScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} />
})


  static propTypes = {
    navigation: PropTypes.object
 }

  renderAnnotations () {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[11.254, 43.772]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    )
  }

  render() {
    return <View style={styles.container}>
         <Mapbox.MapView
            zoomLevel={1.5}
            centerCoordinate={[0,0]}
            showUserLocation={true}
            style={styles.container}>
             {this.renderAnnotations()}
        </Mapbox.MapView>
        <ModalContainer />
    </View>
  }
}

export default withNavigation(MainScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});
