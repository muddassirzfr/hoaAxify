import React from "react";
import * as apiCalls from "../apiCalls/apiCalls";
import ProfileCard from "../components/ProfileCard";
import { connect } from "react-redux";
export class UserPage extends React.Component {
  // since /user page is part of react-router
  //  match is part of the prop sent down to it just like history
  state = {
    user: undefined,
    userNotFound: false,
    isLoadingUser: true,
    inEditMode: false,
    originalDisplayName: undefined,
    pendingUpdateCall: false,
    errors: {},
    image: undefined,
  };

  onClickEdit = () => {
    this.setState({ inEditMode: true });
  };
  onClickCancel = () => {
    const user = { ...this.state.user };
    if (this.state.originalDisplayName !== undefined) {
      user.displayName = this.state.originalDisplayName; // set the display name to cached value
    }
    this.setState({
      user,
      originalDisplayName: undefined, //reset cached display name
      inEditMode: false,
      image: undefined,
    });
  };
  onClickSave = () => {
    const userId = this.props.loggedInUser.id; // from the redux store
    const userUpdate = { // json payload
      displayName: this.state.user.displayName,
      image: this.state.image && this.state.image.split(",")[1],
    };
    this.setState({ pendingUpdateCall: true });
    apiCalls
      .updateUser(userId, userUpdate)
      .then((response) => {
        const user = { ...this.state.user };
        user.image = response.data.image;
        this.setState({
          inEditMode: false,
          originalDisplayName: undefined,
          pendingUpdateCall: false,
          user,
          image: undefined,
        });
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        this.setState({
          pendingUpdateCall: false,
          errors,
        });
      });
  };
  onChangeDisplayName = (event) => {
    const user = { ...this.state.user };
    let originalDisplayName = this.state.originalDisplayName;
    if (originalDisplayName === undefined) {
      originalDisplayName = user.displayName; //cache the
    }
    user.displayName = event.target.value; // display name set in state
    this.setState({ user, originalDisplayName }); // display name set in state
  };

  onFileSelect = (event) => {
    //if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    let reader = new FileReader(); // reader reads the image in base64 format
    reader.onloadend = () => {
      this.setState({
        image: reader.result, //base64 image is kept in state
      });
    };
    reader.readAsDataURL(file);
  };

  loadUser = () => {
    // get user from the query parameter of react router
    const username = this.props.match.params.username;
    if (!username) {
      return;
    }
    this.setState({ userNotFound: false });
    apiCalls
      .getUser(username)
      .then((response) => {
        // when user info got to turn off the spinner
        this.setState({
          user: response.data, // get user from backend
          isLoadingUser: false,
        });
      })
      .catch((error) => {
        this.setState({
          // when user not foundd again turn off the spinner
          userNotFound: true,
          isLoadingUser: false,
        });
      });
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.match.params.username !== this.props.match.params.username) {
      this.setState({ inEditMode: false });
      this.loadUser();
    }
  }
  render() {
    let pageContent;
    if (this.state.isLoadingUser) {
      pageContent = (
        <div className="d-flex">
          <div className="spinner-border text-black-50 m-auto">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (this.state.userNotFound) {
      pageContent = (
        <div className="alert alert-danger text-center">
          <h5> User Not Found!!</h5>
        </div>
      );
    } else {
      // compare user logged in (from redux store) to the user in query parameter
      // that can only be editable
      const isEditable =
        this.props.loggedInUser.username === this.props.match.params.username;
      pageContent = this.state.user && (
        <ProfileCard
          user={this.state.user}
          isEditable={isEditable}
          inEditMode={this.state.inEditMode}
          onClickEdit={this.onClickEdit}
          onClickCancel={this.onClickCancel}
          onClickSave={this.onClickSave}
          onChangeDisplayName={this.onChangeDisplayName}
          pendingUpdateCall={this.state.pendingUpdateCall}
          errors={this.state.errors}
          loadedImage={this.state.image}
          onFileSelect={this.onFileSelect}
        />
      );
    }

    return <div data-testid="userpage">{pageContent}</div>;
  }
}

UserPage.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);
