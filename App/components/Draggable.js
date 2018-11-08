import React, { Component } from "react"
import {
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";


import PropTypes from 'prop-types'
import Device from 'react-native-device-detection'

const heightScreen =  Dimensions.get('window').height

export default class Draggable extends Component {

  static propTypes = {
    onDragged: PropTypes.func,
    onDraggedEnd: PropTypes.func,
 }

  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      expanded : false
    }
  }

  y = 0

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

        const expanded = (Device.isTablet) ? heightScreen - this.y > 300 : this.y < 200

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

    const { expanded } = this.state
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    const top =  (expanded) ? ((Device.isTablet) ? heightScreen - 600 : 100) : ((Device.isTablet) ? heightScreen - 170 : heightScreen - 120)
    const myStyle = {...styles.container, ...{ top }}

    return <Animated.View
    {...this.panResponder.panHandlers}
    style={[myStyle, panStyle]}
    ref= {ref => this.view = ref}
  />
  }
}

const styles = StyleSheet.create({
  container: {
    width:  (Device.isTablet) ? Dimensions.get('window').width - 160 : Dimensions.get('window').width - 80,
    height: 40,
    position: 'absolute',
    left: (Device.isTablet) ? 80 : 40,
    top: heightScreen - 120
  },
})


