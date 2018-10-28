import React, { Component } from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import Draggable from './Draggable'
import List from './List'
import Detail from './Detail'
import WineYardDetail from './WineYardDetail'
import Trip from './Trip'
import PropTypes from 'prop-types'

export default class Modal extends Component {
   
    static propTypes = {
       onMount : PropTypes.func,
       countries: PropTypes.array
    }

    state = {
        mode: 0,
        y: new Animated.Value(Dimensions.get('window').height - 80),
        animated: false
    }

    componentDidMount(){
        const { onMount } = this.props
        onMount()
    }

    onSelect = mode =>{
        console.log(mode)
        this.setState({ mode })
    }

    _onDragged = y =>{
     
        Animated.timing(                  
            this.state.y,            
            {
              toValue: y + 40 ,                   
              duration: 0,              
            }
          ).start();   
    }

    _onDraggedEnd = expanded => {
        this.setState({ animated : true })
        Animated.timing(                  
            this.state.y,            
            {
              toValue: (expanded)? 100 : Dimensions.get('window').height - 80,                   
              duration: 500,              
            }
          ).start();   
    }

    render() {

        const { countries } = this.props
        const { mode, y } = this.state
     
        return <React.Fragment>
           
            <Animated.View style={[styles.content,{ top : y }]}>
                <Trip style={{}} />
                {mode == 0 && <List countries={countries} onSelect={this.onSelect} />}
                {mode == 1 && <Detail onSelect={this.onSelect} />}
                {mode == 2 && <WineYardDetail onSelect={this.onSelect} />}
            </Animated.View>
            <Draggable 
                onDraggedEnd={this._onDraggedEnd} 
                onDragged={this._onDragged} />
        </React.Fragment>
    }
}

const styles = StyleSheet.create({
    
    content: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'absolute',
        backgroundColor:'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10 ,
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        elevation: 5
    }
})