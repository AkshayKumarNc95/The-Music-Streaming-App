import React, { Component } from "react";
import TrackList from "../../../Components/SubComponents/tracklist";
import { connect } from "react-redux";
import { getTracks, playMe } from "../../../Store/Actions/Tracks";
import { addTrackToPlayList } from "../../../Store/Actions/PlayLists";
import TransistionablePortal_Select from "../../../Components/GenComp/portal/TransistionablePortal_Select_Fn";
import {viewInfo} from '../../../Store/Actions/Info';


class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      loading: false,
      showSelectPlayList: false,
      selectedTrack: -1
    };
    // Get details from store:
    props.getTracks(undefined, undefined, 0);
  }

  render() {
    const theme = "light";
    const secondIcon = "plus";
    return (
      <div>
        <TrackList
          {...this.props.tracks}
          addOrRemoveTrack={this.addTrackToPlaylist.bind(this)}
          playTrackHandler={this.playThisSong.bind(this)}
          fetchNextTracks={this.fetchNextTracks.bind(this)}
          loading={this.state.loading}
          custom={{ theme, secondIcon }}
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

  // Fetch on scroll- #Pagination
  fetchNextTracks(e) {
    let element = e.target;
    if (
      element.scrollHeight - Math.ceil(element.scrollTop) <=
        element.clientHeight &&
      this.state.currentPage <= this.props.tracks.maxPage
    ) {
      this.setState({ loading: true });
      // Send undefined to force the action to include selected dropdown values!
      this.props.getTracks(undefined, undefined, ++this.state.currentPage);
    }
  }

  addTrackToPlaylist(track) {
    this.setState({ showSelectPlayList: true, selectedTrack: track });
  }

  onAddTrackClick(event, data) {
    this.setState({ showSelectPlayList: false, selectedTrack: -1 });

    data &&
      data.value &&
      this.props.addTrackToPlayList(this.state.selectedTrack, data.value);
  }

  playThisSong(id) {
    const track = this.props.tracks.tracks.find(element => {
      return element.id === id;
    });
    this.props.playMe({ ...track });
    //Pending- Once playing update the play button to show pause button! 
  }
}// End of TrackListContainer



const mapStateToProps = state1 => {
  console.log(state1);
  return {
    tracks: state1.tracks,
    playLists: state1.plays
  };
};

const mapDispatchToProps = {
  viewInfo,
  getTracks,
  playMe,
  addTrackToPlayList
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
