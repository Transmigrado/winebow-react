import React, { Component } from 'react'
import { StyleSheet, View, Text,Image } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Trip extends Component {
    static propTypes = {
        children: PropTypes.any,
        containerStyle: PropTypes.any,
        cardStyle: PropTypes.any,
        isShadowless: PropTypes.bool,
        expanded: PropTypes.bool,
    }

    renderUpArrow = ()=>{
        return <Image style={{width:12,height:8}} source={require('./assets/up_arrow.png')} />
    }

    renderDownArrow = ()=>{
        return <Image style={{width:12,height:8}} source={require('./assets/down_arrow.png')} />
    }


    render() {
        const { expanded } = this.props
        const borderStyle =defaultStyles.card
        return <View style={[defaultStyles.container, this.props.containerStyle]}>
            <View style={[defaultStyles.card, borderStyle, this.props.cardStyle]}>
                <Text style={defaultStyles.title}>Regions</Text>
                <View style={{width: 20, height: 30, justifyContent:'center'}}>
                    {expanded && this.renderDownArrow()}
                    {!expanded && this.renderUpArrow()}
                </View>
            </View>
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
        marginLeft:5 
    }
})