import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import PropTypes from 'prop-types'
import Card from '../Card'
import { CachedImage } from 'react-native-cached-image'
export default class WineItem extends Component {
    
    static propTypes = {
        item: PropTypes.object,

     }
    _onPress = () =>{
        const { item } = this.props
        Linking.openURL(item.url);
    }

    render() {
        const { item } = this.props
        return <TouchableOpacity onPress={this._onPress} style={styles.container}>
            <View style={styles.content}>
                    <Card style={{width:200,height:200}}>
                {item.image !== undefined && <CachedImage
                        resizeMode="contain"
                        style={{width: 160, height: 170, marginTop: 5, marginBottom:5, borderRadius: 6 }}
                        source={{uri:item.image}}
                        />}
            </Card>
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Text style={{ color: '#1D386D', fontFamily:'IBMPlexSans-SemiBold'}}>{item.name}</Text>
                <Text style={{fontFamily:'IBMPlexSans', marginTop:5}}>{item.variety}</Text>
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