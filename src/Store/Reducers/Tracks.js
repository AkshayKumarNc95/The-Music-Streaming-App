export function tracksReducer(state = [], action) {
  console.log(action);
  switch (action.type) {
    case "GET_TRACKS": {
      return action.payload;
    }
  }

  return state;
}

export function playTrack(state = {}, action) {
  if (action.type === "PLAY_TRACK") {
    return action.payload;
  }
  return state;
}
