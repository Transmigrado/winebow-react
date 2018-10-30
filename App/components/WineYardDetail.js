import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation} from 'react-navigation'
import WineyardItem from './Item/WineyardItem'
import Breadcump from './Breadcump'
import WineyardHeader from '../components/Item/WineyardHeader'
import BackButton from '../components/BackButton'

class WineYardDetail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func,
       navigation: PropTypes.object,
       path: PropTypes.array,
       item: PropTypes.object
    }
    _onPress = ()=>{
       this.props.navigation.navigate('WineDetail')
    }

    _onBack = ()=>{
        this.props.onSelect(1, null, this.props.item)
    }

    renderItem = ({item, index}) => {
        return <WineyardItem item={item}  />
    }

    renderHeader = ()=>{
        
        const { path, item } = this.props
        return  <View style={styles.titleContent}>
                <View style={{flexDirection:'row', paddingBottom: 10, justifyContent:'flex-end'}}>
                <BackButton onPress={this._onBack} style={{marginTop: 10}} />

                </View>
               
                <View style={{width: '100%', height:160}}>
                    <Image
                    style={[styles.itemImage,{position:'absolute', width: '100%', height:160}]}
                    source={require('./assets/chile.jpg')}
                    />
                    <View style={[styles.itemContent,{width: '100%', height: 160, top:0, left:0}]}>
                    <Text style={[styles.text,styles.textBold]}>{item.name}</Text>
                    <Text style={styles.text}>{`${item.Wineries.length} wineries`}</Text>
                    
                </View>
                </View>
                <View>
                    <Breadcump path={path} style={{marginTop:10, marginBottom:10}} />
                    <Text>{item.description.replace('<p>','').replace('</p>','').replace('&nbsp;','')}</Text>
                    <WineyardHeader />
                </View>
                
       </View>
    }

    render() {
        const {  item } = this.props
     

        return <View style={styles.container}>
                <FlatList
                    ListHeaderComponent = {this.renderHeader()}
                    data={item.Wineries}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    numColumns={1}
                    style={{marginBottom:160}}
                    />
                </View>
    }
}

export default withNavigation(WineYardDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'transparent'
    },
    content: {
        flex:1,
        width:'100%',
        backgroundColor:'white',
        marginTop: 40
    },
    titleContent:{
        paddingHorizontal: 20,
        paddingTop: 23,
        paddingBottom: 12
    },
    title:{
        fontSize: 30
    },
    item:{
        flex:1,
    },
    itemImage:{
        borderRadius: 6
    },
    itemContent:{
        justifyContent:'center',
        alignItems:'center',
        top:12.5,
        borderRadius: 10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    text:{
        color:'white',
        fontSize:16
    },
    textBold:{
        fontWeight: 'bold',
        fontSize: 32
    }
})