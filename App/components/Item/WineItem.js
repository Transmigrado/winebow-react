import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Card from '../Card'

export default class WineItem extends Component {
    
    static propTypes = {
        item: PropTypes.object,

     }
    _onPress = ()=>{
        
    }

    render() {
        const { item } = this.props

        return <TouchableOpacity onPress={this._onPress} style={styles.container}>
            <View style={styles.content}>
                    <Card style={{width:'100%',height:200}}>
                <Image
                        resizeMode="contain"
                        style={{width: '100%', height: 200, borderRadius: 6, }}
                        source={{uri:item.logo}}
                        />
            </Card>
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Text style={{ color: '#AB3F66', fontWeight:'bold'}}>{item.name}</Text>
                <Text>{item.variety}</Text>
            </View>
        </View>
  
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 0.5,
        width:'100%',
    },
    content: {
        flex:1,
        flexDirection:'column',
        width:'100%',
        paddingVertical: 10
        
    },
    titleContent:{
        paddingHorizontal: 20,
        paddingTop: 23,
        paddingBottom: 12
    },
    title:{
        fontSize: 30
    },
    item:{
        flex:1,
    }
})