import React, {Component} from 'react'
<<<<<<< HEAD
import { StyleSheet, View, Linking, Image, Text, TouchableOpacity, Alert} from 'react-native'
=======
import { StyleSheet, View, Linking, Image, Text, TouchableOpacity} from 'react-native'
>>>>>>> parent of 8624903... fix region zoom
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
import EventEmitter from 'events'
import Breadcump from '../components/Breadcump'


Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

const PIN_ICON = require('../components/assets/pin.png')

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
    isLoading: PropTypes.bool
  }
  state= {
<<<<<<< HEAD
    zoomLevel: 1.4,
=======
    zoomLevel:1.4,
>>>>>>> parent of 8624903... fix region zoom
    path: ['World']
  }

  componentDidMount(){
    
    const { onMount } = this.props
    onMount()

    this._emitter = new EventEmitter()

    this._emitter.addListener('SelectItem', item => {
      this.triggerItem(item)
    })
    this._emitter.addListener('SelectCountry', country => {
      this.setState({path : ['World', country.name]})
    })

    this._emitter.addListener('SelectRegion', region => {
      this.setState({path : ['World', region.country, region.name]})
    })
  

   
}

triggerItem = item => {

  const { navigation } = this.props


  if(Device.isTablet){

    if(this.modal != undefined){
      this.modal.getWrappedInstance().close()
    }
   
    setTimeout(()=>{
      this.setState({selectItem : item})
    }, 500)
    
   }else{
    navigation.navigate('WineDetail', { item })
   }
}

