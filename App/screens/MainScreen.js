import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Modal from '../components/Modal'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')
/*
<Mapbox.MapView
            zoomLevel={10}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}>
        </Mapbox.MapView>
*/
class MainScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object
 }

  render() {
    return <View style={styles.container}>
        <View style={{flex:1}}></View>
        <Modal />
    </View>
  }
}

export default withNavigation(MainScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
