import React, {Component} from 'react'
import { StyleSheet, View, FlatList, Platform, Dimensions, TouchableOpacity, Image, Text} from 'react-native'
import Header from '../components/Header'
import Pager from '../components/Pager'
import Breadcump from '../components/Breadcump'
import WineyardItem from '../components/Item/WineyardItem'

export default class WineScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} />
})
renderItem = ({item, index}) => {

  const width =  Math.floor((Dimensions.get('window').width / 2))
  const itemStyle = (index % 2 == 0)? {left:20} : {left:5}
 
 return  <TouchableOpacity onPress={this._onPress} style={[{width: width, height: width},styles.item, itemStyle]}>
             <Image
          style={[styles.itemImage,{width: width - 25, height: width - 25}]}
          source={require('../components/assets/chile.jpg')}
          />
          <View style={[styles.itemContent,{width: width - 25, height: width - 25}]}>
              <Text style={[styles.text,styles.textBold]}>Chile</Text>
              <Text style={styles.text}>4 wineries</Text>
          </View>
     </TouchableOpacity>
}

renderHeader = ()=>{
  
  return  <View>
       <Pager />
    <Breadcump path={["World","Chile", "Colchagua Valley"]} style={{margin:10}} />
        <WineyardItem />
 </View>
}

  render() {
    return <View style={styles.container}>
     
        <FlatList
            ListHeaderComponent = {this.renderHeader()}
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item, index}) => this.renderItem({item, index})}
            numColumns={2}
            />
      
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
