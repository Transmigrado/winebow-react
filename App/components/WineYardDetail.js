import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { StyleSheet, View, FlatList, Text} from 'react-native'
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
    path: PropTypes.array,
    item: PropTypes.object,
    wines: PropTypes.array,
 }

  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    header: <Header left="back" navigation={navigation} />
})

state = {
  description: ''
}

componentDidMount(){
  const { item } = this.props
  const doc = new DomParser().parseFromString(item.description,'text/html')

  const elements = []
  const current = {content:[], title:''}

  Object.keys(doc.childNodes).forEach( key => {
    const obj = doc.childNodes[key]
  

    if(typeof obj === "object" && obj !== null){
        const { nodeName } = obj
        if(nodeName == "h4"){
          elements.push({...current})
        }
    }else{
      elements.push({...current})
    }
  })


 
}

renderItem = ({item, index}) => {

 return  <WineItem item={item} />
}

renderHeader = ()=>{
  
  const { path, item } = this.props

  const { description } = this.state

 
  return  <View>
       <Pager images={item.images} />
    <Breadcump path={path} style={{margin:10}} />
        <WineyardItem bigTitle={true} item={item} />
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <Text>{description}</Text>
        <Text style={{fontSize: 30,marginTop:10, fontWeight:'bold'}}>Wines</Text>
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
