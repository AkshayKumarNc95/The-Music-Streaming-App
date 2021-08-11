import React, { Component } from "react";
import Login from "../../Components/Signing/Login/Login";
// import { userActions } from "../_actions";
import { connect } from "react-redux";
import {login} from '../../Store/Actions/Authentication.js';
import { Dimmer, Loader } from "semantic-ui-react";


class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Login
          isError = {this.props.Authentication.status&&this.props.Authentication.status.isError}
          errorMessage = {this.props.Authentication.status&&this.props.Authentication.status.errorMessage}
          onSubmitHandler={this.formSubmit.bind(this)}
        />
        
        {this.props.Authentication.pending && this.showLoader(true)}
      </div>
    );
  }
   showLoader(show = false) {
    if (!show) {
      return;
    }
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }
  //#region  Events

  formSubmit(event) {
    event.preventDefault();

      this.props.login(user);
      // Trigger the action to create the profile and use a promise to set the state!
      // Untill then show loader;
      // Once done update the error  info and set state
      // 
    }
    // 
  
  validateInputs(user) {
  
    var passw = /^[A-Za-z]\w{7,14}$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user) {
      if (
        !(
          user.email &&
          (user.email.trim().length > 0 || user.email.trim().match(mailformat))
        )
      ) {
        errorInfo.errorToDisplay += "  Please enter a valid email address.";
        errorInfo.email = true;
      }

      if (
        !(
          user.password &&
          (user.password.trim().length > 0 || inputtxt.value.match(passw))
        )
      ) {
        errorInfo.errorToDisplay +=
          "  Password validation failed! Please try again!";
        errorInfo.pass = true;
      }
    } else {
      errorInfo.errorToDisplay = "  Please Enter valid credentials!";
    }
    errorInfo.isError =
      errorInfo.email ||
      errorInfo.pass;
    return errorInfo;
  //#endregion events
}
}

function mapStateToProps(state) {
  return {Authentication : state.Authentication}
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
