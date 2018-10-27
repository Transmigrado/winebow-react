import React, { Component } from "react"
import {
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";

import Card from './Card'
import PropTypes from 'prop-types'

export default class Draggable extends Component {

  static propTypes = {
    onDragged: PropTypes.func,
    onDraggedEnd: PropTypes.func,
 }

  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
  
    
    this.state.pan.addListener((value) => this._val = value);


    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture)=>{
        this.props.onDragged(this.view.props.style[0].top + this.state.pan.y._value)
        Animated.event([
          null, { dy: this.state.pan.y }
        ])(e,gesture)
      },
      onPanResponderRelease: () => {
        this.props.onDraggedEnd()
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 0
        }).start();
      }
    })
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.container, panStyle]}
          ref= {ref => this.view = ref}
        >
            <Card />
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: Dimensions.get('window').height - 180,
  },
})


