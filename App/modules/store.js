import { createStore } from 'redux'
import loadCountries from '../api/ApiCountry'
import loadRegions from '../api/ApiRegion'
import loadWineries from '../api/ApiWineries'
import loadWines from '../api/ApiWines'

const ACTION = {
  LOAD : 'store.loaded',
  RESPONSE : 'store.response',
  FETCH: 'store.fetch',
  FETCH_REGION: 'store.fetch.region',
  FETCH_WINERY: 'store.fetch.winery',
  FETCH_WINES: 'store.fetch.wines',
}

export const fetchWinesThunk = dispatch => {
  function success(response){
    const { data } = response
    dispatch({type:ACTION.FETCH_WINES, data})
  }

  function error(error){
    console.log(error)
  }
  loadWines()
  .then(success)
  .catch(error)
}

export const fetchCountriesThunk = dispatch => {

  function success(response){
    const { data } = response
    dispatch({type:ACTION.FETCH, data})
    fetchRegionsThunk(dispatch)
    
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
    fetchWineriesThunk(dispatch)

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
    fetchWinesThunk(dispatch)
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

const INITIAL_STATE = {
  data : [],
  countries:[],
  regions:[],
  wineries: [],
  wines:[]
}

const getCountry = (state, region) =>{
  let countryName = ""
  state.countries.forEach(country => {
    if(country.id === region.country_id){
      countryName = country.name
    }
  })

  return countryName
}

const getWineriesForRegion = (wineries, region) => {

  const myWineries = []
  wineries.forEach( winery => {
    if(winery.region_id === region.id){
      myWineries.push(winery)
    }
  })
  return myWineries
}

const getWineriesForCountry = (regions, country) => {
  let wineries = []
  regions.forEach( region => {
    if(region.country_id === country.id){
      wineries = wineries.concat(region.wineries)
    }
  })
  return wineries
}

reducer = (state = INITIAL_STATE, action) => {
  
  let regions = null

  switch (action.type) {
    case ACTION.FETCH_REGION:
     
      regions = action.data.map(region => {
        return {...region, country: getCountry(state, region)}
      })

      return {...state, regions}
    case ACTION.FETCH_WINERY:
      const wineries = action.data
      
      regions = state.regions.map(region => {
        const myWineries = getWineriesForRegion(wineries, region)
        return {...region, wineryCount: myWineries.length, wineries:myWineries}
      })

      countries = state.countries.map(country => {
        const myWineries = getWineriesForCountry(regions, country)
        return {...country, wineryCount: myWineries.length, wineries:myWineries}
      })

      console.log(countries)

      return {...state, wineries, regions, countries}
    case ACTION.FETCH_WINES:
      return {...state, wines:action.data}
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


export const getRegions = state => state.regions


export const getRegionsFilter =(state, country) => state.regions.filter(region => {
  return region.country_id === country.id
})

export const getWines = (state, item) => state.wines.filter(wine => {
  return wine.winery_id === item.id
})

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)

