import React, { Component } from "react";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Input
} from "semantic-ui-react";

export default class TransitionablePortal_Input extends Component {
  state = { open: false, value: "" };

  handleClick = () => this.setState(prevState => ({ open: !prevState.open }));
  handleClose = () => this.setState({ open: false });

  onTextInput(e) {
    if (e.key === "Enter") {
      this.props.callBack(this.state.value);
      this.handleClose();
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    const { open } = this.state;
    const { btnName, placeHolder } = this.props;
    return (
      <div>
        <Button
          content={open ? "Cancel" : btnName}
          negative={open}
          positive={!open}
          onClick={this.handleClick}
        />

        <TransitionablePortal onClose={this.handleClose} open={open}>
          <Segment
            style={{ left: "40%", position: "fixed", top: "50%", zIndex: 1000 }}
          >
            <Header>{btnName}</Header>
            <Input
              placeholder={placeHolder}
              onKeyPress={this.onTextInput.bind(this)}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </Segment>
        </TransitionablePortal>
      </div>
    );
  }
}

/*
Prop types: 
  btn name 
  calllback fn
  placeholder

*/
