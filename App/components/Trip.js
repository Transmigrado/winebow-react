import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Trip extends Component {
    static propTypes = {
        children: PropTypes.any,
        containerStyle: PropTypes.any,
        cardStyle: PropTypes.any,
        isShadowless: PropTypes.bool
    }

    render() {
        const { isShadowless } = this.props
        const borderStyle = isShadowless ? defaultStyles.shadowlessCard : defaultStyles.card
        return <View style={[defaultStyles.container, this.props.containerStyle]}>
            <View style={[defaultStyles.card, borderStyle, this.props.cardStyle]}>
                <Text style={defaultStyles.title}>Regiones</Text>
            </View>
        </View>
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        alignItems:'center'
    },
    card: {
        width: 152,
        height: 30,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6 ,
        shadowColor: '#010101',
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        elevation: 5,
        backgroundColor: 'white',
        marginTop:-40
    },
    shadowlessCard: {
        shadowRadius: 0,
        shadowOpacity: 0,
        shadowOffset: { },
        elevation: 0,
        borderColor: '#DEDEDE',
        borderWidth: 1
    },
    title:{
        fontSize: 16,
        color: '#AB3F66',
        marginTop: 5,
        marginLeft:5 
    }
})