import React, { Component } from "react";
import Player from "../../../Components/SubComponents/Player";
import { connect } from "react-redux";
import { addTrackToPlayList } from "../../../Store/Actions/PlayLists";
import TransistionablePortal_Select from "../../../Components/GenComp/portal/TransistionablePortal_Select_Fn";
import {viewInfo} from '../../../Store/Actions/Info';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], currentTrack: {}, currentTrackIndex: -1, showSelectPlayList: false};
  }

  render() {
    // Pending: The props for this container should always be an array of tracks- Use prop types

    return (
      <div>
        <Player
          {...this.state.currentTrack}
          fetchTrack={this.fetchTrack.bind(this)}
          addSong = {this.addTrackToPlaylist.bind(this)}
          handleOnLinkClick = {this.props.viewInfo}
        />
         {this.state.showSelectPlayList && (
          <TransistionablePortal_Select
            header="Choose PlayList"
            options={this.props.playLists}
            onSelectHandler={this.onAddTrackClick.bind(this)}
          />
        )}
      </div>
    );
  }

  
  addTrackToPlaylist() {
    this.state.currentTrack.id&&
    this.setState({ showSelectPlayList: true});
  }

  onAddTrackClick(event, data) {
    this.setState({ showSelectPlayList: false });

    data &&
      data.value &&
      this.props.addTrackToPlayList(this.state.currentTrack.id, data.value);
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
  return { simArray ,  playLists: state.plays};
};

const mapDispatchToProps = {
  viewInfo,
  addTrackToPlayList
};



export default connect(mapStateToProps,mapDispatchToProps)(PlayerContainer);
