import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation} from 'react-navigation'
import Card from '../components/Card'
import WineyardItem from './Item/WineyardItem'

class WineYardDetail extends Component {
    

    static propTypes = {
       onSelect: PropTypes.func,
       navigation: PropTypes.object
    }
    _onPress = ()=>{
       this.props.navigation.navigate('WineDetail')
    }


    renderItem = ({item, index}) => {

  
        return <WineyardItem />
    }

    renderHeader = ()=>{
       
        return  <View style={styles.titleContent}>
                  <Image
                style={[styles.itemImage,{width: '100%', height:160}]}
                source={require('./assets/chile.jpg')}
                />
                <Text style={{marginTop:180}}>Colchagua is a large and varied wine region located in the southern portion of Chile's broader Central Valley. It spans almost the entire width of the country, but most of its vineyards are found in warmer pockets nestled against the foothills of the Cordillera and near the interior Tinguiririca River.</Text>
       </View>
    }

    render() {
        
        return <View style={styles.container}>
                <FlatList
                    ListHeaderComponent = {this.renderHeader()}
                    data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
                    renderItem={({item, index}) => this.renderItem({item, index})}
                    numColumns={1}
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
        borderRadius: 6,
        top:12.5,
        position:'absolute'
    }
})