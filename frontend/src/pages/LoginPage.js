import React from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";

export class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    apiError: undefined,
    pendingApiCall: false,
  };
  onChangeUsername = (event) => {
    const val = event.target.value;
    this.setState({ username: val, apiError: undefined });
  };

  onChangePassword = (event) => {
    const val = event.target.value;
    this.setState({ password: val, apiError: undefined });
  };
  onClickLogin = () => {
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({ pendingApiCall: true });
    this.props.actions // using redux
      .postLogin(body)
      // this.props
      // .dispatch(authActions.loginHandler(body)) // sending call to reducer
      .then((response) => {
        this.setState({ pendingApiCall: false }, () => {
          this.props.history.push("/"); // this will route to this particular
          // frontend endpoint(Homepage) on sucess with user data from backend
          // and a nice view in frontend
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            apiError: error.response.data.message,
            pendingApiCall: false,
          });
        }
      });
  };
  render() {
    let disableSubmit = false;
    if (this.state.username === "" || this.state.password === "") {
      disableSubmit = true;
    }
    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <Input
            label="Username"
            placeholder="Enter Username"
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Password"
            placeholder="Enter Password"
            type="password"
            onChange={this.onChangePassword}
          />
        </div>
        {this.state.apiError && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger" role="alert">
              {this.state.apiError}
            </div>
          </div>
        )}
        <div className="text-center">
          <ButtonWithProgress
            onClick={this.onClickLogin}
            disabled={disableSubmit || this.state.pendingApiCall}
            text="Login"
            pendingApiCall={this.state.pendingApiCall}
          />
        </div>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => {}, // from redux
};

// this will attach dispatch to props
// dispatch was made available through thunk
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      //redux dispatch is being put into props
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
