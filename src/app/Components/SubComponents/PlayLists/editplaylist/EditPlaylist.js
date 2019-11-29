import React, { Component } from 'react'
import {TransitionablePortal_Input} from '../../../GenComp';
import './AddPlayList.scss';
import { connect } from 'react-redux';
import {removePlaylist} from '../../../../Store/Actions/PlayLists';

class EditPlayList extends Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  updateState(value){
    console.log(value);
 
  }

  render(){
    return(<div id = "add-play-list-container">
      <TransitionablePortal_Input
        placeHolder = ""
        btnName = "Edit PlayList"
        callBack = {this.updateState.bind(this)}
        value = ""
      />
    </div>)
  }
}


const mapDistpatchToProps = {
  removePlaylist
}


export default connect(null, mapDistpatchToProps)(EditPlayList);