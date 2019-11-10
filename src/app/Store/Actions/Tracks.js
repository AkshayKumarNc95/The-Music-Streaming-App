import jamendo from "../../api/jamendo.js";

let style = "";
let trend = "";
let trackIds = new Set();

export const getTracks = (FilterType = "", FilterValue = "", pageNum = 0) => {
  // Apply filters
  if (FilterType === "Style" || FilterType === "Categories") {
    FilterType === "Style" ? (style = FilterValue) : (trend = FilterValue);
    trackIds = new Set();
  }

  // Authenticate and create an API call!
  const client_id = "303ece4b";
  let appendInterests =
    "/tracks/?client_id=" +
    client_id +
    "&format=jsonpretty&limit=10&" +
    "&fuzzytags=" +
    style +
    "&speed=high+veryhigh&include=musicinfo&groupby=artist_id" +
    "&boost=" +
    trend +
    "&lang=en&fullcount=true" +
    "&offset=" +
    pageNum;

  // Handle the dispatch
  return async function(dispatch, getState) {
    // Async call!
    const tracks = await jamendo.get(appendInterests);

    // Create the state using past state only for infinate scrolling!
    // And not use old state for new filters- Use the trackIds value to differentiate
    // The only way the value will be empty is either on first load or filter change
    const oldState = getState();
    const oldTracks =
      oldState.tracks.tracks && trackIds.size > 0 ? oldState.tracks.tracks : [];
    const maxPageVal =
      Math.trunc(tracks.data.headers.results_fullcount / 10) + 1;
    const newTracks = getWhatisNeededFromTheTracks(tracks.data.results);
    const finalTracks = [...oldTracks, ...newTracks];
    dispatch({
      type: "GET_TRACKS",
      payload: { tracks: finalTracks, maxPage: maxPageVal }
    });
  };
};

function getWhatisNeededFromTheTracks(tracks) {
  // No duplicate Elements!
  console.log(trackIds);

  return tracks.reduce(function(res, track) {
    if (!trackIds.has(Number.parseInt(track.id))) {
      trackIds.add(Number.parseInt(track.id));
      let artists = { id: track.artist_id, name: track.artist_name };
      res.push({
        id: track.id,
        title: track.name,
        albumId: track.album_id,
        artists: [artists],
        avatar: track.image
      });
    }
    return res;
  }, []);
}
