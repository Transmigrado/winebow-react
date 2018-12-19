import React, {Component} from 'react'
import { StyleSheet, View, Linking, Image, Text, TouchableOpacity, Animated} from 'react-native'
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
import LoadingDialog from '../components/LoadingDialog'

Mapbox.setAccessToken('pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6InZaSDVNVk0ifQ.XbzDhB01GxzIm44_FlvyFQ')

const PIN_ICON = require('../components/assets/pin.png')

class MainScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} onPressRight={()=>{

      const ENDPOINT = 'https://api.winebow.us/api/files?token=f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'
      fetch(ENDPOINT)
          .then(response => response.json())
          .then(data => {
        
            Linking.openURL(data.data[0].file)
          })
     
    }} />
  })

  static propTypes = {
    navigation: PropTypes.object,
    countries: PropTypes.array,
    wineries: PropTypes.array,
  }
  state= {
    zoomLevel: 1.4,
    path: ['World']
  }

  componentDidMount(){
    const { onMount, navigation } = this.props
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
    this.setState({selectItem : item})
  }else{
    navigation.navigate('WineDetail', { item })
  }

  this.setState({path : ['World',item.countryName,item.regionName, item.name]})
}

onRegionDidChange = regionFeature => {

    this.setState({zoomLevel: regionFeature.properties.zoomLevel})
}

  renderAnnotations = winery => {

    const wineryId = 'winery' + winery.id
    const zoomLevel = this.state.zoomLevel


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
    
      let mapData = []

      if(data[0][0].length == 2 && this.isNumber(data[0][0][0]) && this.isNumber(data[0][0][1])){
        mapData = mapData.concat(data)
      }else{
        data.forEach( d => {
          mapData = mapData.concat(d)
        })
      
      }

    const lastData = []
      

    mapData.forEach(coordinates => {
    
      coordinates.forEach(coordinate => {
        //
        if(Number.isNaN(Number(coordinate[0])) === false){
          lastData.push({latitude: Number(coordinate[0]), longitude: Number(coordinate[1])})
        }
        //
      })
    })


        let x = lastData.map(c => c.latitude)
        let y = lastData.map(c => c.longitude)

       
      
        let minX = Math.min.apply(null, x)
        let maxX = Math.max.apply(null, x)
      
        let minY = Math.min.apply(null, y)
        let maxY = Math.max.apply(null, y)
      
        return {
          latitude: (minX + maxX) / 2,
          longitude: (minY + maxY) / 2
        }
      
    }

  renderRegionLayer = country =>{

    if(country.geojson == null){
      return null
    }
 
    let data = {...country.geojson.features[0]}
    data.properties = {...data.properties,  metadataId : country.id}
    
   
    const style = {
      fillAntialias: true,
      fillColor: data.properties.fill,
      fillOpacity: data.properties['fill-opacity'],
      fillOutlineColor: data.properties["stroke"] || "rgba(0,0,0,0)"
    }

    const { latitude, longitude } = this.getAverage( data.geometry.coordinates)

    const fillId = 'winebow'+country.id.toString()
    const markerId = 'marker-'+fillId

    const { zoomLevel } = this.state
    const fontSizeStyle = (zoomLevel < 7) ? {fontSize : 15, textAlign: 'center',  fontWeight: '500',  color: '#253071'} : {fontSize:16,  textAlign: 'center',   fontWeight: '500'  , color: '#253071'}
    const widthImage = (zoomLevel < 6 ) ? 30 : 20
    
    return <React.Fragment>
             
             <Mapbox.PointAnnotation
        key={markerId}
        id={markerId}
        coordinate={[latitude,longitude]}>

        <TouchableOpacity onPress={()=>{
          
          if(country.geojson.features[0].properties.type === "Sovereign country"){
           this._emitter.emit('SelectCountryFromMap', country)
          }else{
             

            this._emitter.emit('SelectRegionFromMap', country)
          }
         
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
 
    return <React.Fragment>
             <Mapbox.PointAnnotation
        key={markerId}
        id={markerId}
        coordinate={center}>

        <TouchableOpacity onPress={()=>{
           this._emitter.emit('SelectCountryFromMap', country)
         
        }} style={[styles.annotationContainer,{width:60,height:60,borderRadius:30,  justifyContent:'center'}]}>
        
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
        const center = (item.center !== undefined)?item.center : [latitude,longitude]


          this.map.setCamera({
            centerCoordinate: center,
            zoom: zoom,
            duration: 2000,
          })

      }
    }

    _onBackItem= ()=>{
      
      this.setState({selectItem:undefined, path:['World']})
    }

    _onPress = index => {

      console.log(index)

      const { path } = this.state

      this.setState({path : path.slice(0, index + 1)})

      if(index === 0){
        // move to 
       
          this.map.moveTo([-30, 0])
     
          setTimeout(()=>{
            this.setState({zoomLevel : 1.4})
          }, 1000)
       
      
          this.modal.wrappedInstance.close()
          this._onBackItem()

          if(this.sidebar !== undefined){
            try{
              this.sidebar.close()
            }catch(e){}
          }
      }else if(index === 1){

          if(Device.isTablet){

            const name = path[index]
            const { countries } = this.props
            let selectItem = null
            countries.forEach(item => {
                if(item.name === name){
                  selectItem = item
                }
            })

            this.setState({selectItem:undefined})
            if(this.sidebar !== undefined){
              try{
                this.sidebar.close()
              }catch(e){}
            }

            setTimeout(()=>{
            if(selectItem !== null){
            
              this._emitter.emit('SelectCountry', selectItem)
              if( this.modal !== null){
              
                this.modal.wrappedInstance.onSelect(1, selectItem)
                this.modal.wrappedInstance.open()
              }
              
            }
          }, 600)
          
          }else{
            this.modal.wrappedInstance.onBack()
          }
          

        
      } else if (index === 2){
        
        const name = path[index]
        const { regions } = this.props
        let selectItem = null
        regions.forEach(item => {
            if(item.name === name){
              selectItem = item
            }
        })

        this.setState({selectItem:undefined})
        if(this.sidebar !== undefined){
          try{
            this.sidebar.close()
          }catch(e){}
        }

        setTimeout(()=>{
          if(selectItem !== null){
         
         
            if( this.modal !== null){
              
              this.modal.wrappedInstance.onSelect(2, selectItem)
              this.modal.wrappedInstance.open()
            }
            
          }
        }, 600)
        

      }
    }

  renderFooter = ()=>{
    return <View style={styles.footer}>
          <Breadcump onPress={this._onPress} path={this.state.path} big={true} />
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

    const dataRegion = {
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

    /*
    regions.forEach(region => {

      let data = {...region.geojson.features[0]}
      data.properties = {...data.properties,  metadataId : region.id}
      const { latitude, longitude } = this.getAverage( data.geometry.coordinates)


      const point = {
        "type":"Feature",
        "geometry":{
          "type":"Point",
          "coordinates":[parseFloat(latitude), parseFloat(longitude),4.45],
        },
        "properties":{
          "name":region.name,
          "item":region
        },
        "id":`region -${region.id}`
      }
      dataRegion.features.push(point)
    })
    */

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

  {zoomLevel < 14 && countries.map(this.renderCountryLayer)}
           {zoomLevel >= 5 && regions.map(this.renderRegionLayer)}

            {zoomLevel >= 5 && zoomLevel< 8 && <Mapbox.ShapeSource
            id="regions"
            cluster
            clusterRadius={60}
            clusterMaxZoom={5}
            onPress = { ({nativeEvent}) => {
            

              
            }}
            shape={dataRegion}>
            
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


            
          </Mapbox.ShapeSource>
            }

           
          
           {zoomLevel >= 8  && <Mapbox.ShapeSource
            id="regions"
            cluster
            clusterRadius={60}
            clusterMaxZoom={14}
            onPress = { ({nativeEvent}) => {
            
              if(nativeEvent.payload.properties.item !== undefined){
                this.triggerItem(nativeEvent.payload.properties.item)
              }else{
               
              
                this.map.setCamera({
                  centerCoordinate: nativeEvent.payload.geometry.coordinates,
                  zoom: 11,
                  duration: 2000,
                })
            
              
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
        
        {selectItem === undefined && <ModalContainer onPressBreadCump={this._onPress} ref={ref => this.modal = ref} isLoading={isLoading} emitter={this._emitter} onSelect={ this.onSelect } />}


         {Device.isTablet && selectItem !== undefined && <Sidebar ref={ref => this.sidebar  = ref}>
          <WineScreen onBack={this._onBackItem} item = {selectItem} />
        </Sidebar>}    
       
    </View>
    {Device.isTablet && this.renderFooter()}

     {isLoading && <LoadingDialog text="Loading" />}

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
    textFont: [
      'Open Sans Semibold',
      'Arial Unicode MS Bold',
  ],
    textOffset:[0, 1.8],
    textSize: 15,
    textColor: '#253071',
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