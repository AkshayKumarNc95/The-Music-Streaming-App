import React from "react";
import "./RegisterPage.scss";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export default function RegisterPage(props) {
  const { onSubmitHandler, errorInfo } = props;

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src="/logo512.png" /> Sign Up to Explore more!
        </Header>
        <Form size="large" onSubmit={onSubmitHandler}>
          <Segment stacked>
            <Form.Input
              name = "first_name"
              fluid
              // icon="user"
              iconPosition="left"
              placeholder="First Name"
              error={errorInfo && errorInfo.first_name && true}
            />
            <Form.Input
            name = "last_name"
              fluid
              // icon="user"
              iconPosition="left"
              placeholder="Last Name"

              error = {errorInfo && errorInfo.last_name&& true}
            />

            <Form.Input
            name = "email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              error={errorInfo && errorInfo.email && true}
            />
            <Form.Input
            name = "pass"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              error={errorInfo && errorInfo.pass && true}
            />

            <Button color="black" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        {/* <Message>
          New here?  <a href="#">Sign Up</a>
        </Message> */}
        <Message
          hidden = {!errorInfo}
          error={errorInfo&& errorInfo.isError}
          success={errorInfo&& !errorInfo.isError}
          header={errorInfo?( errorInfo.isError? "Registration failed": "Register Success"): ""}
        > {  (errorInfo && errorInfo.errorToDisplay)}</Message>
      </Grid.Column>
    </Grid>
  );
}
