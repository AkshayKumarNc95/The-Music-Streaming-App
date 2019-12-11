import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Menu, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./LayOut.scss";
import SearchBar from "../../../Containers/mini-containers/search/SearchBar";
import PlayerContainer from "../../../Containers/mini-containers/home-essntls/PlayerContainer";


function LayOut(props) {
  const { children } = props;
  // Just for theming
  const fixed = false;
  return (
    <Segment
      inverted
      textAlign="center"
      style={{
        minHeight: 700,
        padding: "1em 0em"
      }}
      vertical
    >
      <Menu
        fixed={fixed ? "top" : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container className="nav-outline">
          <Icon name="music" />
          <Menu.Item active>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/albums">Albums</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/artists">Artists</Link>
          </Menu.Item>
          <Menu.Item position="left">
            <SearchBar />
          </Menu.Item>
          <Menu.Item position="right">
            <Button as="a" inverted={!fixed}>
              Log in
            </Button>
            <Button
              as="a"
              inverted={!fixed}
              primary={fixed}
              style={{ marginLeft: "0.5em" }}
            >
              Sign Up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
      <Container className="cld-div">{children}</Container>
      <Container id="home-player-container">
        <PlayerContainer />
      </Container>
    </Segment>
  );
}

LayOut.propTypes = {
  children: PropTypes.node
};

export default LayOut;
