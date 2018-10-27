import React, { Component } from "react"
import {
  StyleSheet,
  PanResponder,
  Animated,
  Text
} from "react-native";

import Card from './Card'

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
  
    
    this.state.pan.addListener((value) => this._val = value);
   
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5
        }).start();
      }
      //this.state.pan.setValue({ x:0, y:0})
    })
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={panStyle}
        >
            <Card />
        </Animated.View>
    );
  }
}


