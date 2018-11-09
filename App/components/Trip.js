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
        onPress: PropTypes.func
    }

    renderUpArrow = ()=>{
        return <Image style={{width:12,height:8}} source={require('./assets/up_arrow.png')} />
    }

    renderDownArrow = ()=>{
        return <Image style={{width:12,height:8}} source={require('./assets/down_arrow.png')} />
    }


    render() {
        const { expanded , mode, onPress} = this.props
        const borderStyle =defaultStyles.card
        return <View style={[defaultStyles.container, this.props.containerStyle]}>
                 
            <View style={[defaultStyles.card, borderStyle, this.props.cardStyle]}>
                <Text style={defaultStyles.title}>Regions</Text>
                <View style={{width: 20, height: 30, justifyContent:'center'}}>
                    {expanded && this.renderDownArrow()}
                    {!expanded && this.renderUpArrow()}
                </View>
            </View>
            {mode > 0 && <TouchableOpacity onPress={onPress} style={{position:'absolute', zIndex:99999, left:20, top: 15 }}>
                    <Image source={require('./assets/back.png')} style={{tintColor:"#9C093D"}} />
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
        color: '#AB3F66',
        marginTop: 5,
        marginLeft:5 ,
        fontFamily: "IBMPlexSans-SemiBold",
    }
})