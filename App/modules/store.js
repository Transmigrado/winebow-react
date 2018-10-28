import { createStore } from 'redux'

const ACTION = {
  LOAD : 'store.loaded',
  RESPONSE : 'store.response'
}


export const fetchDataThunk = dispatch => {
  const data = require('../data.json')
  dispatch({type:ACTION.LOAD, data})
}

const INITIAL_STATE = {

}

reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.LOAD:
      return {...state, ...action.data}
    default:
      return INITIAL_STATE
  }
}

export const getCountries = state => {
   const data = []

   state.forEach( country => {
     data.push(country.name)
   })

   return data
}

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                )

