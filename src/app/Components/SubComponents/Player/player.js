import React, { Component } from "react";

// Custom
import { Icon, Button, Item, Image } from "semantic-ui-react";
import "./player.scss";
import TrackInfo from './TrackInfo/TrackInfo.js';



export default function Player(props) {
  let aud1 = "https://mp3l.jamendo.com/?trackid=1255543&format=mp31&from=app-303ece4b";
  return (
    <div id="player-container">
      <div className="player-song-details-container">
        <TrackInfo />

      </div>

      <div id="player-controls">
        <Button id="player-btn-left">
          <Icon
            id="player-btn-icon-left"
            name="arrow alternate circle left outline"
            inverted
            color="orange"
            size="big"
          ></Icon>
        </Button>
        {/* <Button id="player-btn-play">
          {true ? (
            <Icon
              id="player-btn-icon-play"
              name="play circle outline"
              inverted
              color="white"
              size="huge"
            ></Icon>
          ) : (
            <Icon
              className="player-btn-icon-pause"
              name="pause circle outline"
              inverted
              color="red"
              size="huge"
            ></Icon>
          )}
        </Button> */}
       
        <Button id="player-btn-right">
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
          src={aud1}
        />
        </div>

      <div className="player-song-details">
        
        <h2>Next</h2>
        <span>Song Name!</span>
      </div>
    </div>
  );
}
