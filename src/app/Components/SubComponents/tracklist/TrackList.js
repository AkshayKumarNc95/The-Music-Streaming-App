import React, { Component } from "react";
import {
  List,
  Segment,
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
  const { tracks, playTrackHandler, addOrRemoveTrack, custom } = props;

  //Use custom.theme here to change!
  console.log(props);
  return (
    <div
      id="track-list-container"
      onScroll={debounceEventHandler(props.fetchNextTracks, 500)}
    >
      <Segment inverted={custom&&custom.theme === "dark"}>
        <List celled size="big" inverted={custom&&custom.theme === "dark"} divided >
          {tracks
            ? tracks.map(track => {
                return (
                  <Track
                    addSongToPlayList={addOrRemoveTrack}
                    playThisSong={playTrackHandler}
                    id={track.id}
                    key={track.id}
                    title={track.title}
                    artists={track.artists}
                    avatar={track.avatar}
                    custom={custom}
                  />
                );
              })
            : showLoader(true)}
          {showLoader(props.loading)}
        </List>
      </Segment>
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


