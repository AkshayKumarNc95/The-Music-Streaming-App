import React from "react";
import { Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./TrackInfo.scss";

const TrackInfo = props => {
  const { id, title, albumId, artists, avatar,handleOnLinkClick } = props;

  return (
    <Container id="track-info-container">
      <div id="ti-avatar">
        <Image
          size="tiny"
          rounded
          src={
            avatar
              ? avatar
              : 'https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png'
          }
          alt="image" 
        />
      </div>
      <div id="track-info-header">
        <Link to={"/Albums?id=" + id} id="trackinfo-title">
          <h2 id="trackinfo-h2"> {title ? title : "Track-Name"} </h2>
        </Link>

        {artists ? (
          artists.map(artist => {
            return (
              <Link
                key={artist.id}
                id="trackinfo-link-artist"
                onClick={() =>
                  artist.id &&
                  handleOnLinkClick(artist.id, "artists")
                }
              >
                {artist.name ? artist.name : "Unknown"},
              </Link>
            );
          })
        ) : (
          <Link id="trackinfo-link-artist" to="/artists">
            Artists
          </Link>
        )}
      </div>
    </Container>
  );
};

export default TrackInfo;
