import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import './Modal.scss';

/*
    Class info- 
    How to use: 
        props: 
        * data to display 
        * type of modal 
        * call backs


*/
function ModalInfo(props)  {
    // By default set open to true
    // On outer click set it to false
    // Dimmer info should be sent from out side

    const {dimmer, title, description, image, showList, ListComponent, playTrack, addTrack } = props;
    return (
      <div>
        <Modal dimmer={dimmer} open onClose={props.onCloseClick} size = "large" basic>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content image >
            <Image
              rounded
              wrapped
              size="medium"
              src= {image? image:"/image/4k-wallpaper-clean-desk-1420709.jpg"}
            />
            <Modal.Description id = "modal-description">
              <p>
              {description}
              </p>
                <h2>Tracks: </h2>  
                {showList&& ListComponent}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={props.onCloseClick}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }


export default ModalInfo;

export const dimmerTypes = {
  normal: "",
  inverted: "inverted",
  blurring: "blurring"
};
