import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
let store
let initialState = {
  loader: false
}
const reducer = (state = {}, action) => {
  switch (action.type) {
    case '_POKEMON':
      return action.payload ? action.payload : state
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)
  // --- >The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store
  return _store
}

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
