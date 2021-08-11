export function PlayListReducer(state = {}, action) {

  switch (action.type) {
    case "GET_PLAY_LIST_ITEMS": {
      return action.payload;
    }
    case "GET_PLAY_LIST_ITEMS_AFTER_REMOVE":{
      const oldState = {...state};
      console.log(oldState);
       return oldState.tracks.filter(ele =>{
         ele.id !== action.payload;
       })
    }
    case "GET_TRACKS_FROM_SELECTED_PLAYLIST":{
        return state;
    }
  }
  return state;
};

export function SelectedPlayListReducer(state = -1, action){

  switch(action.type){
    case "SELECTED_PLAYLIST":{
      return action.payload;
    }
  }
  return state;
}

export function playSelectedPlayList(state= [], action){
  switch(action.type){
    case "PLAY_CURRENT_PLAYLIST":{
      return action.payload;
    }
  }
  return state;
}

export function PlayListsReducer(state = [], action) {
  console.log(action);
  switch (action.type) {
    case "GET_PLAY_LISTS": {
      return action.payload.length>0?action.payload: state ;
    }
    case "ADD_PLAYLIST": {
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    }
    case "REMOVE_PLAYLIST": {
      const oldState = [...state];
      return oldState.filter(ele => {
        return ele.value !== action.payload;
      });
    }
    case "ADD_TRACK_TO_PLAYLIST": {
      // Get hold of the playlost and add track id
      console.log(state);
      const oldState = [...state];
      const playList = oldState.find(ele =>{
        return ele.value === action.payload.playListId;
      })
      playList.tracks.push(action.payload.trackId);
      return oldState;
    }
    case "REMOVE_TRACK_FROM_PLAYLIST": {
      const oldState = [...state];
      console.log(oldState);
      let playList = oldState.find(ele =>{
        return ele.value === action.payload.playListId;
      });
      let indexToRemove =  playList.tracks.indexOf(action.payload.trackId);

      playList.tracks.splice(indexToRemove,1);
      console.log(oldState);
      return oldState;
    }
  }
  return state;
}
