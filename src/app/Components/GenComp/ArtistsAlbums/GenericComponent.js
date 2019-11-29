import React, { Component } from 'react';
import Grid from '../grid/CustomGrid.js';
import './GenericComponent.scss';
import _ from "lodash";

function debounceEventHandler(...args) {
    const debounced = _.debounce(...args);
    return function(e) {
      e.persist();
      return debounced(e);
    };
  }

  
class GenericComponent extends Component{
constructor(props){
    super(props);

    this.state ={};
}

render(){
    return(
        <div id="gen-comp-outer"  onScroll={debounceEventHandler(this.props.onScroll, 500)}> 
            <Grid dataArray = {this.props.data}  onClick={this.props.handleOnClick} loading = {this.props.loading}/>
        </div>
    )
}

}

export default GenericComponent;