onRegionDidChange = regionFeature => {
    this.setState({zoomLevel: regionFeature.properties.zoomLevel})
}

  renderAnnotations = winery => {

    const wineryId = 'winery' + winery.id
<<<<<<< HEAD
    const zoomLevel = this.state.zoomLevel


=======
    const {zoomLevel} = this.state
>>>>>>> parent of 8624903... fix region zoom
    return <Mapbox.PointAnnotation
        key={wineryId}
        id={wineryId}
        cluster
            clusterRadius={50}
            clusterMaxZoom={14}
        coordinate={[parseFloat(winery.longitude), parseFloat(winery.latitude)]}
        
        >

        <TouchableOpacity onPress={()=>{
          this.triggerItem(winery)
        }} style={styles.annotationContainer}>
          <Image source={PIN_ICON} />
          {zoomLevel >=7 && <Text>{winery.name}</Text>}
        </TouchableOpacity>
       
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
  
  
      this.map.setCamera({
        centerCoordinate: center,
        zoom: 6,
        duration: 2000,
      })
  
     
    }
   
  }

  isNumber(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
    }

  getAverage = data => {

    let latitude = 0
    let longitude = 0
    let countData = 0

    let mapData = []

    if(data[0][0].length == 2 && this.isNumber(data[0][0][0]) && this.isNumber(data[0][0][1])){
      mapData = mapData.concat(data)
    }else{
      data.forEach( d => {
        mapData = mapData.concat(d)
      })
    
    }

    mapData.forEach(coordinates => {
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

    return { latitude, longitude}
  }

  renderCountryLayer = country =>{

    if(country.geojson == null){
      return null
    }

 
    let data = {...country.geojson.features[0]}
<<<<<<< HEAD
    data.properties = {...data.properties,  metadataId : country.id}
=======
      data.properties = {...data.properties,  metadataId : country.id}

>>>>>>> parent of 8624903... fix region zoom
   
    const style = {
      fillAntialias: true,
      fillColor: data.properties.fill,
      fillOpacity: data.properties['fill-opacity'],
      fillOutlineColor: 'rgba(136, 149, 107, 0.84)',
    }


    const { latitude, longitude } = this.getAverage( data.geometry.coordinates)

    const fillId = 'winebow'+country.id.toString()
    const markerId = 'marker-'+fillId

    const { zoomLevel } = this.state
    const fontSizeStyle = (zoomLevel < 7) ? {fontSize : 10} : {fontSize:16}

    
 
    return <React.Fragment>
             <Mapbox.PointAnnotation
        key={markerId}
        id={markerId}
        coordinate={[latitude,longitude]}>

        <TouchableOpacity onPress={()=>{
          
          if(country.geojson.features[0].properties.type === "Sovereign country"){
           this._emitter.emit('SelectCountryFromMap', country)
           this.moveCamera({latitude,longitude, zoomLevel:6})
          }else{
            this._emitter.emit('SelectRegionFromMap', country)
            this.moveCamera({latitude,longitude, zoomLevel:8})
          }
         
<<<<<<< HEAD
        }} style={[styles.annotationContainer,{width:100,height:100,borderRadius:50,  justifyContent:'center'}]}>
         <Text style={fontSizeStyle}>{country.name}</Text>
        </TouchableOpacity>
       
      </Mapbox.PointAnnotation>
      
      <Mapbox.ShapeSource 
    hitbox={{ width: 100, height: 100 }}
    onPress={this.onSourceLayerPress} 
    key={fillId} id={fillId} shape={country.geojson}>
    <Mapbox.FillLayer
      id={fillId}
      style={style}
    />
  </Mapbox.ShapeSource>
  </React.Fragment>
 

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

    const center = (country.center !== undefined) ? country.center : [0,0]

   
    const fillId = 'winebow'+country.id.toString()
    const markerId = 'marker-'+fillId

    const { zoomLevel } = this.state
    const fontSizeStyle = (zoomLevel < 7) ? {fontSize : 10} : {fontSize:16}

    
 
    return <React.Fragment key={markerId}>
             <Mapbox.PointAnnotation
        key={markerId}
        id={markerId}
        coordinate={center}>

        <TouchableOpacity onPress={()=>{
           this._emitter.emit('SelectCountryFromMap', country)
         
        }} style={[styles.annotationContainer,{width:60,height:60,borderRadius:30,  justifyContent:'center'}]}>
        
=======
        }} style={[styles.annotationContainer,{width:100,height:100,borderRadius:50, justifyContent:'center'}]}>
          {zoomLevel >= 5 &&<Text style={fontSizeStyle}>{country.name}</Text>}
>>>>>>> parent of 8624903... fix region zoom
        </TouchableOpacity>
       
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
      <Text style={styleText}>40º N</Text>
    </View>
   
  </Mapbox.PointAnnotation>


    <Mapbox.PointAnnotation
    key={lineCenter}
    id={lineCenter}
    coordinate={[-120,2]}>

    <View style={styles.annotationContainer}>
      <Text style={styleText}>0º Equator</Text>
    </View>
   
  </Mapbox.PointAnnotation>

  <Mapbox.PointAnnotation
    key={lineBottom}
    id={lineBottom}
    coordinate={[-120,-38]}>

    <View style={styles.annotationContainer}>
      <Text style={styleText}>40º S</Text>
    </View>
   
  </Mapbox.PointAnnotation>
      </React.Fragment>
  }

    onSelect = (item, zoom) => {
    
      if(item.geojson !== undefined){
      
        const { latitude, longitude } = this.getAverage(item.geojson.features[0].geometry.coordinates)

          this.map.setCamera({
            centerCoordinate: [latitude, longitude],
            zoom: zoom,
            duration: 2000,
          })
      }
    }

    moveCamera = ({latitude, longitude, zoomLevel})=>{
      console.log('MOVE CAMERA')
      this.map.setCamera({
        centerCoordinate: [latitude, longitude],
        zoomLevel,
        duration: 1000,
      })

      setTimeout(()=>{
        this.setState({zoomLevel})
      },1000)
    }

    _onBackItem= ()=>{
      this.sidebar.close()
  

      setTimeout(()=>{
        this.setState({selectItem:undefined, path:['World']})
      }, 500)
    }

  renderFooter = ()=>{
    return <View style={styles.footer}>
          <Breadcump path={this.state.path} big={true} />
    </View>
  }

  render() {
    
  
    const { countries, regions, wineries, isLoading } = this.props
    const { zoomLevel, selectItem } = this.state


    const data = {
        "type":"FeatureCollection",
        "metadata":{},
        "features":[]
    }

    wineries.forEach(winery => {
      const point = {
        "type":"Feature",
        "geometry":{
          "type":"Point",
          "coordinates":[parseFloat(winery.longitude), parseFloat(winery.latitude),4.45],
        },
        "properties":{
          "name":winery.name,
          "item":winery
        },
        "id":`winery-${winery.id}`
      }
      data.features.push(point)
    })
   

    console.log("ZOOM LEVEL", zoomLevel)

    return <View style={styles.container}>
      <View style={styles.container}>
      
         <Mapbox.MapView
            ref={ ref => this.map = ref } 
            zoomLevel={zoomLevel}
            centerCoordinate={[-30,0]}
            animated = {true}
            styleURL='asset://style.json'
            rotateEnabled={false}
            pitchEnabled={false}
            compassEnabled ={false}
            onRegionDidChange={this.onRegionDidChange}
            style={styles.container}>
           
           {this.renderEcuatorLines()}

           {zoomLevel < 5 && countries.map(this.renderCountryLayer)}
           {zoomLevel >= 5 && regions.map(this.renderRegionLayer)}

           {zoomLevel >= 6  &&<Mapbox.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={80}
            clusterMaxZoom={14}
            onPress = { ({nativeEvent}) => {
            
              if(nativeEvent.payload.properties.item !== undefined){
                this.triggerItem(nativeEvent.payload.properties.item)
              }else{
                //this.map.zoomTo(9, 100)
               // this.setState({zoomLevel:9})
              }
              
            }}
            shape={data}>
            
            <Mapbox.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

         

            <Mapbox.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

 
 <Mapbox.SymbolLayer
                id="singlePoint"
                filter={['!has', 'point_count']}
                style={layerStyles.singlePoint}
            />


            
          </Mapbox.ShapeSource>}

           

        </Mapbox.MapView>
        
        {selectItem === undefined && <ModalContainer ref={ref=>this.modal=ref} isLoading={isLoading} emitter={this._emitter} onSelect={ this.onSelect } />}

  
       
         {Device.isTablet && selectItem !== undefined && <Sidebar>
          <WineScreen  onBack={this._onBackItem} item = {selectItem} />
        </Sidebar>}

    
       
    </View>
    {Device.isTablet && this.renderFooter()}
      </View>
  }
}


