import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'


export default class List extends Component {
    
    renderItem = item => {
       return  <View style={styles.item}>
                    <Image
                style={{width: 170, height: 170}}
                source={require('./assets/chile.jpg')}
                />
           </View>
    }

    render() {
        
        return <View style={styles.container}>

                <View style={styles.titleContent}>
                 <Text style={styles.title}>Countries</Text>
                </View>
                
                <FlatList
                    data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={2}
                    />
                </View>
    }
}

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
        paddingVertical: 23
    },
    title:{
        fontSize: 30
    },
    item:{
        flex:1
    }
})