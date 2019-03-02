import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'

export default class LigthButton extends Component {
    static propTypes = {
       style:  PropTypes.object,
       children: PropTypes.any,
       onPress: PropTypes.func,
       disabled: PropTypes.bool
    }

    render() {
       const { style, children, onPress, disabled } = this.props

       const disabledStyle = (disabled) ? {backgroundColor : "#CCC", shadowColor:'#CCC'} : {}

        return <View style={[styles.container, style]}>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button,disabledStyle]}>
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
        fontSize: 16,
        fontFamily: "IBMPlexSans-SemiBold",
    },
    button:{
        backgroundColor:'#1D386D',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 26,
        height: 52,
        shadowColor: '#1D386D',
        shadowRadius: 6,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5
    }
})