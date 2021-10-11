const initialState = {
    modified:  new Date(2022,1,20).getTime()
};


export const FILTER_END = 'FILTER_END';



export default function filterEnd(state = initialState, action) {

    switch (action.type) {
        case FILTER_END:
            return  {...state, modified : action.payload}
        default:
            return state;
    }
}

export const FILTEREND = (end) => (dispatch)=>{
    
    try {
        dispatch({
            type: FILTER_END,
            payload: end
        })
    } catch (error) {
        console.log(error)
    }
}