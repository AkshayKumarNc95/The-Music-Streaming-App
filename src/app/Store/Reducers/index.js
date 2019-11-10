import {combineReducers} from 'redux';

import {tracksReducer} from './Tracks.js';


export default combineReducers(
    {
        tracks: tracksReducer,
    }
);


