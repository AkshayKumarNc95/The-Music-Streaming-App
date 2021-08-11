import jamendo from "../../common/api/jamendo.js";

export const getArtists = (next = undefined) => {
  const client_id = "303ece4b";
  let artistspage =
    "/artists/?client_id=" +
    client_id +
    "&format=jsonpretty&limit=15" +
    "&fullcount=true";


  return async function(dispatch, getState) {
    // Async call!
    const artists = await jamendo.get(next?next:artistspage);

    // Create the state using past state only for infinate scrolling!
    // And not use old state for new filters- Use the trackIds value to differentiate
    // The only way the value will be empty is either on first load or filter change
    const oldState = getState().artists.artists;
    const oldArtists = oldState? oldState: [] ;
    const maxPageVal =
      Math.trunc(artists.data.headers.results_fullcount / 10) + 1;
    const newArtists = getWhatisNeededFromTheArtists(artists.data.results);
    const finalArtists = [...oldArtists, ...newArtists];
    dispatch({
      type: "GET_ARTISTS",
      payload: { artists: finalArtists, nextPage: artists.data.headers.next }
    });
  };
};

function getWhatisNeededFromTheArtists(artists) {
  return artists.map(ele => {
    return {
      id: ele.id,
      name: ele.name,
      website: ele.website,
      joindate: ele.joindate,
      image: ele.image
    };
  });
}


