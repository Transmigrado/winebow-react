import React, { Component } from 'react'
import { StyleSheet, View, Animated  } from 'react-native'
import { PropTypes } from 'prop-types'

export default class Sidebar extends Component {
    static propTypes = {
        children: PropTypes.any,
       style:  PropTypes.object,
       onPress: PropTypes.func
    }

    state = {
        right: new Animated.Value(-380)
    }

    componentDidMount(){
        Animated.timing(this.state.right,{
            toValue: 0,
            duration:500
        }).start()
    }

    close = ()=>{
        Animated.timing(this.state.right,{
            toValue: -380,
            duration: 500
        }).start()
    }

    render() {
       const { style, children } = this.props
       const { right } = this.state

        return <Animated.View style={[styles.container, style,{right}]}>
             {children}
        </Animated.View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        width: 380,
        height:'100%',
        position:'absolute',
        top:0,
        shadowColor: '#CCC',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        shadowOffset: { width: 4, height: 0 },
        elevation: 5
    },
})