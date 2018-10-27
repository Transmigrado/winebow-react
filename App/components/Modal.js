import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import Draggable from './Draggable'
import List from './List'
import Detail from './Detail'

export default class Modal extends Component {
   
    state = {
        mode: 0,
        y: 0
    }
    onSelect = ()=>{
        this.setState({ mode:1 })
    }

    _onDragged = y =>{
        this.setState({ y })
    }

    _onDraggedEnd = () => {

    }

    render() {
        const { mode, y } = this.state
        const bottomPosition = (y==0) ? Dimensions.get('window').height - 120 : y + 60

        return <View style={styles.container}>
            <Draggable 
                onDraggedEnd={this._onDraggedEnd} 
                onDragged={this._onDragged} />
            <View style={[styles.content,{ top : bottomPosition }]}>
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
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'absolute',
        backgroundColor:'white',
    }
})