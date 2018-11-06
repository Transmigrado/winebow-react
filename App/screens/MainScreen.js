import React, {Component} from 'react'
import { StyleSheet, View, Linking, Image, Text} from 'react-native'
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

onRegionDidChange = regionFeature => {
  console.log(regionFeature)
    this.setState({zoomLevel: regionFeature.properties.zoomLevel})
}

  renderAnnotations = winery => {

    const wineryId = 'winery' + winery.id
    return <Mapbox.PointAnnotation
        key={wineryId}
        id={wineryId}
        cluster
        clusterMaxZoomLevel={6}
        coordinate={[parseFloat(winery.longitude), parseFloat(winery.latitude)]}>

        <View style={styles.annotationContainer}>
          <Image source={require('../components/assets/pin.png')} />
        </View>
       
      </Mapbox.PointAnnotation>

  }

  onSourceLayerPress = (e) =>  {
    const { zoomLevel } = this.state
    if(zoomLevel < 5){
      const feature = e.nativeEvent.payload
      const { properties } = feature
      const { metadataId } = properties
      const { regions } = this.props
    
      const countryRegions = regions.filter( region => {
        return region.country_id === metadataId
      })
  
      const center = [0,0]
  
  
      if(feature != null){
        countryRegions.forEach(region => {
          if(region.geojson !== null){
            center[0] = center[0] + region.geojson.features[0].geometry.coordinates[0][0][0]
            center[1] = center[1] + region.geojson.features[0].geometry.coordinates[0][0][1]
          }
        
      })
      }
      center[0] = center[0] / countryRegions.length
      center[1] = center[1] / countryRegions.length
  
      console.log(center)
  
      this.map.setCamera({
        centerCoordinate: center,
        zoom: 6,
        duration: 2000,
      })
  
     
    }
   
  }

  renderCountryLayer = country =>{

    if(country.geojson == null){
      return null
    }

 
    let data = {...country.geojson.features[0]}
      data.properties = {...data.properties,  metadataId : country.id}

   
    const style = {
      fillAntialias: true,
      fillColor: data.properties.fill,
      fillOpacity: data.properties['fill-opacity'],
      fillOutlineColor: 'rgba(136, 149, 107, 0.84)',
    }

  

    let latitude = 0
    let longitude = 0
    let countData = 0

    data.geometry.coordinates.forEach(coordinates => {
      countData += coordinates.length
      coordinates.forEach(coordinate => {
      
        if(Number.isNaN(Number(coordinate[0])) === false){
          latitude += Number(coordinate[0])
          longitude += Number(coordinate[1])
        }else{
          countData--
        }
       
      })
    })


    

    latitude /= (countData !== 0) ? countData : 1
    longitude /= (countData !== 0) ? countData : 1

    const fillId = 'winebow'+country.id.toString()
    const markerId = 'marker-'+fillId
    
 
    return <React.Fragment>
            <Mapbox.PointAnnotation
        key={markerId}
        id={markerId}
        coordinate={[latitude,longitude]}>

        <View style={styles.annotationContainer}>
          <Text>{country.name}</Text>
        </View>
       
      </Mapbox.PointAnnotation>
      
      <Mapbox.ShapeSource 
    hitbox={{ width: 100, height: 100 }}
    onPress={this.onSourceLayerPress} 
    key={fillId} id={fillId} shape={data}>
    <Mapbox.FillLayer
      id={fillId}
      style={style}
    />
  </Mapbox.ShapeSource>
  </React.Fragment>
 

  }

  renderEcuatorLines = () => {
    const lineTop = "lineTop"
    const lineBottom = "lineBottom"
    const lineCenter = "lineCenter"

    const  line1 = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -180,40
              ],
              [
                180,40
              ]
            ]
          }
        }
      ]
    }

    const  line2 = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -180,-40
              ],
              [
                180,-40
              ]
            ]
          }
        }
      ]
    }

    const  line3 = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -180,0
              ],
              [
                180,0
              ]
            ]
          }
        }
      ]
    }




    const styleLineBold = {lineColor:"#23794A", lineOpacity:0.3 ,  lineWidth : 2}
    const styleLine = {lineColor:"#23794A" , lineOpacity:0.3,   lineWidth : 1}
    const styleText = { color : "#23794A" }
    return   <React.Fragment>


          <Mapbox.ShapeSource id='line1' shape={line1}>
            <Mapbox.LineLayer id='linelayer1' style={styleLine} />
          </Mapbox.ShapeSource>

          <Mapbox.ShapeSource id='line2' shape={line2}>
            <Mapbox.LineLayer id='linelayer2' style={styleLine} />
          </Mapbox.ShapeSource>


          <Mapbox.ShapeSource id='line3' shape={line3}>
            <Mapbox.LineLayer id='linelayer3' style={styleLineBold} />
          </Mapbox.ShapeSource>


      <Mapbox.PointAnnotation
    key={lineTop}
    id={lineTop}
    coordinate={[-120,42]}>

    <View style={styles.annotationContainer}>
      <Text style={styleText}>40º</Text>
    </View>
   
  </Mapbox.PointAnnotation>


    <Mapbox.PointAnnotation
    key={lineCenter}
    id={lineCenter}
    coordinate={[-120,2]}>

    <View style={styles.annotationContainer}>
      <Text style={styleText}>Ecuator</Text>
    </View>
   
  </Mapbox.PointAnnotation>

  <Mapbox.PointAnnotation
    key={lineBottom}
    id={lineBottom}
    coordinate={[-120,-38]}>

    <View style={styles.annotationContainer}>
      <Text style={styleText}>40º</Text>
    </View>
   
  </Mapbox.PointAnnotation>
      </React.Fragment>
  }

  render() {
    
  
    const { countries, regions, wineries } = this.props
    const { zoomLevel } = this.state

    return <View style={styles.container}>
      
         <Mapbox.MapView
            ref={ ref => this.map = ref } 
            zoomLevel={zoomLevel}
            centerCoordinate={[-30,0]}
            animated = {true}
            styleURL='asset://style.json'
            onRegionDidChange={this.onRegionDidChange}
            style={styles.container}>
           
           {zoomLevel < 5 && countries.map(this.renderCountryLayer)}
           {this.renderEcuatorLines()}
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
