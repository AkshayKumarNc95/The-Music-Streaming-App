import React from "react";
import {
  Dropdown,
  Header,
  Segment,
  TransitionablePortal,
  Button,
  Icon
} from "semantic-ui-react";

export default function(props) {
  const { header, options, onSelectHandler } = props;

  return (
    <TransitionablePortal open>
      <Segment
        style={{ left: "50%", position: "fixed", top: "50%", zIndex: 1000 }}
      >
        <Header>
          {header}{"  "} {"  "}
         
        </Header>

        <Dropdown
          key="x-4"
          fluid
          selection
          options={options}
          onChange={(event, data) => onSelectHandler(event, data)}
        ></Dropdown>
        <hr />
         <Button icon fluid onClick = {onSelectHandler} >
            <Icon name="close" />
          </Button>
      </Segment>
    </TransitionablePortal>
  );
}
