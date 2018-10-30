import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { PropTypes } from 'prop-types'

export default class BackButton extends Component {
    static propTypes = {
       style:  PropTypes.object,
       onPress: PropTypes.func
    }

    render() {
       const { style, onPress } = this.props

        return <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
         
                <Text style={styles.text}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100
    },
    text:{
        color:'white', 
        fontWeight: 'bold',
        fontSize: 12
    },
    button:{
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 13,
        height: 26,
    }
})