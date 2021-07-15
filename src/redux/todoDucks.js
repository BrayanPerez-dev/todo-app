import shortid from 'shortid'
const initialState = [{
    text: 'Redux a',
    completed: false,
    created: Date.now(),
    modified: Date.now(),
    id: shortid.generate(),
},
{
    text: 'Redux a',
    completed: false,
    created: Date.now(2021,6,11),
    modified: Date.now(2021,6,25),
    id: shortid.generate(),
}];

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export default function todoReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TODO:
            return [{
                id: shortid.generate(),
                completed: false,
                created: new Date().getTime(),
                modified: new Date(2021,9,7).getTime(),
                text: action.payload
            }, ...state];
        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.payload
            );
        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.payload.id ?
                    { ...todo, text: action.payload.text, modified: new Date().getTime() } : todo);
        case COMPLETE_TODO:
            return state.map((todo) =>
                todo.id === action.payload ?
                    { ...todo, completed: !todo.completed, modified:new Date().getTime()} : todo);
        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.completed);
            return state.map(todo => {
                return { ...todo, completed: !areAllMarked, modified: new Date().getTime()}
            })
        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false);
        default:
            return state;
    }
}


export const ADDTODO = (text) => (dispatch) => {
    try {
        dispatch({
            type: ADD_TODO,
            payload: text
        })
    } catch (error) {
        console.log(error)
    }
}
export const DELETETODO = (id) => (dispatch) => {
    try {
        dispatch({
            type: DELETE_TODO,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

export const EDITTODO = (data) => (dispatch) => {
 
    try {
        dispatch({
            type: EDIT_TODO,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const COMPLETETODO = (id) => (dispatch) => {

    try {
        dispatch({
            type: COMPLETE_TODO,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

export const COMPLETEALL = () => (dispatch) => {
    try {
        dispatch({
            type: COMPLETE_ALL,
        })
    } catch (error) {
        console.log(error)

    }
}

export const CLEARCOMPLETED = () => (dispatch) => {
    try {
        dispatch({
            type: CLEAR_COMPLETED,
        })
    } catch (error) {
        console.log(error)

    }
}

