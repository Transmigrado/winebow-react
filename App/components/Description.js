import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'



export default class Description extends Component {
    
    static propTypes = {
        children: PropTypes.any,
    }
  
 
    render() {
        return <View style={[styles.container, style]}>
              {this.props.children}
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    }
})