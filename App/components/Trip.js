import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Trip extends Component {
    static propTypes = {
        children: PropTypes.any,
        containerStyle: PropTypes.any,
        cardStyle: PropTypes.any,
        isShadowless: PropTypes.bool,
        expanded: PropTypes.bool,
        mode: PropTypes.number,
        onPress: PropTypes.func,
        onExpand: PropTypes.func,
    }

    renderUpArrow = ()=>{
        return <Image style={{width:12,height:8, tintColor:"#1D386D"}} source={require('./assets/up_arrow.png')} />
    }

    renderDownArrow = ()=>{
        return <Image style={{width:12,height:8, tintColor:"#1D386D"}} source={require('./assets/down_arrow.png')} />
    }


    render() {
        const { expanded , mode, onPress, onExpand} = this.props
        const borderStyle =defaultStyles.card
        return <View style={[defaultStyles.container, this.props.containerStyle]}>
                 
            <TouchableOpacity onPress={onExpand} style={[defaultStyles.card, borderStyle, this.props.cardStyle]}>
               
                    <Text style={defaultStyles.title}>Regions</Text>
                    <View style={{width: 20, height: 30, justifyContent:'center'}}>
                        {expanded && this.renderDownArrow()}
                        {!expanded && this.renderUpArrow()}
                    </View>
    
               
            </TouchableOpacity>
            {mode > 0 && <TouchableOpacity onPress={onPress} style={{position:'absolute', width:44, height:44, zIndex:99999, left:20, alignItems:'center', justifyContent:'center' }}>
                    <Image source={require('./assets/back.png')} style={{tintColor:"#1D386D"}} />
                </TouchableOpacity>}
        </View>
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems:'center',
        borderBottomColor:'#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    card: {
        width: 152,
        height: 30,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        fontSize: 16,
        color: '#1D386D',
        marginTop: 5,
        marginLeft:5 ,
        fontFamily: "IBMPlexSans-SemiBold",
    }
})