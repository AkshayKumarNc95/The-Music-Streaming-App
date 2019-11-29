import React, { PureComponent } from "react";
import { GenericComponent } from "../Components/GenComp";
import { getAlbums } from "../Store/Actions/Albums";
import {connect} from 'react-redux';

class AlbumsPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false, currentPage: 0 };
    props.getAlbums();
  }

  // Fetch on scroll- #Pagination
  fetchNextTracks(e) {
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
    // Open Artist page on click
    alert(id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.albums.albums.length > prevProps.albums.albums.length) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { albums } = this.props;
    return (
      <div>
        <GenericComponent
          onScroll={this.fetchNextTracks.bind(this)}
          data={albums.albums}
          handleOnClick={this.onClickHandler.bind(this)}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

// Create the albums action creator
const mapStateToProps = state => {
  return {
    albums: state.albums? state.albums:[]
  };
};
const mapDispatchToProps = {
  getAlbums
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumsPageContainer);
