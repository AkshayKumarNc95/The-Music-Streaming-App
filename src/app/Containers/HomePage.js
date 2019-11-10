import React, { PureComponent } from "react";
// Custom components
import Home from "../Components/Home";

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

    render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default HomePage;
