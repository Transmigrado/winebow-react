import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'



export default class Description extends Component {
    
    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.any
    }
  
    state ={
        expanded : false
    }

    onPress = ()=>{
        this.setState({expanded:!this.state.expanded})
    }
 
    render() {
        const { text,style } = this.props
        const { expanded } = this.state

        const contentText = (expanded) ? text : ((text === undefined || text=== null) ? 'No description':text.split(' ').slice(0, 45).join(' ') + "...")
        const callToAction = (expanded) ? "SEE LESS" : "READ ALL"

        return <View style={[styles.container, style]}>
              <Text style={styles.text}>{contentText}</Text>
              <View style={{padding:10, marginBottom: 20, alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={this.onPress}>
                      <Text style={styles.textButton}>{callToAction}</Text>
                  </TouchableOpacity>
              </View>
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontFamily: 'IBMPlexSans'
    },
    textButton:{
        fontFamily: 'IBMPlexSans',
        color: '#AB3F66',
    }
})