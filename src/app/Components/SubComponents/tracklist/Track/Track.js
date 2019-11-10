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
import { Link } from "react-router-dom";
// Custom
import "./Track.scss";

export default function Track(props) {
  const { addSongToPlayList, playThisSong, id, title, artists, avatar } = props;

  return (
    <List.Item className = 'track-list-item'>
      <Image
       id = "avatar-img"
        avatar
        src={avatar? avatar: "https://react.semantic-ui.com/images/avatar/small/helen.jpg"}
      />
      <List.Content id = "list-content">
        <List.Header >
          {/* Pending-  This link should be pointed to the Song details page! */}
          <Link to={"/Albums?id="+id} id = "link-track-name">
           <span> {title? title: "Track-Name"}  </span>
          </Link>
        </List.Header>
        
        {/* Pending- Navigating to Artist page */}
        {artists? artists.map(artist=>{
          return (<Link key = {artist.id} className="link-artist" to={"/Artists?id="+artist.id}>
            {artist.name? artist.name: "Unknown"},
          </Link>)
        }): (<Link className="link-artist" to="/artists">
          Artists
        </Link>)}
        
      </List.Content>
      <OtherControls addToPlayList={()=> addSongToPlayList(id)} play={()=> playThisSong(id)} />
    </List.Item>
  );
}

function OtherControls(props) {
  return (
    <div id="group-options">
      <Button onClick={props.play}>
        <Icon id="btn-icon" name="play" color="green" size="large"></Icon>
      </Button>
      <Button onClick={props.addToPlayList}>
        <Icon id="btn-icon" name="plus" color="grey" size="large"></Icon>
      </Button>
    </div>
  );
}
