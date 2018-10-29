import { createStore } from 'redux'

const ACTION = {
  LOAD : 'store.loaded',
  RESPONSE : 'store.response',
  SELECT : 'store.select'
}

export const fetchDataThunk = dispatch => {
  const data = require('../data.json')
  dispatch({type:ACTION.LOAD, data})
}

export const addPath = (dispatch, path) => {
  dispatch({type:ACTION.SELECT, path})
}

const INITIAL_STATE = {
  data : [],
  path: ['World']
}

reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.SELECT:
      const path = state.path
      path.push(action.path)
      return {...state, path}
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

    if( state.data !== undefined){
      return state.data.map( country => {
        const { name, slug} = country
        return {name, slug, count: getWineriesCount(country)}
      })
    }

   return []
}

export const getPath = state => state.path

export const getRegions = (state, name) => {

  if( state.data !== undefined){
    const data = {}
    let regions = []
    let wineries = []
   
    state.data.forEach(country => {
        if(country.name === name){
          regions = country.Regions
        }
    })

    data.regions = regions
    
    regions.forEach(region => {
      wineries = wineries.concat(region.Wineries)
    })
    data.wineries = wineries

    return data
  }

  return {}

}

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)

