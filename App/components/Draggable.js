import React, { Component } from "react"
import {
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";


import PropTypes from 'prop-types'
import Device from 'react-native-device-detection'

const heightScreen =  Dimensions.get('window').height

export default class Draggable extends Component {

  static propTypes = {
    onDragged: PropTypes.func,
    onDraggedEnd: PropTypes.func,
    mode: PropTypes.number
 }

  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      expanded : false
    }
  }

  y = 0

  getExpanded = () => {

    const { mode } = this.props

    if(Device.isTablet){


        if(mode === 2){

           return heightScreen - this.y > 300

        }else if(mode === 1){

          return heightScreen - this.y > 600
        }else{
          return heightScreen - this.y > 300
           
        }

        
    }


    return this.y < 200
}

getTop = () => {

  const { expanded } = this.state
  const { mode } = this.props

  if(expanded){
    if(Device.isTablet){
      if(mode == 2){
        return heightScreen - 600 
      }else if(mode == 1){
        return heightScreen - 700 
      }

      return heightScreen - 450 
    }else{
      return 100
    }
  }

  if(Device.isTablet){
    return heightScreen - 170 
  }

  return heightScreen - 120
 
}

  componentWillMount() {
  
    
    this.state.pan.addListener((value) => this._val = value);


    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture)=>{
        
        this.y = this.view.props.style[0].top + this.state.pan.y._value 
        this.props.onDragged(this.y)

        Animated.event([
          null, { dy: this.state.pan.y }
        ])(e,gesture)
      },
      onPanResponderRelease: () => {

        const expanded = this.getExpanded()

        this.setState({expanded})
        this.props.onDraggedEnd(expanded)
        
        Animated.timing(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 0
        }).start()
      }
    })
  }

  render() {

    
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    const top =  this.getTop()
    const myStyle = {...styles.container, ...{ top }}

    return <Animated.View
    {...this.panResponder.panHandlers}
    style={[myStyle, panStyle]}
    ref= {ref => this.view = ref}>
        <TouchableOpacity style={{width:140, height:40, backgroundColor:'blue'}}>

        </TouchableOpacity>
    </Animated.View>
  }
}

const styles = StyleSheet.create({
  container: {
    width:  (Device.isTablet) ? Dimensions.get('window').width - 160 : Dimensions.get('window').width - 80,
    height: 40,
    position: 'absolute',
    backgroundColor:'rgba(255,0,0,0.4)',
    left: (Device.isTablet) ? 80 : 40,
    top: heightScreen - 120,
    alignItems:'center',
    justifyContent:'center'
  },
})


