import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Card from '../Card'
import { withNavigation } from 'react-navigation'

class WineyardItem extends Component {
    
    static propTypes = {
        navigation: PropTypes.object,
        item: PropTypes.object,
        bigTitle: PropTypes.bool,
        emitter: PropTypes.object
     }


    static defaultProps = {
        bigTitle: false
    }
    _onPress = ()=>{
     
        const { item, emitter } = this.props
        emitter.emit('SelectItem', item)
    }

    getRoot = ()=>{
        const {  bigTitle } = this.props

        if(bigTitle) {
            return View
        }

        return TouchableOpacity
    }

    render() {
        const { item, bigTitle, emitter} = this.props
        const titleStyle = (bigTitle) ? { fontSize: 24, fontWeight: 'bold'} : {}
        const Root = this.getRoot()
        const style = (bigTitle) ? {} : { maxWidth : 300}

        return <Root onPress={this._onPress} style={[styles.container,style]}>
            <View style={styles.content}>
                    <Card style={{width:140,height:120, marginLeft:-20}}>
                <Image
                        resizeMode="contain"
                        style={{width: 100, height: 100, borderRadius: 6, }}
                        source={{uri:item.image}}
                        />
            </Card>
            <View style={{marginTop: 10, marginRight: 100}}>
                <Text style={titleStyle}>{item.name}</Text>
                <Text>{`Country: ${item.countryName}`}</Text>
                <Text>{`Region: ${item.regionName}`}</Text>
            </View>
        </View>
         <View style={styles.bottomLine}></View>
        </Root>
    }
}

export default withNavigation(WineyardItem)

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