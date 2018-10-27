import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Card extends Component {
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
                <Text style={{fontSize:20}}>Regiones</Text>
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
        height: 40,
        borderRadius: 6,
        shadowColor: '#010101',
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        backgroundColor: 'white',
        elevation: 5,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginTop:20
    },
    shadowlessCard: {
        shadowRadius: 0,
        shadowOpacity: 0,
        shadowOffset: { },
        elevation: 0,
        borderColor: '#DEDEDE',
        borderWidth: 1
    }
})