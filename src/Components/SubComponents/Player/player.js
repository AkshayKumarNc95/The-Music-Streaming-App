import React, { Component } from "react";

// Custom
import { Icon, Button, Item, Image } from "semantic-ui-react";
import "./player.scss";
import TrackInfo from "./TrackInfo/TrackInfo.js";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.audio = null;
  }

  repeatSong() {
    this.audio.currentTime = 0;
    this.audio.play();
  }


  render() {

    // Make sure the input this component is song data!
      // On play all: 
    /*
      Get the tracks- Component did update
      Select first one and update the state- Component Did update
      Selected item should play if not equals to -1: render

    */
   const { id, songData, fetchTrack } = this.props;


    return (
      <div id="player-container">
        <div className="player-song-details-container">
          <TrackInfo {...this.props} />
        </div>

        <div id="player-controls">
          <Button id="player-btn-left" onClick={() => fetchTrack("PREVIOUS")}>
            <Icon
              id="player-btn-icon-left"
              name="arrow alternate circle left outline"
              inverted
              color="orange"
              size="big"
            ></Icon>
          </Button>
          <Button id="player-btn-right" onClick={() => fetchTrack("NEXT")}>
            <Icon
              id="player-btn-icon-right"
              name="arrow alternate circle right outline"
              inverted
              color="orange"
              size="big"
            ></Icon>
          </Button>
          <audio
            id="music-player-audio"
            controls
            src={songData}
            autoPlay={true}
            ref={node => (this.audio = node)}
          />
        </div>

        <div className="player-repeat-song">
          <Button id="player-btn-repeat" onClick={() => this.repeatSong()}>
            <Icon
              id="player-btn-icon-repeat"
              name="repeat"
              inverted
              color="green"
              size="big"
            ></Icon>
          </Button>
          <Button id="player-btn-add" onClick={this.props.addSong}>
            <Icon
              id="player-btn-icon-repeat"
              name="plus"
              inverted
              color="white"
              size="big"
            ></Icon>
          </Button>
        </div>
      </div>
    );
  }
}


