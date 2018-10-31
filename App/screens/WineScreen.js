import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import parser  from 'react-native-html-parser'
import WineyardDetail from '../components/WineyardDetail'

const DomParser = parser.DOMParser

export default class WineScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

  render() {

    const { navigation } = this.props;
    const item = navigation.getParam('item', {});

    return <View style={styles.container}>
            <WineyardDetail item={item} />
    </View>
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
