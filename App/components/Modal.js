import React, { Component } from 'react'
import { StyleSheet, Dimensions, Animated } from 'react-native'
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
       countries: PropTypes.array,
       onSelect: PropTypes.func,
       emitter: PropTypes.object
    }

    state = {
        mode: 0,
        y: new Animated.Value((Device.isTablet) ? Dimensions.get('window').height - 170 : Dimensions.get('window').height - 120),
        animated: false
    }

    componentDidMount(){
       
        const { onMount } = this.props
        onMount()

    }

    componentWillReceiveProps(){
        const { emitter } = this.props
        
        if(emitter !== undefined){
            emitter.addListener('SelectCountryFromMap', country => {
                this.onSelect(1, country)
            })
    
            emitter.addListener('SelectRegionFromMap', region => {
                this.onSelect(2, region)
            })
        }
       
    }


    onSelect = (mode, item) => {
        
        const { onSelect, emitter } = this.props

        if(mode === 1){
            onSelect(item, 4)
            
            if(Device.isTablet){
                emitter.emit('SelectCountry', item)
            }
           

            this.setState({ mode, itemCountry: item })
        }else if(mode === 2){
            if(Device.isTablet){
                emitter.emit('SelectRegion', item)
            }
            onSelect(item, 6)
            this.setState({ mode, itemWineyard: item })
        }else{
            this.setState({ mode})
        }
    }

    onBack = () => {
        const { itemCountry, mode } = this.state
       
        if(mode === 2){
            if(itemCountry === undefined){
                this.setState({ mode : 0 })
                return
            }
        }

        this.setState({ mode: mode - 1 })
    }

    _onDragged = y =>{
        
        Animated.timing(                  
            this.state.y,            
            {
              toValue:  y  ,                   
              duration: 0,              
            }
          ).start();   
    }
    
    getValue = expanded => {

        const { mode } = this.state

        if(Device.isTablet){


            if(mode === 2){

                if(expanded) {
                    return Dimensions.get('window').height - 600
                } 
        
                return Dimensions.get('window').height - 170

            }else if(mode === 1){

                if(expanded) {
                    return Dimensions.get('window').height - 600
                } 
        
                return Dimensions.get('window').height - 170

            }else{

                if(expanded) {
                    return Dimensions.get('window').height - 450
                } 
        
                return Dimensions.get('window').height - 170
            }

            
        }

        if(expanded) {
            return 100
        } 

        return Dimensions.get('window').height - 120
    }

    _onDraggedEnd = expanded => {
        this.setState({ animated : true , expanded})
        Animated.timing(                  
            this.state.y,            
            {
              toValue: this.getValue(expanded),                   
              duration: 500,              
            }
          ).start();   
    }

    render() {

        const { countries, emitter  } = this.props
        const { mode, y, expanded, itemCountry, itemWineyard } = this.state
        const widthScreen = Dimensions.get('window').width
        const style = ( Device.isTablet) ? { marginLeft: 20, marginRigth: 20, width: widthScreen - 40} : {width: widthScreen}

        return <React.Fragment>
           
            <Animated.View style={[styles.content, style,{ top : y }]}>
         
                <Trip mode={mode} onPress={this.onBack} expanded={expanded} style={{}} />
                {mode == 0 && <List emitter={emitter} countries={countries} onSelect={this.onSelect} />}
                {mode == 1 && <DetailContainer emitter={emitter} item={itemCountry} onSelect={this.onSelect} />}
                {mode == 2 && <RegionDetailContainer emitter={emitter} item={itemWineyard} onSelect={this.onSelect} />}
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