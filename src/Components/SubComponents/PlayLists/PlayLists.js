import React from "react";
import "./PlayLists.scss";
import TrackListContainer from "../../../Containers/mini-containers/TrackListContainer";

import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

export default function PlayLists(props) {
  return (
    <div id="play-lists-filter">
      {/* <div id="play-list-select">
        <Dropdown
          placeholder="Choose a Playlist"
          fluid
          selection
          options={options}
          onChange = {props.getPlayList}
        />
      </div> */}
      {/* <div id="play-list-tracks"> */}
        {/* <TrackListContainer  custom={{ secondIcon: "minus", theme: "dark" }} /> */}
      {/* </div> */}
    </div>
  );
}
