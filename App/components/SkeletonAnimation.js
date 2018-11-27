import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import PropTypes from 'prop-types'


export default class SkeletonAnimation extends Component {
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        children: PropTypes.any,
        isLoading: PropTypes.bool
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.animation) {
                this.animation.play()
            }
        }, 500 * (Math.random() + 1))
    }

    renderSkeleton = () => {
        const { style } = this.props

        return <View style={[styles.container, style]} >
            <LottieView
                source={require('../assets/animation_skeleton.json')}
                style={styles.animation}
                resizeMode="cover"
                ref={animation => this.animation = animation} />
        </View>
    }

    render() {
        const { children, isLoading } = this.props
        console.log("SKElETON", isLoading)
        return <React.Fragment>
            {isLoading && this.renderSkeleton()}
            {!isLoading && children}
        </React.Fragment>
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#E5E5E5',
    },
    animation: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})
