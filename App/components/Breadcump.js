import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import Device from 'react-native-device-detection'

export default class BreadCump extends Component {
    
    static propTypes = {
        path: PropTypes.array,
        style: PropTypes.object,
        big: PropTypes.bool
    }

    static defaultProps = {
        path:[],
        big: false
    }
    
    renderPath = (text, index) => {
        const { big } = this.props
        const isLast = index >= this.props.path.length - 1
        const style = (isLast || !Device.isTablet) ? styles.lastText :  styles.text
        const fontSize = (big) ? {fontSize: 17, marginLeft: 5, marginRight:5} : {fontSize:15}
        const title = (big) ? text.toUpperCase() : text
        const symbol = (big) ? "/" : ">"
        const fontFamily = (big) ? 'IBMPlexSans-SemiBold' : 'IBMPlexSans'

        return <View key={index} style={styles.path} key={text}>
             <Text style={[style, fontSize,  {fontFamily}]} >{title}</Text>
             {!isLast &&<Text style={[styles.arrow, fontSize, {fontFamily}]}>{symbol}</Text>}
        </View>
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
       
        color:'#737373'
    },
    lastText:{
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