import React from "react";
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

// Custom imports
import "./HomePage.scss";
import FilterList from "../SubComponents/FilterList/FIlterList.js";
import TrackListContainer from "../../Containers/mini-containers/TrackListContainer.js";
import PlayerContainer from "../../Containers/mini-containers/PlayerContainer";

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

// No state component!
// Should rely completely on redux store or props from parent component
function HomePage(props) {
  return (
    <div id = "home-outer-most">
      <div id="home-outer-flex-container">
        <Container id="home-track-container" className="container">
          <Header className="header"> Track list</Header>
          <div className="filter-list">
            <FilterList />
          </div>
          <div className="track-list-container">
            <TrackListContainer />
          </div>
        </Container>
        <Container id="home-play-container" className="container">
          <Header className="header"> Play list</Header>
          <div>
            <Dropdown
              className="play-list-select"
              placeholder="Choose a Playlist"
              fluid
              selection
              options={options}
            />
            <div className="play-list-container">
              <PlayList />
            </div>
            <div className="play-song-container">
              <Icon loading name="asterisk" />
            </div>
          </div>
        </Container>
      </div>
      <Container id="home-player-container">
        <PlayerContainer />
      </Container>
    </div>
  );
}

// function TrackList(props) {
//   return <div>  <Icon loading name='asterisk' /></div>;
// }

function PlayList(props) {
  return (
    <div>
      {" "}
      <Icon loading name="asterisk" />
    </div>
  );
}

export default HomePage;
