import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import reducers from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from 'electron-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// For debug
;(window as any).electron = require('electron')

const initialState = getInitialStateRenderer()
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(forwardToMain, thunk))
)
replayActionRenderer(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
