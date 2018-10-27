import React, { Component } from 'react'
import { View } from 'react-native'
import RootNavigator from './App/core/RootNavigator'
import { Provider } from 'react-redux'
import { store } from './App/modules/store'


export default class App extends Component {

  render() {
    return <View style={{flex : 1}}>
           <Provider store={store}>
            <RootNavigator />
          </Provider>
      </View>
  }

}

