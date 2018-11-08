import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image} from 'react-native'
import Header from '../components/Header'
import Pager from '../components/Pager'
import Breadcump from '../components/Breadcump'
import WineyardItem from '../components/Item/WineyardItem'
import PropTypes from 'prop-types'
import WineItem from '../components/Item/WineItem'
import parser  from 'react-native-html-parser'
import ExpandContent from '../components/ExpandContent'
import Device from 'react-native-device-detection'



class WineyardDetail extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    path: PropTypes.array,
    item: PropTypes.object,
    wines: PropTypes.array,
    onBack: PropTypes.func
 }

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

state = {
  description: ''
}

renderItem = ({item, index}) => {

 return  <WineItem item={item} />
}

renderHeader = ()=>{
  
  const { path, item } = this.props
  const content = [
        {description:item.description},
        {description:item.philosophy, title:'Philosophy'},
        {description:item.wineyard_location, title:'Wineyard Location'}
      ]
 
  return  <View>
        <View>
        <Pager images={item.images} />
          {Device.isTablet && <TouchableOpacity onPress={this.props.onBack} style={styles.backButton}>
            <Image source={require('../components/assets/back.png')} />
          </TouchableOpacity>}
        </View>
      
      <Breadcump path={path} style={{margin:10}} />
        <WineyardItem bigTitle={true} item={item} />
        <View>
          <ExpandContent content={content} />
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 30,marginTop:10, fontWeight:'bold'}}>Wines</Text>
          </View>
        </View>
        
 </View>
}

  render() {

    const { wines } = this.props

    return <View style={styles.container}>
     
        <FlatList
            ListHeaderComponent = {this.renderHeader()}
            data={wines}
            renderItem={({item, index}) => this.renderItem({item, index})}
            numColumns={2}
            />
      
    </View>
  }
}




const mapStateToProps = (state, ownProps) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(WineyardDetail)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  backButton:{
    position:'absolute', 
    left:10, 
    top:10, 
    backgroundColor:'rgba(0,0,0,0.3)', 
    width:30, 
    height:30,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  }

})
