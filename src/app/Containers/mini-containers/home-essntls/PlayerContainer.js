import React, { Component } from "react";
import Player from "../../../Components/SubComponents/Player";
import { connect } from "react-redux";

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], currentTrack: {}, currentTrackIndex: -1 };
  }

  render() {
    // Pending: The props for this container should always be an array of tracks- Use prop types

    return (
      <div>
        <Player
          {...this.state.currentTrack}
          fetchTrack={this.fetchTrack.bind(this)}
        />
      </div>
    );
  }

  //#region Life Cycle methods
  componentDidUpdate(preprops) {
    if (this.props.simArray !== preprops.simArray) {
      this.setState({
        tracks: this.props.simArray,
        currentTrack: this.props.simArray[0],
        currentTrackIndex: 0
      });
    }
    console.log(this.props.simArray);
  }
  //#endregion Life Cycle methods

  //#region  Events
  fetchTrack(nextOrPrev) {
    let newVal = this.state.currentTrackIndex;
    nextOrPrev === "NEXT" ? (newVal = newVal + 1) : (newVal = newVal - 1);

    if (newVal !== this.state.currentTrackIndex) {
      if (!(newVal >= this.state.tracks.length) && newVal > -1) {
        this.setState({
          currentTrackIndex: newVal,
          currentTrack: this.state.tracks[newVal]
        });
      }
    }
  }
  //#endregion Events
} // End of PlayerContainer

const mapStateToProps = state => {
  console.log(state);
  let simArray = [];
  if (state.playMe.id) {
    simArray.push({ ...state.playMe });
  } else if (state.playCurrentPlayList.length > -1) {
    simArray = state.playCurrentPlayList;
  }
  console.log(simArray);
  return { simArray };
};

export default connect(mapStateToProps)(PlayerContainer);
