import React, { PureComponent } from "react";
import GenericComponent from "../Components/GenComp";

class ArtistsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <GenericComponent />
      </div>
    );
  }
}

export default ArtistsPage;
