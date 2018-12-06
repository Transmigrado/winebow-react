import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, SectionList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import WineyardItem from './Item/WineyardItem'
import Device from 'react-native-device-detection'
export default class Detail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func,
       regions: PropTypes.array,
       item:PropTypes.object,
       emitter: PropTypes.object
    }

    static defaultProps = {
        regions: [],
        wineries: []
    }
    
    _onPress = item =>{
        
        this.props.onSelect(2, item, 1)
    }
    
    _onBack = ()=>{
        this.props.onSelect(0,null)
    }

    renderItemRegion = ({ item, index}) => {
        const width = Dimensions.get('window').width
        const wineryCount = item.wineryCount || 0

        return  <TouchableOpacity onPress={()=>{this._onPress(item)}} style={[{width: width, height: 130},styles.item]}>
        <Image
     style={[styles.itemImage,{width: '100%', height: 120, top:5, left:20 }]}
     source={{uri:item.image.replace('images/','')}}
     cache="only-if-cached"
     />
      <View style={[styles.itemContent,{width: '100%', height: 120, top:5, left:0}]}>
         <Text style={[styles.text,styles.textBold]}>{item.name}</Text>
         <Text style={styles.text}>{`${wineryCount} wineries`}</Text>
     </View>
</TouchableOpacity>
    }


    renderItem = ({item, index, section}) => {
        const { emitter } = this.props

       
        if(section.index === 1){
            if(Device.isTablet){
                return <View style={{width:'100%', flexDirection:'row'}}>
                        {item.map(subitem=>{
                             return <WineyardItem emitter={emitter} item={subitem} />
                        })}
                </View>
            }
            return <WineyardItem emitter={emitter} item={item} />
        }

        if(Device.isTablet){
            if(item.length === 1){
                return <View style={{width:'50%', flexDirection:'row'}}>
                {item.map(subitem=>{
                     return this.renderItemRegion({item:subitem,index})
                })}
        </View>
            }

            return <View style={{width:'100%', flexDirection:'row'}}>
            {item.map(subitem=>{
                 return this.renderItemRegion({item:subitem,index})
            })}
    </View>
        }
       
        return this.renderItemRegion({item, item})
    }

    renderHeader = index =>{

        const { item } = this.props

        if(index === 1){
            return  <View style={styles.titleContent}>
                    <Text style={styles.subtitle}>Vineyards and Wineries</Text>
                    <View style={styles.bottomLine}></View>
           </View>
        }
        return  <View style={[styles.titleContent, { flexDirection:'row', justifyContent: 'space-between'}]}>
                <Text style={styles.title}>{item.name}</Text>
             
       </View>
    }

    render() {
        
        const { regions, item } = this.props
        let wineries = []
        let regionsData = []

        if(Device.isTablet){
            let currentItem = []
            item.wineries.forEach(winery => {
                currentItem.push(winery)
                if(currentItem.length ===  Math.min(3, item.wineries.length)){
                    wineries.push(currentItem)
                    currentItem = []
                }
            })

            if(currentItem.length > 0){
                wineries.push(currentItem)
            }

            let currentItemRegions = []
            regions.forEach( region => {
                currentItemRegions.push(region)
                if(currentItemRegions.length === Math.min(2, regions.length)){
                    regionsData.push(currentItemRegions)
                    currentItemRegions = []
                }
            })

            if(currentItemRegions.length > 0){
                regionsData.push(currentItemRegions)
            }

        }else{
            wineries = item.wineries
            regionsData = regions
        }

        const styleMargin = (Device.isTablet) ? {marginBottom: Dimensions.get('window').height - 580} : {marginBottom: 170}
      
        return <View style={styles.container}>
                <SectionList
  renderItem={({item, index, section}) => this.renderItem({item, index, section})}
  renderSectionHeader={({section:{index}}) => this.renderHeader(index)}
  sections={[
    {index:0, data: regionsData},
    {index:1, data: wineries},
  ]}
  keyExtractor={(item, index) => 'item' + index}
  style={styleMargin}
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
        paddingBottom: 12,
        backgroundColor:'white'
    },
    title:{
        fontSize: 30
    },
    subtitle:{
        fontSize: 16
    },
    item:{
        flex:1,
        paddingHorizontal: 20
    },
    itemImage:{
        borderRadius: 6,
        top:12.5,
        position:'absolute'
    },
    itemContent:{
        justifyContent:'flex-end',
        top:12.5,
        borderRadius: 10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)',
    },
    bottomLine:{
        width:'100%',
        marginTop:10,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text:{
        color:'white',
        fontSize:16,
        fontFamily: 'IBMPlexSans'
    },
    textBold:{
        fontFamily:'IBMPlexSans-SemiBold'
    }
})