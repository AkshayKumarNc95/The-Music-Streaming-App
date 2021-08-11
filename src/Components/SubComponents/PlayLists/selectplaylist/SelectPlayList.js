import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import {
  getPlayListItems,
  setSelectedPlayList
} from "../../../../Store/Actions/PlayLists.js";
import { playCurrentPlayList } from "../../../../Store/Actions/PlayLists.js";
import "./SelectPlayList.scss";

class SelectPlayList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: -1, playListTrackCount: -1, isPlaying: false };
  }

  render() {
    const myplaylists = this.props.plays;

    return (
      <div id="filter-play-lists">
        <Dropdown
          id="filter-play-lists-select"
          key="x-3"
          placeholder="Choose a Playlist"
          fluid
          selection
          options={myplaylists ? myplaylists : []}
          value={this.state.selected}
          onChange={(e, d) => this.handleOnPlayListChange(e, d, myplaylists)}
        />
        <Button
          id="filter-play-lists-play-all"
          onClick={this.playAllTracksFromThisPlayList.bind(this)}
        >
          <Icon
            id="ico-play-list-filter"
            name="play circle outline"
            size="big"
          ></Icon>
        </Button>
      </div>
    );
  }

  //#region  Life Cycle methods
  componentDidUpdate(prevProps) {
    if (this.state.selected > -1) {
      const tracks = this.findSelectedPlaylist(
        this.state.selected,
        this.props.plays
      ).tracks;
      tracks && tracks.length > 0 && this.props.getPlayListItems(tracks);
    }
  }
  //#endregion  Life Cycle methods

  //#region Events
  findSelectedPlaylist(id, playlists) {
    return playlists.find(ele => {
      return ele.value === id;
    });
  }

  playAllTracksFromThisPlayList() {
    this.props.playCurrentPlayList(true);
  }

  handleOnPlayListChange(event, data, myplaylists) {
    // use data.value to get the playlist selected
    // then get the tracks associated
    const tracks = myplaylists.find(ele => {
      return ele.value === data.value;
    }).tracks;

    if (tracks && tracks.length > 0) {
      // this.props.getPlayListItems(tracks);
      this.props.setSelectedPlayList(data.value);
      this.setState({
        selected: data.value,
        playListTrackCount: tracks.length
      });
    }
  }
  //#endregion Events

}// End of SelectPlayList

const mapDispatchToProps = {
  getPlayListItems,
  setSelectedPlayList,
  playCurrentPlayList
};

const mapStateToProps = state => {
  return { plays: state.plays };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlayList);
