import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'

export default class TextButton extends Component {
    static propTypes = {
        children: PropTypes.any
    }

    render() {
        const {  children } = this.props
        return <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text:{
        color:'#636363', 
        fontSize: 12
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 26,
        height: 52,
    }
})