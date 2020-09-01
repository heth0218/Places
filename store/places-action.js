import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, location) => {
    return async dispatch => {

        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lng}&key=99c3fbb921554d9ca4374f1f0f0f5d49`)

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        const resData = await response.json()
        if (!resData.results) {
            throw new Error('Something went wrong')

        }

        console.log(resData.results[0].formatted)
        const address = resData.results[0].formatted;

        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }


        // dispatch({
        //     type: ADD_PLACE,
        //     placeData: {
        //         id: dbResult.insertId,
        //         title,
        //         image: newPath,
        //         address,
        //         coords: {
        //             lat: location.lat,
        //             lng: location.lng
        //         }
        //     }
        // })
    }

}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResults = await fetchPlaces();

            console.log(dbResults);

            dispatch({
                type: SET_PLACES,
                places: dbResults.rows._array
            })
        } catch (error) {
            throw error
        }


    }
}