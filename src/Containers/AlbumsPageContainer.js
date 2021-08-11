import React, { PureComponent } from "react";
import { GenericComponent } from "../Components/GenComp";
import { getAlbums} from "../Store/Actions/Albums";
import {viewInfo} from '../Store/Actions/Info';
import { connect } from "react-redux";
import _ from "lodash";
import { Dimmer, Loader } from "semantic-ui-react";


class AlbumsPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false, currentPage: 0, loadViewAlbum: false };
    props.getAlbums();
  }

  render() {
    const { albums } = this.props;
    return (
      <div>
         {showLoader(this.state.loadViewAlbum)}
        <GenericComponent
          onScroll={this.fetchNextAlbums.bind(this)}
          data={albums.albums}
          handleOnClick={this.onClickHandler.bind(this)}
          loading={this.state.loading}
        />
      </div>
    );
  }

  //#region  Events and life cycle
  
  // Fetch on scroll- #Pagination
  fetchNextAlbums(e) {
    let element = e.target;
    if (
      element.scrollHeight - Math.ceil(element.scrollTop + 15) <=
        element.clientHeight &&
      this.props.albums.nextPage
    ) {
      this.setState({ loading: true });
      // Send undefined to force the action to include selected dropdown values!
      this.props.getAlbums(this.props.albums.nextPage);
    }
  }
  onClickHandler(id) {
    this.setState({ loadViewAlbum: true });
    this.props.viewInfo(id, "albums");
    _.delay(() => this.setState({ loadViewAlbum: false }), 1500);
  }
  componentDidUpdate(prevProps) {
    if (
      !prevProps.albums &&
      this.props.albums.C.length > prevProps.albums.albums.length
    ) {
      this.setState({ loading: false });
    }
  }
  //#endregion Events and life cycle

}

// Pending: Make this a common component!
function showLoader(show = false) {
  if (!show) {
    return;
  }
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

// Create the albums action creator
const mapStateToProps = state => {
  return {
    albums: state.albums ? state.albums : []
  };
};
const mapDispatchToProps = {
  viewInfo,
  getAlbums
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumsPageContainer);
