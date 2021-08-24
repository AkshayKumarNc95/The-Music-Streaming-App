import jamendo from "../../Common/api/jamendo.js";

export const getAlbums = (next = undefined) => {
  const client_id = "303ece4b";
  let albumsPage =
    "/albums/?client_id=" +
    client_id +
    "&format=jsonpretty&limit=15" +
    "&fullcount=true";


  return async function(dispatch, getState) {
    // Async call!
    const albums = await jamendo.get(next?next:albumsPage);

    // Create the state using past state only for infinate scrolling!
    // And not use old state for new filters- Use the trackIds value to differentiate
    // The only way the value will be empty is either on first load or filter change
    const oldState = getState().albums.albums;
    const oldAlbums = oldState? oldState: [] ;
    const maxPageVal =
      Math.trunc(albums.data.headers.results_fullcount / 10) + 1;
    const newAlbums = getWhatisNeededFromTheAlbums(albums.data.results);
    const finalAlbums = [...oldAlbums, ...newAlbums];
    dispatch({
      type: "GET_ALBUMS",
      payload: { albums: finalAlbums, nextPage: albums.data.headers.next }
    });
  };
};

function getWhatisNeededFromTheAlbums(albums) {
  return albums.map(ele => {
    return {
      id: ele.id,
      name: ele.name,
      website: ele.website,
      joindate: ele.joindate,
      image: ele.image
    };
  });
}