const mapStateToProps = (state) => ({
    countries: store.getCountries(state),
    regions: store.getRegions(state),
    wineries: store.getWineries(state),
    isLoading: store.getLoading(state)
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
  annotationContainer:{
    alignItems:'center'
  },
  footer:{
    width:'100%',
    height:50,
    bottom:0,
    backgroundColor:'white',
    shadowColor: '#CCC',
    shadowRadius: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -4 },
    elevation: 5,
    padding:10
  }
});

const layerStyles = Mapbox.StyleSheet.create({
  singlePoint: {
    iconImage: PIN_ICON,
    textField: '{name}',
    textOffset:[0, 1.4],
    textSize: 12
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: Mapbox.StyleSheet.source(
      [
        [25, '#253071'],
        [50, '#253071'],
        [75, '#253071'],
        [100, '#253071'],
        [300, '#253071'],
        [750, '#253071'],
      ],
      'point_count',
      Mapbox.InterpolationMode.Exponential,
    ),

    circleRadius: Mapbox.StyleSheet.source(
      [[0, 15], [100, 20], [750, 30]],
      'point_count',
      Mapbox.InterpolationMode.Exponential,
    ),

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    textColor:'#FFFFFF',
    circleStrokeColor: '#253071',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textColor:'#FFFFFF',
    textPitchAlignment: 'map',
  },
});