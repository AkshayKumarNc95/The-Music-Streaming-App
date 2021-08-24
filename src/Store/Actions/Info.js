
import jamendo from "../../Common/api/jamendo.js";
export const viewInfo =(id, type = "artists") =>{

    // Use call backs and get the artist info along with the tracks associated and dispatch the actions
    const client_id = "303ece4b";
    let infoPath =
      "/"+type+"/tracks/?client_id=" +
      client_id +
      "&format=jsonpretty&limit=15" +
      "&fullcount=true"+ "&id="+id;
  
  
    return async function(dispatch) {
      // Async call!
      const info = await jamendo.get(infoPath);
  
      const data = info.data.results[0];
      dispatch({
        type: "VIEW_INFO",
        payload: {type: type, data}
      });
    };
  }