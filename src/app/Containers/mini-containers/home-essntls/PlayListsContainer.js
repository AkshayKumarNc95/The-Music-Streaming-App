import React, { Component } from "react";
// import PlayLists from "../../Components/SubComponents/PlayLists";

import {
  removeTrackFromPlayList
} from "../../../Store/Actions/PlayLists.js";
import { playMe } from "../../../Store/Actions/Tracks.js";
import { connect } from "react-redux";
import TrackList from "../../../Components/SubComponents/tracklist";

class PlayListsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      loading: false
    };
  }

  render() {
    const theme = "dark";
    const secondIcon = "minus";
    console.log(this.props);
    return (
      <div>
        <TrackList
          {...this.props.PlayLists}
          addOrRemoveTrack={this.removeTrack.bind(this)}
          playTrackHandler={this.playThisSong.bind(this)}
          fetchNextTracks={this.fetchNextTracks.bind(this)}
          loading={this.state.loading}
          custom={{ theme, secondIcon }}
        />
      </div>
    );
  }

  //#region Events
  fetchNextTracks(e) {
    // Pending: Implement fetch on scroll
  }

  removeTrack(id) {
    this.props.removeTrackFromPlayList(id, this.props.selected);
  }

  playThisSong(id) {
    const track = this.props.PlayLists.tracks.find(element => {
      return element.id === id;
    });
    this.props.playMe({ ...track });
  }
  //#endregion Events

}

const mapStateToProps = state1 => {
  return {
    PlayLists: state1.playList,
    selected: state1.selectedPlayList
  };
};

const mapDispatchToProps = {
  playMe,
  removeTrackFromPlayList
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayListsContainer);
