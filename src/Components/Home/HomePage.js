import React from "react";
import {
  Container,
  Header,
} from "semantic-ui-react";

// Custom imports
import "./HomePage.scss";
import FilterList from "../SubComponents/FilterList/FIlterList.js";
import SelectPlayList from '../SubComponents/PlayLists/selectplaylist/SelectPlayList.js';
import TrackListContainer from "../../Containers/mini-containers/home-essntls/TrackListContainer.js";

import PlayListsContainer from '../../Containers/mini-containers/home-essntls/PlayListsContainer';
import AddPlayList from '../SubComponents/PlayLists/addplaylist/AddPlayList';

// Functional component- Try not to use state!
// Should rely completely on redux store (or) props from parent component
// Should just provide layout for home page!
function HomePage(props) {
  
  return (
    <div id = "home-outer-most">
      <div id="home-outer-flex-container">
        <Container id="home-track-container" className="container">
          <Header className="header"> Track list</Header>
          <div className="filter-list">
            <FilterList filterFor = "TRACKLIST"/>
          </div>
          <div className="track-list-container">
            <TrackListContainer />
          </div>
        </Container>
        <Container id="home-play-container" className="container">
          <Header className="header"> Play Lists</Header>
          <div>
            <div id="home-play-filter-container">
            <SelectPlayList />
            <AddPlayList />
            </div>
            <div className="play-list-container">
              <PlayListsContainer />
            </div>
          </div>
        </Container>
      </div>
   
    </div>
  );
}
export default HomePage;
