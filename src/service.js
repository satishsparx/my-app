import axios from 'axios';

// Api call for all the places data
const getPlaces = async() =>{
    try {
        const resp = await axios.get('https://roadtrippers.herokuapp.com/api/v1/places');
        return resp;
    } catch (err) {
        console.error(err);
    }
}

// Api call for the specific place
const getPlaceInfo = async(id) => {
    try {
        const resp = await axios.get('http://roadtrippers.herokuapp.com/api/v1/place/'+ id.toString());
        return resp;
    } catch (err) {
        console.error(err);
    }
}

export {getPlaces,getPlaceInfo}