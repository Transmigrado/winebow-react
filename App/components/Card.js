import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Card extends Component {
    static propTypes = {
        children: PropTypes.any,
        containerStyle: PropTypes.any,
        cardStyle: PropTypes.any,
        isShadowless: PropTypes.bool,
        style: PropTypes.object
    }

    render() {
        const { isShadowless, style } = this.props
        const borderStyle = isShadowless ? defaultStyles.shadowlessCard : defaultStyles.card
        return <View style={[style, defaultStyles.container, this.props.containerStyle]}>
            <View style={[defaultStyles.card, borderStyle, this.props.cardStyle]}>
                {this.props.children}
            </View>
        </View>
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15
    },
    card: {
        width: '100%',
        borderRadius: 6,
        shadowColor: '#010101',
        shadowRadius: 6,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        backgroundColor: 'white',
        elevation: 5
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
