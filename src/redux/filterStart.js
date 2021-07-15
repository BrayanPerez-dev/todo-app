const initialState = {
    created:  new Date(2021,9,7).getTime()
};


export const FILTER_START = 'FILTER_START';


export default function filterStart(state = initialState, action) {

    switch (action.type) {
        case FILTER_START:
        return  {...state, created : action.payload}
    
        default:
            return state;
    }
}


export const FILTERSTART = (start) => (dispatch)=>{
    try {
        dispatch({
            type: FILTER_START,
            payload: start
        })
    } catch (error) {
        console.log(error)
    }
}