import React, { Component } from "react";
import ModalInfo from "../../../Components/GenComp/Modal/Modal";
import { connect } from "react-redux";
import TrackList from "../../../Components/SubComponents/tracklist";
import { playMe } from "../../../Store/Actions/Tracks";
import { addTrackToPlayList } from "../../../Store/Actions/PlayLists";
import TransistionablePortal_Select from "../../../Components/GenComp/portal/TransistionablePortal_Select_Fn";

class InfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      show: true,
      showSelectPlayList: false,
      selectedTrack: -1,
    };
  }
  componentDidMount(){
      document.title = 'Crazy Streamer!';
  }


  componentDidUpdate(prevProps) {
    if (this.props.info.data && this.props.info.data.id) {
      prevProps.info &&  prevProps.info.data
        ? this.props.info.data.id !== prevProps.info.data.id &&
          !this.state.show &&
          this.setState({ show: true })
        : this.setState({ show: true });
    }
  }

  playThisSong(id) {
    const trackTo = this.props.info.data.tracks.find((element) => {
      return element.id === id;
    });

    let track = {};
    if (this.props.info.type === "artists") {
      track = extractTrackInfo(trackTo);
    } else {
      const trackFinal = extractTrackInfo(trackTo);
      const artists = {
        id: this.props.info.data.artist_id,
        name: this.props.info.data.artist_name,
      };
      trackFinal.albumId = this.props.info.data.id;
      trackFinal.artists = [artists];
      trackFinal.avatar = this.props.info.data.image;
      track = trackFinal;
    }

    this.props.playMe({ ...track });
    //Pending- Once playing update the play button to show pause button!
  }

  addThisTrack(track) {
    this.setState({ showSelectPlayList: true, selectedTrack: track });
  }

  onAddTrackClick(event, data) {
    this.setState({ showSelectPlayList: false, selectedTrack: -1 });

    data &&
      data.value &&
      this.props.addTrackToPlayList(this.state.selectedTrack, data.value);
  }

  onCloseClick() {
    // Set show to false and trigger action
    this.setState({ show: false });
  }
  // This class will have to get the artist information using id sent through props
  // Along with the tracks associated!
  // Is responsible for call backs
  // Will only be shown when the user clicks on an artist
  render() {
    const { id, name, image } = this.props.info.data
      ? this.props.info.data
      : { id: -1, name: "", image: "", tracks: [] };
    let trackList = "";
    const website =
      this.props.info.data && this.props.info.data.website
        ? this.props.info.data.website
        : "Not found!";
    if (id > -1 && this.state.show) {
      // Create the track list component here
      trackList = (
        <TrackList
          tracks={this.getWhatisNeededFromTheTracks()}
          playTrackHandler={this.playThisSong.bind(this)}
          addOrRemoveTrack={this.addThisTrack.bind(this)}
          fetchNextTracks={() => {}}
          custom={{
            theme: "dark",
            secondIcon: "plus",
            isArtist: this.props.info.type === "artists",
          }}
        />
      );
    }
    // Call get Artist Info, and dispaly loading!
    // If still loading- then show loading screen!
    return (
      <div>
        {this.state.showSelectPlayList && (
          <TransistionablePortal_Select
            header="Choose PlayList"
            options={this.props.playLists}
            onSelectHandler={this.onAddTrackClick.bind(this)}
          />
        )}
        {id > -1 && this.state.show && (
          <ModalInfo
            id={this.props.info.data.id}
            title={name}
            description={"WebSite: " + website}
            dimmer=""
            image={image}
            showList={true}
            ListComponent={trackList}
            playTrack=""
            addTrack=""
            onCloseClick={this.onCloseClick.bind(this)}
          />
        )}
      </div>
    );
  }

  getWhatisNeededFromTheTracks() {
    const info = this.props.info;
    if (info.type === "artists") {
      return info.data.tracks.map((track) => {
        return extractTrackInfo(track);
      });
    } else {
      return info.data.tracks.map((track) => {
        const trackFinal = extractTrackInfo(track);
        const artists = {
          id: info.data.artist_id,
          name: info.data.artist_name,
        };
        trackFinal.albumId = info.data.id;
        trackFinal.artists = [artists];
        trackFinal.avatar = info.data.image;
        return trackFinal;
      });
    }
  }
}

function extractTrackInfo(track) {
  let artists = { id: track.album_id, name: track.album_name };
  return {
    id: track.id,
    title: track.name,
    albumId: track.album_id,
    artists: [artists],
    avatar: track.image,
    songData: track.audio,
  };
}

const mapStateToProps = (state) => {
  return {
    info: state.ViewInfo,
    playLists: state.plays,
  };
};

const mapDispatchToProps = { playMe, addTrackToPlayList };

// Connect with the redux state
export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);
