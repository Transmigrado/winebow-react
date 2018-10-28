import React, { Component } from 'react'
import { StyleSheet, 
    View, 
    Text, 
    Image, 
    FlatList, 
    TouchableOpacity, 
    Dimensions, 
    Platform } from 'react-native'

import PropTypes from 'prop-types'

export default class List extends Component {
    

    static propTypes = {
       countries: PropTypes.array,
       onSelect: PropTypes.func
    }
    _onPress = ()=>{
        this.props.onSelect(1)
    }
    renderItem = ({item, index}) => {
        
        const { name, slug, count } = item
        const width =  Math.floor((Dimensions.get('window').width / 2))
        const itemStyle = (index % 2 == 0)? {left:20} : {left:5}
       
       return  <TouchableOpacity key={slug} onPress={this._onPress} style={[{width: width, height: width},styles.item, itemStyle]}>
                   <Image
                style={[styles.itemImage,{width: width - 25, height: width - 25}]}
                source={require('./assets/chile.jpg')}
                />
                <View style={[styles.itemContent,{width: width - 25, height: width - 25}]}>
                    <Text style={[styles.text,styles.textBold]}>{name}</Text>
                    <Text style={styles.text}>{`${count} wineries`}</Text>
                </View>
           </TouchableOpacity>
    }

    renderHeader = ()=>{
        if(Platform.isPad){
            return null
        }
        return  <View style={styles.titleContent}>
        <Text style={styles.title}>Countries</Text>
       </View>
    }

    render() {

        const { countries } = this.props

        const props = { numColumns: 2}

        if(Platform.isPad){
            props.horizontal = true
            delete props.numColumns
        }
        
        return <View style={styles.container}>
                <FlatList
                    ListHeaderComponent = {this.renderHeader()}
                    data={countries}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    style={{marginBottom:160}}
                    horizontal={Platform.isPad}
                    {...props}
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
        borderRadius: 10,
        top:12.5,
        position:'absolute'
    },
    itemContent:{
        justifyContent:'flex-end',
        top:12.5,
        borderRadius: 10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    text:{
        color:'white',
        fontSize:16
    },
    textBold:{
        fontWeight: 'bold'
    }
})