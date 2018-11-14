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
import Device from 'react-native-device-detection'
import SkeletonAnimation from '../components/SkeletonAnimation'

export default class List extends Component {
    

    static propTypes = {
       countries: PropTypes.array,
       onSelect: PropTypes.func,
       isLoading: PropTypes.bool
    }
    _onPress = index =>{
        const country = this.props.countries[index]
        this.props.onSelect(1, country, 0)
    }
    renderItem = ({item, index}) => {
        
        const { name, slug, wineryCount, image } = item
        const width =  (Device.isTablet) ? 200 : Math.floor((Dimensions.get('window').width / 2))
        const itemStyle = (Device.isTablet) ? {} : ((index % 2 == 0)? {left:20} : {left:5})
        const skeletonStyle = {width, height: width, marginLeft: 20}
        const { isLoading }= this.props


       return    <TouchableOpacity key={slug} onPress={()=>{this._onPress(index)}} style={[{width: width, height: width},styles.item, itemStyle]}>
       {image !== undefined && <Image
    style={[styles.itemImage,{width: width - 25, height: width - 25}]}
    source={{uri: image.replace('images/','')}}
    cache="only-if-cached"
    />}
    <View style={[styles.itemContent,{width: width - 25, height: width - 25}]}>
        <Text style={[styles.text,styles.textBold]}>{name}</Text>
        {wineryCount && <Text style={styles.text}>{`${wineryCount} wineries`}</Text>}
    </View>
</TouchableOpacity>
    }

    renderHeader = show =>{
        if(!show){
            return null
        }
        return  <View style={styles.titleContent}>
        <Text style={styles.title}>Countries</Text>
       </View>
    }

    render() {

        const { countries, isLoading } = this.props
       
        const props = { numColumns: 2}

        if(Device.isTablet){
            props.horizontal = true
            delete props.numColumns
        }

        const contentInset = (Device.isTablet) ? { left : 20 } : {bottom:160}
        
        return <View style={styles.container}>
                {Device.isTablet && this.renderHeader(true)}
                <FlatList
                    ListHeaderComponent = {this.renderHeader(!Device.isTablet)}
                    data={countries}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    horizontal={Platform.isPad}
                    keyExtractor={(item, index) => item.id}
                    {...props}
                    contentInset={contentInset}
                    automaticallyAdjustContentInsets={true}
                    />
                </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
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
        fontSize: 30,
        fontFamily: "IBMPlexSans-Bold",
    },
    item:{
        flex:1
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
        fontSize:16,
        fontFamily: "IBMPlexSans",
    },
    textBold:{
        fontWeight: 'bold',
        fontFamily: "IBMPlexSans-SemiBold",
    }
})