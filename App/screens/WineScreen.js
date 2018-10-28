import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import Header from '../components/Header'
import Pager from '../components/Pager'

export default class WineScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header navigation={navigation} />
})


  render() {
    return <View style={styles.container}>
        <Pager />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
