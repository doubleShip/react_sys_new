import { combineReducers } from 'redux'
import { reducer as appState }  from './app'
import { reducer as fetchState }  from './fetch'
import { reducer as todoState }  from './todoList'
import { reducer as tableState }  from './table'

const rootReducer = combineReducers({
    appState,
    fetchState,
    todoState,
    tableState
})

export default rootReducer