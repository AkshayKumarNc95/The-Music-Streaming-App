import React, { PureComponent } from "react";
import {GenericComponent} from "../Components/GenComp";
import {connect} from 'react-redux';
import {getArtists} from '../Store/Actions/Artists';

class ArtistsPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {loading: false, currentPage: 0};
    props.getArtists();
  }

  // Fetch on scroll- #Pagination
  fetchNextTracks(e) {
    let element = e.target;
    if (
      element.scrollHeight - Math.ceil(element.scrollTop+15) <=
        element.clientHeight &&
       this.props.artists.nextPage
    ) {
      this.setState({ loading: true });
      // Send undefined to force the action to include selected dropdown values!
      this.props.getArtists(this.props.artists.nextPage);
      
    }
  }
  onClickHandler(id){
    // Open Artist page on click
    alert(id);
  }
  componentDidUpdate(prevProps){
    if(this.props.artists.artists.length > prevProps.artists.artists.length)
    {
      this.setState({loading:false});
    }
  }

  render() {
    // Get the artists arrays (limit by 9) by calling the action
    // On recevng the items, send artists
    // Handle onclick of an artist
    // 
    
    const {artists} = this.props;
      console.log(artists);
    return (
      <div>
        <GenericComponent onScroll = {this.fetchNextTracks.bind(this)} data = {artists.artists} handleOnClick = {this.onClickHandler.bind(this)} loading = {this.state.loading} />
      </div>
    );
  }
}


const mapStateToProps = state =>{
  return {
    artists: state.artists
  }
}
const mapDispatchToProps = {
  getArtists
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPageContainer);
