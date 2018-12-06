import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation} from 'react-navigation'
import WineyardItem from './Item/WineyardItem'
import Breadcump from './Breadcump'
import WineyardHeader from '../components/Item/WineyardHeader'
import Device from 'react-native-device-detection'
import Description from './Description'

class RegionDetail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func,
       navigation: PropTypes.object,
       item: PropTypes.object,
       emitter: PropTypes.object,
       onPressBreadCump: PropTypes.func
    }
    _onPress = ()=>{
       this.props.navigation.navigate('WineDetail')
    }

    _onBack = ()=>{
        const { item , onSelect} = this.props
        onSelect(1, item)
    }

    _onPressBreadCump = index => {
        this.props.onPressBreadCump(index)
    }

    renderItem = ({item, index}) => {
        const { emitter } = this.props
     
        return <WineyardItem emitter={emitter} item={item}  />
    }

    getRoot = ()=>{
        if(Device.isTablet){
            return ScrollView
        }

        return View
    }

    renderHeader = () =>{
       
        const { item } = this.props

        const path = ['World',item.country, item.name]
        const width = Dimensions.get('window').width - 650
        const style = (Device.isTablet) ? {width, marginBottom:100} : {  }

        const Root = this.getRoot()

        return  <Root style={[styles.titleContent, style]}>
                
                <View style={{width: '100%', height:160}}>
                    <Image
                    style={[styles.itemImage,{position:'absolute', width: '100%', height:160}]}
                    source={{uri:item.image.replace('images','')}}
                    />
                    <View style={[styles.itemContent,{width: '100%', height: 160, top:0, left:0}]}>
                    <Text style={[styles.text,styles.textBold]}>{item.name}</Text>
                    <Text style={styles.text}>{`${item.wineryCount} wineries`}</Text>
                    
                </View>
                </View>
                <View>
                    <Breadcump onPress={this._onPressBreadCump} path={path} style={{marginTop:10, marginBottom:10}} />
                    <Description text={item.description} />
                    {!Device.isTablet && <WineyardHeader />}
                </View>
                
       </Root>
    }

    renderHeaderTablet = ()=>{
        const { item } = this.props
     
        return  <View  style={[styles.titleContent,{flex:1}]}>
            <WineyardHeader />
       </View>
    }

    render() {
        const {  item } = this.props

        const flatListProps = (Device.isTablet)?{ListHeaderComponent: this.renderHeaderTablet} : { ListHeaderComponent: this.renderHeader }
        const style = (Device.isTablet) ? {marginBottom: Dimensions.get('window').height - 580} : {marginBottom: 160}
     

        return <View style={[styles.container, style]}>
                {Device.isTablet && this.renderHeader()}
                <FlatList
                   {...flatListProps}
                    data={item.wineries}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    numColumns={(Device.isTablet) ? 2 : 1}
                    />
                </View>
    }
}

export default withNavigation(RegionDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        backgroundColor:'transparent',
        flexDirection:'row'
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
        borderRadius: 6
    },
    itemContent:{
        justifyContent:'center',
        alignItems:'center',
        top:12.5,
        borderRadius: 10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    text:{
        color:'white',
        fontSize:16,
        fontFamily: 'IBMPlexSans'
    },
    textBold:{
        fontSize: 32,
        fontFamily:'IBMPlexSans-SemiBold'
    }
})