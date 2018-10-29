import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, SectionList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import WineyardItem from './Item/WineyardItem'

export default class Detail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func,
       path: PropTypes.array
    }
    _onPress = ()=>{
        this.props.onSelect(2)
    }


    renderItem = ({item, index, section}) => {

        const width = Dimensions.get('window').width
        
        if(section.index === 1){
            return <WineyardItem />
        }
       
       return  <TouchableOpacity onPress={this._onPress} style={[{width: width, height: 130},styles.item]}>
                   <Image
                style={[styles.itemImage,{width: '100%', height: 120, top:5, left:20 }]}
                source={require('./assets/chile.jpg')}
                />
                 <View style={[styles.itemContent,{width: '100%', height: 120, top:5, left:0}]}>
                    <Text style={[styles.text,styles.textBold]}>Casablanca Valley</Text>
                    <Text style={styles.text}>4 wineries</Text>
                </View>
           </TouchableOpacity>
    }

    renderHeader = index =>{

        const { path } = this.props

        if(index === 1){
            return  <View style={styles.titleContent}>
                    <Text style={styles.subtitle}>Wineyards and Wineries</Text>
                    <View style={styles.bottomLine}></View>
           </View>
        }
        return  <View style={styles.titleContent}>
        <Text style={styles.title}>{path}</Text>
       </View>
    }

    render() {
        

        return <View style={styles.container}>
                <SectionList
  renderItem={({item, index, section}) => this.renderItem({item, index, section})}
  renderSectionHeader={({section:{index}}) => this.renderHeader(index)}
  sections={[
    {title: 'Title1',index:0, data: ['item1', 'item2']},
    {title: 'Title2',index:1, data: ['item3', 'item4']},
  ]}
  keyExtractor={(item, index) => item + index}
  style={{marginBottom: 170}}
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
        fontSize:16
    },
    textBold:{
        fontWeight: 'bold'
    }
})