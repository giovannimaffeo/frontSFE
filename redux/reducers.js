
const INITIAL_STATE = {
    data: '',
};

export default function colors(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'ADD_COLORS':
            console.log(action.colors);
            return { data: action.colors };
        default:
            return state;
    }
}