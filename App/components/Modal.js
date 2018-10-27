import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Draggable from './Draggable'
import List from './List'

export default class Modal extends Component {
   
    render() {
        
        return <View style={styles.container}>
            <Draggable />
            <View style={styles.content}>
                <List />
            </View>
           
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'transparent'
    },
    content: {
        flex:1,
        width:'100%',
        backgroundColor:'white',
        marginTop: 40
    }
})