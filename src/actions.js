import {
    ADD_FAVOURITE_PLACE,
    REMOVE_FAVOURITE_PLACE,
    CHANGE_ICON_COLOR
}
    from './reducers/constants';

export function addFavouritePlace(favouritePlaces) { 
    return {
        type: ADD_FAVOURITE_PLACE,
        favouritePlaces
    }
}

export function removeFavouritePlace(place) {
    return {
        type: REMOVE_FAVOURITE_PLACE,
        place
    }
}

export function changeIconColor(index, color) {
    return {
        type: CHANGE_ICON_COLOR,
        index,
        color
    }
}


