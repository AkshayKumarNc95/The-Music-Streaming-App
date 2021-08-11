import React, { PureComponent } from "react";
// Custom components
import Home from "../Components/Home";
import { getPLayLists } from "../Store/Actions/PlayLists";
import { connect } from "react-redux";

class HomePageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    // Load home page dynamic items here: 
    props.getPLayLists(-1);
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getPLayLists
};

export default connect(null, mapDispatchToProps)(HomePageContainer);
