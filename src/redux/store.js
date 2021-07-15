import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import todoReducer from './todoDucks'
import filterEnd from './filterEnd'
import filterStart from './filterStart'

const rootReducer = combineReducers({
    todos: todoReducer,
    end:filterEnd,
    start:filterStart
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = localStorage.getItem('state') 
                       ? JSON.parse(localStorage.getItem('state'))
                       : {}

export default function generateStore() {
    const store = createStore( rootReducer,persistedState, composeEnhancers( applyMiddleware(thunk) ) )
    store.subscribe(()=>{
        localStorage.setItem('state', JSON.stringify(store.getState()))
      })
    return store
}