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
  data : [],
  path: []
}

reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.LOAD:
      return {...state, data:action.data}
    default:
      return INITIAL_STATE
  }
}

const getWineriesCount = country => {
  let count = 0

  country.Regions.forEach( region => {
      count += region.Wineries.length
  })

  return count
}

export const getCountries = state => {
   const data = []

    if( state.data !== undefined){
      state.data.forEach( country => {
        data.push({name : country.name, count: getWineriesCount(country)})
      })
    }

   return data
}

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)

