import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Device from 'react-native-device-detection'

export default class BreadCump extends Component {
    
    static propTypes = {
        path: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.object,
        big: PropTypes.bool
    }

    static defaultProps = {
        path:[],
        big: false
    }
    
    state  = {
        path : []
    }

    onPress = index =>{
        const { onPress } = this.props
        onPress(index)
    }

    renderPath = (text, index) => {
        const { big } = this.props
        const isLast = index >= this.props.path.length - 1
        const style = (isLast) ? styles.lastText :  styles.text
        const fontSize = (big) ? {fontSize: 17, marginLeft: 5, marginRight:5} : {fontSize:15}
        const title = (big) ? text.toUpperCase() : text
        const symbol = (big) ? "/" : ">"
        const fontFamily = (big) ? 'IBMPlexSans-SemiBold' : 'IBMPlexSans'

        if(big && !isLast){
            return <TouchableOpacity onPress={()=>{this.onPress(index)}} key={index} style={styles.path} key={text}>
            <Text style={[style, fontSize,  {fontFamily}]} >{title}</Text>
            {!isLast &&<Text style={[styles.arrow, fontSize, {fontFamily}]}>{symbol}</Text>}
       </TouchableOpacity>
        }

        console.log([style, fontSize,  {fontFamily}])

        return <TouchableOpacity onPress={()=>{this.onPress(index)}} key={index} style={styles.path} key={text}>
             <Text style={[style, fontSize,  {fontFamily}]} >{title}</Text>
             {!isLast &&<Text style={[styles.arrow, fontSize, {fontFamily}]}>{symbol}</Text>}
        </TouchableOpacity>
    }
 
    render() {
        const { path , style} = this.props

        return <View style={[styles.container, style]}>
            {path.map(this.renderPath)}
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'row'
    },
    text:{
        letterSpacing:  (Device.isTablet) ? 3 : 1,
        marginTop:3,
        color:'#737373'
    },
    lastText:{
        letterSpacing: (Device.isTablet) ? 3 : 1,
        marginTop:3,
        color: '#AB3F66',
    },
    path:{
        flexDirection: 'row'
    },
    arrow:{
        color:'#737373',
        marginLeft: 8,
        marginRight : 8
    }
})