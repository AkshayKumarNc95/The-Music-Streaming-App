import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Dropdown,
  Dimmer,
  Loader,
  Icon
} from "semantic-ui-react";
import _ from "lodash";

// Custom
import Track from "./Track/Track.js";
import "./TrackList.scss";

function debounceEventHandler(...args) {
  const debounced = _.debounce(...args);
  return function(e) {
    e.persist();
    return debounced(e);
  };
}

export default function AudioTrackList(props) {
  const { tracks, playTrackHandler, addTrackHandler } = props;
  console.log(tracks);
  return (
    <div
      id="track-list-container"
      onScroll={debounceEventHandler(props.fetchNextTracks, 500)}
    >
      <List celled size="big">
        {tracks
          ? tracks.map(track => {
              return (
                <Track
                  addSongToPlayList={addTrackHandler}
                  playThisSong={playTrackHandler}
                  id={track.id}
                  key={track.id}
                  title={track.title}
                  artists={track.artists}
                  avatar={track.avatar}
                />
              );
            })
          : showLoader(true)}
          {showLoader(props.loading)}
      </List>
    </div>
  );
}

function showLoader(show = false) {
  if (!show) {
    return;
  }
  return (
    <div id="loading-bar">
      <Icon id="loading-ico" loading name="asterisk" />
    </div>
  );
}

/*
  Props Required for Track: 
   - addSongToPlayList
   - playThisSong
   - id
   - title
   - artists
   - avatar  

*/
