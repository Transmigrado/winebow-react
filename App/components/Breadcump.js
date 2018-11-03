import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'



export default class BreadCump extends Component {
    
    static propTypes = {
        path: PropTypes.array,
        style: PropTypes.object
    }

    static defaultProps = {
        path:[]
    }
    
    renderPath = (text, index) => {
        const isLast = index >= this.props.path.length - 1
        const style = (isLast) ? styles.lastText :  styles.text
        return <View key={index} style={styles.path} key={text}>
             <Text style={style} >{text}</Text>
             {!isLast &&<Text style={styles.arrow}>></Text>}
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
        color: '#AB3F66',
        fontSize: 16
    },
    lastText:{
        color:'#737373',
        fontSize: 16
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