import _ from "lodash";
import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { connect } from "react-redux";
import jamendo from "../../../common/api/jamendo";
import { viewInfo } from "../../../Store/Actions/Info.js";
import { playMe } from "../../../Store/Actions/Tracks";

const initialState = { isLoading: false, results: [], value: "" };

class SearchWithCategory extends Component {
  state = initialState;

  source = {
    Albums: { name: "Albums", results: [] },
    Artists: { name: "Artists", results: [] },
    Tracks: { name: "Tracks", results: [] }
  };

  async getResults(searchText) {
    // api call to search for albums/ tracks/ Artists with the given title.
    //
    let albumQry =
      "https://api.jamendo.com/v3.0/albums/?client_id=303ece4b&format=jsonpretty&limit=2&namesearch=" +
      searchText;
    let artistQry =
      "https://api.jamendo.com/v3.0/artists/?client_id=303ece4b&format=jsonpretty&limit=2&namesearch=" +
      searchText;
    let tracksQry =
      "https://api.jamendo.com/v3.0/tracks/?client_id=303ece4b&format=jsonpretty&limit=3&namesearch=" +
      searchText;

    const albums = await jamendo.get(albumQry);
    const artists = await jamendo.get(artistQry);
    const tracks = await jamendo.get(tracksQry);

    this.source.Albums.results = this.arrangeData(
      albums.data.results,
      "ALBUMS"
    );
    this.source.Artists.results = this.arrangeData(
      artists.data.results,
      "ARTISTS"
    );
    this.source.Tracks.results = this.arrangeData(
      tracks.data.results,
      "TRACKS"
    );
  }

  arrangeData(values, type) {
    return values.map(ele => {
      if (type === "TRACKS") {
        return this.getWhatisNeededFromTheTrack(ele);
      } else
        return {
          id: ele.id,
          title: ele.name,
          description: "",
          image: ele.image,
          price: "",
          type
        };
    });
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });

    // If track- play the song
    console.log(result);
    if (result.type === "TRACKS") {
      const track = this.source.Tracks.results.find(ele => {
        return ele.id === result.id;
      });
      track && this.props.playMe(track);
    } else if (result.type === "ARTISTS") {
      this.props.viewInfo(result.id, "artists");
    } else {
      this.props.viewInfo(result.id, "albums");
    }
    // Else open the infoViewer
  };

  getWhatisNeededFromTheTrack(track) {
    let artists = { id: track.artist_id, name: track.artist_name };
    return {
      id: track.id,
      title: track.name,
      albumId: track.album_id,
      artists: [artists],
      avatar: track.image,
      songData: track.audio,
      type: "TRACKS"
    };
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(async () => {
      if (this.state.value.length < 1) return this.setState(initialState);

      if (this.state.value.length < 3) return;
      // const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      // const isMatch = result => re.test(result.title);
      // const Results = _.filter(source.Albums.results, isMatch);

      await this.getResults(this.state.value);

      let filteredResults = { ...this.source };
      filteredResults.Albums.results.length < 1 &&
        delete filteredResults.Albums;
      filteredResults.Artists.results.length < 1 &&
        delete filteredResults.Artists;
      filteredResults.Tracks.results.length < 1 &&
        delete filteredResults.Tracks;

      this.setState({
        isLoading: false,
        results: filteredResults
      });
    }, 500);
  };

  resultFormat({ image, price, title, description }) {
    return [
      image && (
        <div key="image" className="image">
          {/* {createHTMLImage(image, { autoGenerateKey: false })} */}
          <img src={image} />
        </div>
      ),
      <div key="content" className="content">
        {price && <div className="price">{price}</div>}
        {title && <div className="title">{title}</div>}
        {description && <div className="description">{description}</div>}
      </div>
    ];
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        size="small"
        category
        loading={isLoading}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        {...this.props}
        resultRenderer={this.resultFormat.bind(this)}
      />
    );
  }
}

const mapDispatchToProps = {
  viewInfo,
  playMe
};
export default connect(null, mapDispatchToProps)(SearchWithCategory);
