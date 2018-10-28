import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'



export default class BreadCump extends Component {
    
    static propTypes = {
        path: PropTypes.array
    }
    
    renderPath = item => {

    }
 
    render() {
        const { path } = this.props

        return <View style={styles.container}>
            {path.map(this.renderPath)}
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    }
})