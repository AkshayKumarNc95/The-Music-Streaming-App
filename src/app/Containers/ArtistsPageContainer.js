import React, { PureComponent } from "react";
import { GenericComponent } from "../Components/GenComp";
import { connect } from "react-redux";
import { getArtists} from "../Store/Actions/Artists";
import {viewInfo } from "../Store/Actions/Info";
import { Dimmer, Loader } from "semantic-ui-react";
import _ from "lodash";

// For now, Is almost similar to AlbumsPageContainer.
// But i think, its better to have it seperate
// because the specifity and scalability are inversly proportional in a generic container!
class ArtistsPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false, currentPage: 0, loadViewArtist: false };
    props.getArtists();
  }

  render() {
    // Get the artists arrays (limit by 9) by calling the action
    // On recevng the items, send artists
    // Handle onclick of an artist
    //

    const { artists } = this.props;
    console.log(artists);
    return (
      <div>
        {showLoader(this.state.loadViewArtist)}
        <GenericComponent
          onScroll={this.fetchNextArtists.bind(this)}
          data={artists.artists}
          handleOnClick={this.onClickHandler.bind(this)}
          loading={this.state.loading}
        />
      </div>
    );
  }

  //#region Events and life cycle 

  // Fetch on scroll- #Pagination
  fetchNextArtists(e) {
    let element = e.target;
    if (
      element.scrollHeight - Math.ceil(element.scrollTop + 15) <=
        element.clientHeight &&
      this.props.artists.nextPage
    ) {
      this.setState({ loading: true });
      // Send undefined to force the action to include selected dropdown values!
      this.props.getArtists(this.props.artists.nextPage);
    }
  }

  onClickHandler(id) {
    // Open Artist page on click
    this.setState({ loadViewArtist: true });
    this.props.viewInfo(id, "artists");
    _.delay(() => this.setState({ loadViewArtist: false }), 1500);
  }
  componentDidUpdate(prevProps) {
    if (
      !prevProps.artists &&
      this.props.artists.artists.length > prevProps.artists.artists.length
    ) {
      this.setState({ loading: false });
    }
  }
  //#endregion events and life cycle
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

const mapStateToProps = state => {
  return {
    artists: state.artists
  };
};
const mapDispatchToProps = {
  getArtists,
  viewInfo
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsPageContainer);
