import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TopBar extends React.Component {
  onClickLogout = () => {
    const action = {
      type: "logout-success", // for the redux to activate the reduce function
    };
    this.props.dispatch(action);
  };
  render() {
    let links = (
      <ul className="nav navbar-nav ml-auto">
        <li className="link-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="link-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    if (this.props.user.isLoggedIn) {
      links = (
        <ul className="nav navbar-nav ml-auto">
          <li
            className="nav-item nav-link"
            onClick={this.onClickLogout}
            style={{
              cursor: "pointer",
            }}
          >
            Logout
          </li>
          <li className="link-item">
            <Link to={`/${this.props.user.username}`} className="nav-link">
              My Profile
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="bg-white shadow-sm mb-2">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
              <img
                src={require("../assets/hoaxify-logo.png").default}
                width="60"
                alt="hoAxify"
              />
              hoAxify
            </Link>
            {links}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state, // redux global state
    // this object is passed to redux
    // which then connects it to the component it is called upon
  };
};

// connect fn connects the redux returned function and the
// top bar compont which helps in giving the global state to the component
// as prop
export default connect(mapStateToProps)(TopBar);
