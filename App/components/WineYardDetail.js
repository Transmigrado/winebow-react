import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

export default class WineYardDetail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func
    }
    _onPress = ()=>{
        this.props.onSelect()
    }
    renderItem = ({item, index}) => {

        const width =  Math.floor((Dimensions.get('window').width / 2))
       
       
       return  <TouchableOpacity onPress={this._onPress} style={[{width: width, height: width},styles.item]}>
                   <Image
                style={[styles.itemImage,{width: width - 25, height: width - 25}]}
                source={require('./assets/chile.jpg')}
                />
           </TouchableOpacity>
    }

    renderHeader = ()=>{
       
        return  <View style={styles.titleContent}>
                  <Image
                style={[styles.itemImage,{width: '100%', height:160}]}
                source={require('./assets/chile.jpg')}
                />
       </View>
    }

    render() {
        
        return <View style={styles.container}>
                <FlatList
                    ListHeaderComponent = {this.renderHeader()}
                    data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    numColumns={1}
                    />
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
    },
    itemImage:{
        borderRadius: 6,
        top:12.5,
        position:'absolute'
    }
})