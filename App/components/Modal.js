import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native'
import Draggable from './Draggable'
import List from './List'
import DetailContainer from '../containers/DetailContainer'
import RegionDetailContainer from '../containers/RegionDetailContainer'
import Trip from './Trip'
import PropTypes from 'prop-types'
import Device from 'react-native-device-detection'


export default class Modal extends Component {
   
    static propTypes = {
       onMount : PropTypes.func,
       countries: PropTypes.array
    }

    state = {
        mode: 0,
        y: new Animated.Value(Dimensions.get('window').height - 120),
        animated: false
    }

    componentDidMount(){
        const { onMount } = this.props
        onMount()
    }

    onSelect = (mode, item) =>{
        if(mode === 1){
            this.setState({ mode, itemCountry: item })
        }else if(mode === 2){
            this.setState({ mode, itemWineyard: item })
        }else{
            this.setState({ mode})
        }


        
    }

    onBack = mode => {
        this.setState({ mode })
    }

    _onDragged = y =>{
        
        Animated.timing(                  
            this.state.y,            
            {
              toValue:  y + 40 ,                   
              duration: 0,              
            }
          ).start();   
    }

    _onDraggedEnd = expanded => {
        this.setState({ animated : true , expanded})
        Animated.timing(                  
            this.state.y,            
            {
              toValue: (expanded)? ((Device.isTablet)? Dimensions.get('window').height - 560: 100) : Dimensions.get('window').height - 120,                   
              duration: 500,              
            }
          ).start();   
    }

    render() {

        const { countries  } = this.props
        const { mode, y, expanded, itemCountry, itemWineyard } = this.state
        const widthScreen = Dimensions.get('window').width
        const style = ( Device.isTablet) ? { marginLeft: 20, marginRigth: 20, width: widthScreen - 40} : {width: widthScreen}
     
        return <React.Fragment>
           
            <Animated.View style={[styles.content, style,{ top : y }]}>
         
                <Trip mode={mode} onPress={this.onBack} expanded={expanded} style={{}} />
                {mode == 0 && <List countries={countries} onSelect={this.onSelect} />}
                {mode == 1 && <DetailContainer item={itemCountry} onSelect={this.onSelect} />}
                {mode == 2 && <RegionDetailContainer item={itemWineyard} onSelect={this.onSelect} />}
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