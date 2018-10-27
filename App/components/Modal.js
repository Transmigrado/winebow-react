import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Draggable from './Draggable'
import List from './List'
import Detail from './Detail'

export default class Modal extends Component {
   
    state = {
        mode : 0
    }
    onSelect = ()=>{
        this.setState({mode:1})
    }

    render() {
        const { mode } = this.state

        return <View style={styles.container}>
            <Draggable />
            <View style={styles.content}>
                {mode == 0 && <List onSelect={this.onSelect} />}
                {mode == 1 && <Detail onSelect={this.onSelect} />}
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