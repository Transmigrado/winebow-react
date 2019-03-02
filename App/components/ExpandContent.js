import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import Description from '../components/Description'

export default class ExpandContent extends Component {
    
    static propTypes = {
        content: PropTypes.array
    }

    static defaultProps = {
        content:[]
    }

    state = {
        expand: [false, false]
    }

    renderUpArrow = ()=>{
        return <Image  source={require('./assets/up_arrow.png')} style={{width:12,height:8, tintColor:"#1D386D"}} />
    }

    renderDownArrow = ()=>{
        return <Image  source={require('./assets/down_arrow.png')} style={{width:12,height:8,  tintColor:"#1D386D"}} />
    }

    renderContent = (content, index) => {

        if(index === 0){
            return <Description style={{padding:20}} text={content.description}></Description>
        }

        const { expand } = this.state
        const style= {
            width:'100%',
            borderBottomColor:'#CCC',
            borderBottomWidth: StyleSheet.hairlineWidth,
           
            flexDirection:"row",
            alignItems:"space-between",
            justifyContent:"space-between",
            }

        

        if(index === 1 || expand[index - 2]){
            style.borderTopColor = '#CCC'
            style.borderTopWidth = StyleSheet.hairlineWidth
        }

        return <View>
            <TouchableOpacity
            onPress={()=>{
                expand[index - 1] =  !expand[index - 1] 
                this.setState({expand})
            }}
            style={style}>
                <Text style={{ fontSize: 20, marginTop:10, marginBottom: 10, paddingHorizontal: 20, fontWeight:'300', fontFamily:'IBMPlexSans'}}>{content.title}</Text>

                <View style={{ width: 20, height: 40, justifyContent:'center'}}>
                    {!expand[index - 1] && this.renderDownArrow()}
                    {expand[index - 1] && this.renderUpArrow()}
                </View>
            </TouchableOpacity>
            {expand[index - 1] && <Description style={{padding:20}} text={content.description}></Description>}
        </View>
    }
    
    renderPath = (text, index) => {
        const isLast = index >= this.props.path.length - 1
        const style = (isLast) ? styles.lastText :  styles.text
        return <View key={index} style={styles.path} key={text}>
             <Text style={style} >{text}</Text>
             {!isLast &&<Text style={styles.arrow}>></Text>}
        </View>
    }
    
    render() {
        const { content } = this.props

        return <View style={styles.container}>
                {content.map(this.renderContent)}
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'column'
    },
    text:{
        color: '#1D386D',
        fontSize: 16,
        fontFamily: 'IBMPlexSans'
    },
    lastText:{
        color:'#737373',
        fontSize: 16,
        fontFamily: 'IBMPlexSans'
    },
    path:{
        flexDirection: 'row'
    },
    arrow:{
        color:'#737373',
        marginLeft: 8,
        marginRight : 8
    }
})