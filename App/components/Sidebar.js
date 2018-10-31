import React, { Component } from 'react'
import { StyleSheet, View, Text  } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Sidebar extends Component {
    static propTypes = {
        children: PropTypes.any,
       style:  PropTypes.object,
       onPress: PropTypes.func
    }

    render() {
       const { style, children } = this.props

        return <View style={[styles.container, style]}>
             {children}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        width: 380,
        height:'100%',
        position:'absolute',
        top:0,
        right: 0
    },
})