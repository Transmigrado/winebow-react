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
  wines:[],
  isLoading:true
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

const getRegionName = (regions, winery)=>{
  let regionName = ""
  regions.forEach(region => {
    if(winery.region_id === region.id){
      regionName = region.name
    }
  })
  return regionName
}

const getCountryName = (countries, regions,  winery) => {
    let countryName = ""

    regions.forEach(region => {
      if(winery.region_id === region.id){
        countries.forEach(country => {
            if(region.country_id === country.id){
              countryName = country.name
            }
        })
      }
    })

    return countryName
}

const isNumber = num => {
  return !isNaN(parseFloat(num)) && isFinite(num);
  }
const getAverage = data => {

  let latitude = 0
  let longitude = 0
  let countData = 0

  let mapData = []

  if(data[0][0].length == 2 && isNumber(data[0][0][0]) && isNumber(data[0][0][1])){
    mapData = mapData.concat(data)
  }else{
    data.forEach( d => {
      mapData = mapData.concat(d)
    })
  
  }

  mapData.forEach(coordinates => {
    countData += coordinates.length
    coordinates.forEach(coordinate => {

      if(Number.isNaN(Number(coordinate[0])) === false){
        latitude += Number(coordinate[0])
        longitude += Number(coordinate[1])
      }else{
        countData--
      }
     
    })
  })

  latitude /= (countData !== 0) ? countData : 1
  longitude /= (countData !== 0) ? countData : 1

  return { latitude, longitude}
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
      const wineries = action.data.map(winery => {
        return {...winery, regionName: getRegionName(state.regions,winery), countryName: getCountryName(state.countries, state.regions,winery)}
      })
      
      regions = state.regions.map(region => {
        const myWineries = getWineriesForRegion(wineries, region)
        return {...region, wineryCount: myWineries.length, wineries:myWineries}
      })

      countries = state.countries.map(country => {
        const myWineries = getWineriesForCountry(regions, country)
        const center = [0,0]
        let count = 0

         regions.forEach(region => {
          if(region.country_id === country.id){
            if(region.geojson !== undefined && region.geojson !== null){
              const average = getAverage(region.geojson.features[0].geometry.coordinates)
              center[0] += average.latitude
              center[1] += average.longitude
              count ++
             
            }
          }
        })

        if(count > 0){
          center[0] /= count
          center[1] /= count
        }
       

        return {...country,center, wineryCount: myWineries.length, wineries:myWineries}
      })
      return {...state, wineries, regions, countries}
    case ACTION.FETCH_WINES:
      return {...state, wines:action.data, isLoading:false}
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

export const getLoading = (state) => state.isLoading

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)

