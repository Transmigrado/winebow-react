import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'

import { View, Text, TouchableOpacity, Image, ViewPropTypes, Keyboard } from 'react-native'


const ITEM_WIDTH = 30
const ITEM_MARGIN = 10

const BUTTON_SIZE = 44

class Header extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        title: PropTypes.string,
        left: PropTypes.oneOf(['close', 'back']),
        right: PropTypes.string,
        onPressRight: PropTypes.func,
        onPressLeft: PropTypes.func,
        style: ViewPropTypes.style,
        isBorderless: PropTypes.bool,
        backgroundColor: PropTypes.string,
        backgroundImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        tintColor: PropTypes.string,
    }
    static defaultProps = {
        title: '',
        left: undefined,
        navigation: {},
        onPressRight: () => { },
        onPressLeft: undefined,
        isBorderless: false,
        backgroundColor: '#88002E',
        tintColor: '#000000',
        backgroundImage: undefined
    }

    goBack = () => {
        Keyboard.dismiss()
        this.props.navigation.goBack(null)
    }

    renderLeftIcon = (icon, callback) => {
        const handler = callback || this.goBack
        return <TouchableOpacity id="left" onPress={handler} style={styles.touchableArea} testID="closeModal">
                <Image source={require('./assets/back.png')} />
        </TouchableOpacity>
    }

    renderRight = callback => {
        return <TouchableOpacity id="right" onPress={callback}>
            <Image source={require('../assets/pdf.png')} />
        </TouchableOpacity>
    }

    renderBackground = () => {
        return <Image style={styles.backgroundImage} source={this.props.backgroundImage} />
    }

    render() {
        const borderStyle = this.props.isBorderless ? {} : styles.border
        return <View style={[styles.container, this.props.style, borderStyle, { backgroundColor: this.props.backgroundColor }]}>
            {this.props.backgroundImage && this.renderBackground()}
            <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }}>
                <View style={styles.content}>
                    <View style={styles.left}>
                        {this.props.left && this.renderLeftIcon(this.props.left, this.props.onPressLeft)}
                    </View>
                    <View style={styles.center}>
                        <Image source={require('./assets/logo.png')} />
                    </View>
                    <View style={styles.right}>
                        { this.renderRight(this.props.onPressRight)}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    }
}

export default Header

const styles = {
    container: {
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#DFDFDF',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48
    },
    left: {
        marginLeft: ITEM_MARGIN,
        width: ITEM_WIDTH,
    },
    right: {
        width: ITEM_WIDTH,
        marginRight: ITEM_MARGIN,
        justifyContent: 'center'
    },
    rightFont: {
        color: '#030303',
        fontSize: 17,
        textAlign: 'right',
    },
    title: {
        color: '#030303',
        fontSize: 17
    },
    center: {
        justifyContent: 'center',
    },
    touchableArea: {
        justifyContent: 'center',
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
    }
}
