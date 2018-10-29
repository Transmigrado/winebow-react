import React, {Component} from 'react'
import { StyleSheet, View, FlatList, Platform, Dimensions, TouchableOpacity, Image, Text} from 'react-native'
import Header from '../components/Header'
import Pager from '../components/Pager'
import Breadcump from '../components/Breadcump'
import WineyardItem from '../components/Item/WineyardItem'
import PropTypes from 'prop-types'
import WineItem from '../components/Item/WineItem'

export default class WineScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object
 }

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})
renderItem = ({item, index}) => {

 return  <WineItem item={item} />
}

renderHeader = ()=>{
  
  const { navigation } = this.props;
  const item = navigation.getParam('item', {});

  return  <View>
       <Pager />
    <Breadcump path={["World","Chile", "Colchagua Valley"]} style={{margin:10}} />
        <WineyardItem bigTitle={true} item={item} />
 </View>
}

  render() {

    const { navigation } = this.props;
    const item = navigation.getParam('item', {});
    

    return <View style={styles.container}>
     
        <FlatList
            ListHeaderComponent = {this.renderHeader()}
            data={item.Wines}
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
