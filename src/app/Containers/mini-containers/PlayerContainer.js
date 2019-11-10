import React, { Component } from "react";
import Player from "../../Components/SubComponents/Player";

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Player />
      </div>
    );
  }
}

export default PlayerContainer;
