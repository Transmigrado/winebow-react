import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native'
import WineYardDetailContainer from '../containers/WineYardDetailContainer'
import Header from '../components/Header'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

class WineScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    item: PropTypes.object,
    onBack: PropTypes.object,
 }



  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

  render() {

    const { navigation, item,onBack } = this.props   
    const currentItem = item || navigation.getParam('item', {})

    return <View style={styles.container}>
          <WineYardDetailContainer onBack={onBack} item={currentItem} />
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
