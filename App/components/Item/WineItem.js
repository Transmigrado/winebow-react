import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Card from '../Card'

export default class WineItem extends Component {
    
    static propTypes = {
        navigation: PropTypes.object
     }
    _onPress = ()=>{
        this.props.navigation.navigate('WineDetail')
    }

    render() {
        
        return <TouchableOpacity onPress={this._onPress} style={styles.container}>
            <View style={styles.content}>
                    <Card style={{width:140,height:120, marginLeft:-20}}>
                <Image
                        style={{width: 100, height: 100, borderRadius: 6, }}
                        source={require('../assets/wineyard.png')}
                        />
            </Card>
            <View>
                <Text>TerraNoble</Text>
                <Text>Country: Chile</Text>
                <Text>Region: Colchagua Valley</Text>
            </View>
        </View>
         <View style={styles.bottomLine}></View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
    },
    content: {
        flex:1,
        flexDirection:'row',
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
       
    },
    bottomLine:{
        width:'100%',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})