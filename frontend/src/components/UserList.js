import React from "react";
import * as apiCalls from "../apiCalls/apiCalls";
import UserListItem from "./UserListItem";
class UserList extends React.Component {
  state = {
    page: {
      content: [],
      number: 0, // default page number
      size: 3, // default size of each page
    },
  };

  loadData = (requestPage = 0) => {
    apiCalls
      .listUsers({ page: requestPage, size: this.state.page.size })
      .then((response) => {
        this.setState({
          page: response.data,
          loadError: undefined,
        });
      })
      .catch((error) => {
        this.setState({ loadError: "User load failed" });
      });
  };
  // onload component
  componentDidMount() {
    this.loadData();
  }
  onClickNext = () => {
    this.loadData(this.state.page.number + 1);
  };

  onClickPrev = () => {
    this.loadData(this.state.page.number - 1);
  };
  render() {
    return (
      <div className="card">
        <h3 className="card-title m-auto">Users</h3>
        {/* iterating through the user pages */}
        <div className="list-group-item list-group-item-action">
          {this.state.page.content.map((user) => {
            return <UserListItem key={user.username} user={user} />;
          })}
        </div>
        <div className="">
          {!this.state.page.first && (
            <span
              className="badge badge-light float-left"
              style={{ cursor: "pointer" }}
              onClick={this.onClickPrev}
            >
              {`< previous`}
            </span>
          )}
          {!this.state.page.last && (
            <span
              className="badge badge-light float-right"
              style={{ cursor: "pointer" }}
              onClick={this.onClickNext}
            >
              {`next >`}
            </span>
          )}
        </div>
        {this.state.loadError && (
          <span className="text-center text-danger">
            {this.state.loadError}
          </span>
        )}
      </div>
    );
  }
}

export default UserList;
