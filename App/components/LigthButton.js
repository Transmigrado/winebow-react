import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'

export default class LigthButton extends Component {
    static propTypes = {
       style:  PropTypes.object,
       children: PropTypes.any,
       onPress: PropTypes.func
    }

    render() {
       const { style, children, onPress } = this.props

        return <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
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
        color:'white', 
        fontWeight: 'bold',
        fontSize: 16
    },
    button:{
        backgroundColor:'#9C093D',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 26,
        height: 52,
        shadowColor: '#9C093D',
        shadowRadius: 6,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5
    }
})