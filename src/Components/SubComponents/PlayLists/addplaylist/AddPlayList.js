import React, { Component } from 'react'
import TransitionablePortal_Input from '../../../GenComp/portal/TransistionablePortal_Input.js';
import './AddPlayList.scss';
import { connect } from 'react-redux';
import {addPlayList} from '../../../../Store/Actions/PlayLists';

class AddPlayList extends Component{

  constructor(props){
    super(props);
    this.state = {};
    this.updateState = this.updateState.bind(this);
  }

  updateState(value){
    console.log(value);
    this.props.addPlayList(value);
  }

  render(){
    console.log(this.props);
    // Change these values based on state of drop down
    // create s new state variable to show selected 
    // Add playlist
    let placeHolder = "~Romantic, Melody...";
    let btnName = "Add";

    return(
    <div id = "add-play-list-container">
      <TransitionablePortal_Input
        placeHolder = {placeHolder}
        btnName = {btnName}
        callBack = {this.updateState.bind(this)}
      />
    </div>)
  }
}




const mapDistpatchToProps = {
  addPlayList
}

export default connect(null, mapDistpatchToProps)(AddPlayList);