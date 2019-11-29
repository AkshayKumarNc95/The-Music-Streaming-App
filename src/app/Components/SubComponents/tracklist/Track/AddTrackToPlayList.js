import React, { Component } from "react";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal
} from "semantic-ui-react";

export default class TransitionablePortalExamplePortal extends Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={props.addToPlayList}>
          <Icon
            id="btn-icon"
            name={custom.secondIcon}
            color="grey"
            size="large"
          ></Icon>
        </Button>
        <TransitionablePortal open={open} transition={{ animation, duration }}>
          <Segment
            style={{
              left: "40%",
              position: "fixed",
              top: "50%",
              zIndex: 1000
            }}
          >
            <Header>This is a controlled portal</Header>
            <p>Portals have tons of great callback functions to hook into.</p>
            <p>To close, simply click the close button or click away</p>
          </Segment>
        </TransitionablePortal>
      </div>
    );
  }
}
