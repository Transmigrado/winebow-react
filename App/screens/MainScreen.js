import React, {Component} from 'react'
import { StyleSheet, View, Linking} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ModalContainer from '../containers/ModalContainer'
import Sidebar from '../components/Sidebar'
import WineScreen from '../screens/WineScreen'
import Device from 'react-native-device-detection'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as store from '../modules/store'


Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

class MainScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} onPressRight={()=>{
      console.log('ON')
      Linking.openURL('https://api.winebow.us/storage/IpAr9HS9HvGTPYDdYINcA9KtlzpnjqaHG7MPtlYd.pdf')
    }} />
  })

  static propTypes = {
    navigation: PropTypes.object,
    countries: PropTypes.array,
    wineries: PropTypes.array,
  }
  state= {
    zoomLevel:1.4
  }

  componentDidMount(){
    const { onMount } = this.props
    onMount()
}

onRegionDidChange = regionFeature=>{
    this.setState({zoomLevel: regionFeature.properties.zoomLevel})
}

  renderAnnotations = winery => {

    const wineryId = 'winery' + winery.id
    return (
      <Mapbox.PointAnnotation
        key={wineryId}
        id={wineryId}
        coordinate={[parseFloat(winery.longitude), parseFloat(winery.latitude)]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    )
  }

  renderCountryLayer = country =>{

    if(country.geojson == null){
      return null
    }

    const style = {
      fillAntialias: true,
      fillColor: country.geojson.features[0].properties.fill,
      fillOpacity: country.geojson.features[0].properties['fill-opacity'],
      fillOutlineColor: 'rgba(136, 149, 107, 0.84)',
    }

    const fillId = 'winebow'+country.id.toString()
    
    return <Mapbox.ShapeSource key={fillId} id={fillId} shape={country.geojson.features[0]}>
    <Mapbox.FillLayer
      id={fillId}
      style={style}
    />
  </Mapbox.ShapeSource>
 

  }

  render() {

    const { countries, regions, wineries } = this.props
    const { zoomLevel } = this.state

    return <View style={styles.container}>
      
         <Mapbox.MapView
          onStyleLoad={ ref => this.map = ref } 
            zoomLevel={zoomLevel}
            centerCoordinate={[-30,0]}
            styleURL='asset://style.json'
            onRegionDidChange={this.onRegionDidChange}
            style={styles.container}>
           
           {zoomLevel < 5 && countries.map(this.renderCountryLayer)}
           {zoomLevel >= 5 && regions.map(this.renderCountryLayer)}
           {zoomLevel >= 6 && wineries.map(this.renderAnnotations)}

        </Mapbox.MapView>
        <ModalContainer />
        {Device.isTablet && <Sidebar>
          <WineScreen />
        </Sidebar>}
    </View>
  }
}


const mapStateToProps = (state) => ({
    countries: store.getCountries(state),
    regions: store.getRegions(state),
    wineries: store.getWineries(state)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
      store.fetchCountriesThunk(dispatch)
      store.fetchRegionsThunk(dispatch)
      store.fetchWineriesThunk(dispatch)
      store.fetchWinesThunk(dispatch)
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(MainScreen)


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

const layerStyles = Mapbox.StyleSheet.create({
  smileyFace: {
    fillAntialias: true,
    fillColor: 'rgba(136, 149, 107, 0.84)',
    fillOutlineColor: 'rgba(136, 149, 107, 0.84)',
  },
});
