import React from "react";
import userActions from "./../../redux/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { logoutUser } = userActions.actions;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  logout = () => {
    this.props.actions.logoutUser();
    window.location.href = "#/login";
  };

  render() {
    const { user } = this.props;
    const loggedInUser = `${user && user.user ? user.user.name : ""}`;
    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light menu">
          <div className="navbar-nav col-md-5">{loggedInUser}</div>
          <div className="navbar-nav col-md-5">
            <h3>Star Wars Search</h3>
          </div>
          {user.isLoggedIn ? (
            <button className="btn btn-primary col-md-2" onClick={this.logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logoutUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
