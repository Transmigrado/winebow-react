import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import WineYardDetailContainer from '../containers/WineYardDetailContainer'
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
          <WineYardDetailContainer item={item} />
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
