import React from "react";
import { Image, Icon, Item, Container } from "semantic-ui-react";
import {Link} from 'react-router-dom';

import "./TrackInfo.scss";

const TrackInfo = props => {
  const avatar = undefined;
  const title = undefined;
  const id = undefined;
  
  return (
    <Container id="track-info-container">
      <div id="ti-avatar">
        <Image
          size="tiny"
          rounded
          src={
            avatar
              ? avatar
              : "https://react.semantic-ui.com/images/avatar/small/helen.jpg"
          }
        />
      </div>
      <div id="track-info-header">
        <h2>Titlehhhhhhhhhhhhhhhhhhhhhhhhhhggggggggggggggggggggggggggggggg</h2>
        <Link to={"/Albums?id="+id} id = "ti-art-alm-lnk">
           <span> {title? title: "Track-Name"}  </span>
          </Link>
      </div>
    </Container>
  );
};

export default TrackInfo;
