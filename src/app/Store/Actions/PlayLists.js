import jamendo from "../../api/jamendo.js";

let pageNum = 0;
let lastAdded = 1;

export const getPlayListItems = ids => {
  // const ids = getDummyIds(id);

  let tracks = [];

  let idsString = "";
  for (const id of ids) {
    idsString += id + "+";
  }
  idsString = idsString.substring(0, idsString.length - 1);

  let getTracks = "/tracks/?client_id=" + client_id + "&id=" + idsString;

  return async function(dispatch, getState) {
    // Call the DB and get the track ids as array
    // Use the ids to get thhe track info
    // dispatch the track info
    tracks = await jamendo.get(getTracks);
    // Max page-
    const maxPageVal = 2;

    pageNum++;
    const finalTracks = getWhatisNeededFromTheTracks(tracks.data.results);
    dispatch({
      type: "GET_PLAY_LIST_ITEMS",
      payload: { tracks: finalTracks, maxPage: maxPageVal }
    });
  };
};

const client_id = "303ece4b";

function getWhatisNeededFromTheTracks(tracks) {
  return tracks.reduce(function(res, track) {
    let artists = { id: track.artist_id, name: track.artist_name };
    res.push({
      id: track.id,
      title: track.name,
      albumId: track.album_id,
      artists: [artists],
      avatar: track.image,
      songData: track.audio
    });
    return res;
  }, []);
}

export const getPLayLists = userId => {
  // Need to implement
  return {
    type: "GET_PLAY_LISTS",
    payload: []
  };
};

export const addPlayList = name => {
  let playList = {
    key: name + lastAdded++,
    text: name,
    value: lastAdded,
    tracks: []
  };

  return {
    type: "ADD_PLAYLIST",
    payload: playList
  };
};

export const setSelectedPlayList = id => {
  return {
    type: "SELECTED_PLAYLIST",
    payload: id
  };
};

export const addTrackToPlayList = (trackId, playListId) => {
  return {
    type: "ADD_TRACK_TO_PLAYLIST",
    payload: { trackId, playListId }
  };
};

export const removeTrackFromPlayList = (trackId, playListId) => {
  return dispatch => {
    console.log(dispatch);
    dispatch({
      type: "REMOVE_TRACK_FROM_PLAYLIST",
      payload: { trackId, playListId }
    });
    dispatch({
      type: "GET_PLAY_LIST_ITEMS_AFTER_REMOVE",
      payload: trackId
    });
  };
};

function getDummyIds(id) {
  return [1255543, 944337, 882514];
}


export function playCurrentPlayList(play){

  return (dispatch, getState) => {
    console.log(dispatch);
    const state = getState();
    const tracksToPlay = [...state.playList.tracks];

    dispatch({
      type: "PLAY_TRACK",
      payload: {}
    });
    dispatch({
      type: "PLAY_CURRENT_PLAYLIST",
      payload: tracksToPlay
    });
  };
}