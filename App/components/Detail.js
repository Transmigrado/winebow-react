import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, SectionList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'


export default class Detail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func
    }
    _onPress = ()=>{
        this.props.onSelect(2)
    }
    renderItem = ({item, index}) => {

        const width = Dimensions.get('window').width
      
       
       return  <TouchableOpacity onPress={this._onPress} style={[{width: width, height: 130},styles.item]}>
                   <Image
                style={[styles.itemImage,{width: '100%', height: 120, left:20 }]}
                source={require('./assets/chile.jpg')}
                />
           </TouchableOpacity>
    }

    renderHeader = ()=>{
        return  <View style={styles.titleContent}>
        <Text style={styles.title}>Countries</Text>
       </View>
    }

    render() {
        
        return <View style={styles.container}>
                <SectionList
  renderItem={({item, index, section}) => this.renderItem({item, index, section})}
  renderSectionHeader={({section:{index}}) => {
    if(index == 0){
        return this.renderHeader()
    }
    return <Text style={{fontWeight: 'bold'}}>HOLA</Text>
  }}
  sections={[
    {title: 'Title1',index:0, data: ['item1', 'item2']},
    {title: 'Title2',index:1, data: ['item3', 'item4']},
  ]}
  keyExtractor={(item, index) => item + index}
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
        paddingHorizontal: 20
    },
    itemImage:{
        borderRadius: 6,
        top:12.5,
        position:'absolute'
    }
})