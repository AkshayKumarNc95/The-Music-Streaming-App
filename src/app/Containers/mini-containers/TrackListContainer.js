import React, { Component } from "react";
import TrackList from "../../Components/SubComponents/tracklist";
import { connect } from "react-redux";
import { getTracks } from "../../Store/Actions/Tracks";



class TrackListContainer extends Component {
  //#region  dummy
  // Dummy data- Use Redux:

  //#endregion dummy

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      loading: false     
    };
    // map dispatch here!
    props.getTracks(undefined, undefined, 0);
  }

  fetchNextTracks(e) {
    let element = e.target;
    console.log(element.scrollHeight);
    console.log( Math.ceil(element.scrollTop));
    console.log(element.clientHeight);
    if ((element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight)&& this.state.currentPage<=this.props.tracks.maxPage){
      this.setState({loading: true});
      this.props.getTracks(undefined, undefined, ++this.state.currentPage );
    }
  }

  addTrackToPlaylist(id) {
    // Implementation pending
    console.log("add this to play list: " + id);
  }

  playThisSong(id) {
    // Implementation pending
    console.log("play me: " + id);
  }

  render() {
    return (
      <div>
        {console.log(this.props.tracks.maxPage)}
        <TrackList
          {...this.props.tracks}
          addTrackHandler={this.addTrackToPlaylist.bind(this)}
          playTrackHandler={this.playThisSong.bind(this)}
          fetchNextTracks={this.fetchNextTracks.bind(this)}
          loading = {this.state.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state1 => {
  console.log(state1);
  return {
    tracks: state1.tracks
  };
};

const mapDispatchToProps = {
  getTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackListContainer);

/*
Props needed for TrackList: 
  - Tracks
  - Add track to pplaylist handler
  - Play a song handler

           
*/

/*
 Notes: 
  - 

*/
