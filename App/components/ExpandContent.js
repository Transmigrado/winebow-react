import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'



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
        return <Image style={{width:12,height:8}} source={require('./assets/up_arrow.png')} />
    }

    renderDownArrow = ()=>{
        return <Image style={{width:12,height:8}} source={require('./assets/down_arrow.png')} />
    }

    renderContent = (content, index) => {

        if(index === 0){
            return  <Text style={{ paddingHorizontal: 20 }}>{content.description}</Text>
        }

        const { expand } = this.state

        return <View>
            <TouchableOpacity
            onPress={()=>{
                expand[index - 1] =  !expand[index - 1] 
                this.setState({expand})
            }}
            style={{
        width:'100%',
        borderBottomColor:'#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"space-between",
        justifyContent:"space-between",
        }}>
                <Text style={{ fontSize: 20, marginTop:20, marginBottom: 10, paddingHorizontal: 20, fontWeight:'300'}}>{content.title}</Text>

                <View style={{ width: 20, height: 40, justifyContent:'center'}}>
                    {!expand[index - 1] && this.renderDownArrow()}
                    {expand[index - 1] && this.renderUpArrow()}
                </View>
            </TouchableOpacity>
            {expand[index - 1] && <Text style={{marginTop: 10, marginBottom: 10, paddingHorizontal: 20}}>{content.description}</Text>}
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
        color: '#AB3F66',
        fontSize: 16
    },
    lastText:{
        color:'#737373',
        fontSize: 16
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