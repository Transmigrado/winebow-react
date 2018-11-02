import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import WineYardDetail from '../components/WineYardDetail'
import Header from '../components/Header'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

class WineScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object
 }



  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

  render() {

    const { navigation } = this.props
    const item = navigation.getParam('item', {})

    return <View style={styles.container}>
          <WineYardDetail item={item} />
    </View>
  }
}

export default withNavigation(WineScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
