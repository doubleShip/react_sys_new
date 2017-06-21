import { handleActions, createAction } from 'redux-actions'

export const TYPES = {
    ADD_TODO: 'TODO/ADD_TODO',
    SET_VISIBILITY: 'TODO/SET_VISIBILITY',
    TOGGLE_TODO: 'TODO/TOGGLE_TODO',
    DEL_TODO: 'TODO/DEL_TODO'
}

export const actions = {
    addTodo: createAction(TYPES.ADD_TODO),
    setVisibility: createAction(TYPES.SET_VISIBILITY),
    toggleTodo: createAction(TYPES.TOGGLE_TODO),
    delTodo: createAction(TYPES.DEL_TODO)
}


const initialState = {
    todo : [
        {
            id: -3,
            text: 'coding',
            completed: false,
        },
        {
            id: -2,
            text: '打篮球',
            completed: false,
        },
        {
            id: -1,
            text: 'reading',
            completed: true,
        }
    ],
    filter: 'SHOW_ALL'
}

export const reducer = handleActions({
    [TYPES.ADD_TODO] : (state, action) => {
        return Object.assign({}, state, {
            todo : [
                ...state.todo,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                }
            ]
        });
    },
    [TYPES.TOGGLE_TODO] : (state, action) => {
        const datas = [];
        state.todo.map(t => {
            if (t.id == action.payload.id) {
                t.completed = !t.completed;
            }
            datas.push(t);
        })
        return Object.assign({}, state, {
            todo : datas
        });
    },
    [TYPES.DEL_TODO] : (state, action) => {
        return Object.assign({}, state, {
            todo : state.todo.filter(t => t.id !== action.payload.id)
        });
    },
    [TYPES.SET_VISIBILITY] : (state, action) => {
        return Object.assign({}, state, {
            filter : action.payload
        });
    }
}, initialState)
