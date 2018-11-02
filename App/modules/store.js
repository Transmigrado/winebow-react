import { createStore } from 'redux'
import loadCountries from '../api/ApiCountry'
import loadRegions from '../api/ApiRegion'
import loadWineries from '../api/ApiWineries'

const ACTION = {
  LOAD : 'store.loaded',
  RESPONSE : 'store.response',
  FETCH: 'store.fetch',
  FETCH_REGION: 'store.fetch.region',
  FETCH_WINERY: 'store.fetch.winery',
  SELECT : 'store.select'
}
export const fetchCountriesThunk = dispatch => {

  function success(response){
    const { data } = response
    dispatch({type:ACTION.FETCH, data})
  }

  function error(error){
    console.log(error)
  }
  loadCountries()
  .then(success)
  .catch(error)
}

export const fetchRegionsThunk = dispatch => {

  function success(response){
    const { data } = response
    dispatch({type:ACTION.FETCH_REGION, data})
  }

  function error(error){
    console.log(error)
  }
  loadRegions()
  .then(success)
  .catch(error)
}

export const fetchWineriesThunk = dispatch => {

  function success(response){
    const { data } = response
    dispatch({type:ACTION.FETCH_WINERY, data})
  }

  function error(error){
    console.log(error)
  }
  loadWineries()
  .then(success)
  .catch(error)
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
  path: ['World'],
  countries:[],
  regions:[],
  wineries: []
}

reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.SELECT:
      const path = state.path
      path.push(action.path)
      return {...state, path}
    case ACTION.FETCH_REGION:
      return {...state, regions:action.data}
    case ACTION.FETCH_WINERY:
      return {...state, wineries:action.data}
    case ACTION.FETCH:
      return {...state, countries:action.data}
    case ACTION.LOAD:
      return {...state, data:action.data}
    default:
      return INITIAL_STATE
  }
}

export const getCountries = state => {
    if(state.countries.length>0){
      return state.countries
    }
   
   return []
}

export const getWineries = state => {
  if(state.wineries.length>0){
    return state.wineries
  }
 
 return []
}

export const getPath = state => state.path

export const getRegions = state => state.regions

export const getRegionsFilter =(state, country) => state.regions.filter(region => {
  return region.country_id === country.id
})
export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)

