import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { StyleSheet, View, FlatList, Platform, Dimensions, TouchableOpacity, Image, Text} from 'react-native'
import * as store from '../modules/store'
import Header from '../components/Header'
import Pager from '../components/Pager'
import Breadcump from '../components/Breadcump'
import WineyardItem from '../components/Item/WineyardItem'
import PropTypes from 'prop-types'
import WineItem from '../components/Item/WineItem'
import parser  from 'react-native-html-parser'

const DomParser = parser.DOMParser

class WineyardDetail extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    path: PropTypes.array
 }

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

state = {
  description: ''
}

componentDidMount(){
  const { navigation } = this.props
  const item = navigation.getParam('item', {})
  const doc = new DomParser().parseFromString(item.description,'text/html')

  const elements = []
  const current = {content:[], title:''}

  Object.keys(doc.childNodes).forEach( key => {
    const obj = doc.childNodes[key]
    
    console.log(obj)

    if(typeof obj === "object" && obj !== null){
        const { nodeName } = obj
        if(nodeName == "h4"){
          elements.push({...current})
        }
    }else{
      elements.push({...current})
    }
  })

  console.log(elements)
 
}

renderItem = ({item, index}) => {

 return  <WineItem item={item} />
}

renderHeader = ()=>{
  
  const { navigation, path } = this.props
  const item = navigation.getParam('item', {})
  const { description } = this.state

 
  return  <View>
       <Pager />
    <Breadcump path={path} style={{margin:10}} />
        <WineyardItem bigTitle={true} item={item} />
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <Text>{description}</Text>
        <Text style={{fontSize: 30,marginTop:10, fontWeight:'bold'}}>Wines</Text>
        </View>
        
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




const mapStateToProps = (state, ownProps) => ({
    path: store.getPath(state)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        
    },
    addPath: path => {
       
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
});
