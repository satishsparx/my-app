import {
    ADD_FAVOURITE_PLACE,
    REMOVE_FAVOURITE_PLACE,
    CHANGE_ICON_COLOR
}
from './constants';

const placesReducers = (state = {
    favouritePlaces: [],
    iconColors: new Array(100).fill('grey')
}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ADD_FAVOURITE_PLACE:
            state.favouritePlaces.push(action.favouritePlaces);
            newState.favouritePlaces = state.favouritePlaces;
            return newState;
        
        case REMOVE_FAVOURITE_PLACE:
            state.favouritePlaces.splice(action.place,1);
            newState.favouritePlaces = state.favouritePlaces;
            return newState;

        case CHANGE_ICON_COLOR:
            newState.iconColors = {...state.iconColors,[action.index]: action.color}
            return newState;
        default:
            return state;
    }
}

export default placesReducers;
