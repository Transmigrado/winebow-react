import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Modal from '../components/Modal'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')
/*
<Mapbox.MapView
            zoomLevel={10}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}>
        </Mapbox.MapView>
*/
export default class App extends Component {
  render() {
    return <View style={styles.container}>
        <View style={{flex:1, backgroundColor:'blue'}}></View>
        <Modal />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
