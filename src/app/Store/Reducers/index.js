import {combineReducers} from 'redux';

import {tracksReducer, playTrack} from './Tracks.js';
import {PlayListsReducer,PlayListReducer, SelectedPlayListReducer, playSelectedPlayList} from './PlayLists.js';
import {artistsReducer} from './Artists';
import {albumsReducer} from './Albums';

export default combineReducers(
    {
        tracks: tracksReducer,
        playMe: playTrack,
        plays: PlayListsReducer,
        playList: PlayListReducer,
        selectedPlayList: SelectedPlayListReducer,
        playCurrentPlayList : playSelectedPlayList,
        artists: artistsReducer,
        albums: albumsReducer
    }
);


