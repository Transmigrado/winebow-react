import { createStore } from 'redux'


const ACTION = {
  LOAD : 'store.loaded',
  RESPONSE : 'store.response'
}

const INITIAL_STATE = {
  data:{}
}

reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return INITIAL_STATE
  }
}

export const store = createStore(
                  reducer, 
                  [ ],
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                )

