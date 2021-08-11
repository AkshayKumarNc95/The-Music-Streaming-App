import React, { Component } from "react";
import RegisterPage from "../../Components/Signing/SignUp/RegisterPage";
// import { userActions } from "../_actions";
import { connect } from "react-redux";
import {registerUser} from '../../Store/Actions/Authentication.js';
import { Dimmer, Loader } from "semantic-ui-react";
class RegisterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {},
      showLoader: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <RegisterPage
          errorInfo={this.state.error.errorToDisplay? this.state.error:undefined}
          onSubmitHandler={this.formSubmit.bind(this)}
        />
        
        {this.props.registerStatus.pending && this.showLoader(true)}
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

    const user = {
      first_name: event.target.elements.first_name.value,
      last_name: event.target.elements.last_name.value,
      email: event.target.elements.email.value,
      password: event.target.elements.pass.value
    };
    const errorInfo = this.validateInputs(user);
    if (errorInfo.isError) {
      this.setState({ error: errorInfo });
    }else{
      this.props.registerUser(user);
      // Trigger the action to create the profile and use a promise to set the state!
      // Untill then show loader;
      // Once done update the error  info and set state
      // 
    }
    // 
  }

  validateInputs(user) {
    const errorInfo = {
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      pass: undefined,
      isError: false,
      errorToDisplay: ""
    };
    var passw = /^[A-Za-z]\w{7,14}$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user) {
      if (!(user.first_name && user.first_name.trim().length > 0)) {
        errorInfo.errorToDisplay += "  First Name is a required field. \n";
        errorInfo.first_name = true;
      }
      if (!(user.last_name && user.last_name.trim().length > 0)) {
        errorInfo.errorToDisplay += "  Last Name is a required field.";
        errorInfo.last_name = true;
      }
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
      errorInfo.first_name ||
      errorInfo.last_name ||
      errorInfo.email ||
      errorInfo.pass;
    return errorInfo;
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password) {
      this.props.registerUser(user);
    }
  }

  //#endregion events
}

function mapStateToProps(state) {
  return {registerStatus : state.RegisterUser}
}

const mapDispatchToProps = {
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
