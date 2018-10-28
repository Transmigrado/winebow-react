import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'

import Card from '../Card'

export default class WineyardItem extends Component {
    
    render() {
        
        return <View>
                    <Card>
                <Image
                        style={{width: 100, height: 100 }}
                        source={require('../assets/wineyard.png')}
                        />
            </Card>
            <View>
                <Text>TerraNoble</Text>
                <Text>Country: Chile</Text>
                <Text>Region: Colchagua Valley</Text>
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