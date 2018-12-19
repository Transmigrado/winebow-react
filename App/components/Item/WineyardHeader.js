import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class WineyardHeader extends Component {
    
    render() {
      
        return <View style={styles.titleContent}>
        <Text style={styles.subtitle}>Vineyards and Wineries</Text>
        <View style={styles.bottomLine}></View>
</View>
    }
}

const styles = StyleSheet.create({
    titleContent:{
        paddingTop: 23,
        paddingBottom: 12,
        backgroundColor:'white'
    },
    bottomLine:{
        width:'100%',
        marginTop:10,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    subtitle:{
        fontSize: 16,
        fontFamily: 'IBMPlexSans'
    },
})