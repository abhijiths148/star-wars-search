import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Alert
} from "reactstrap";
import userActions from "./../redux/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "./../services";

const { loginUser } = userActions.actions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      login: false,
      isChecking: false
    };
  }

  componentDidMount() {}

  handleOnChange = e => {
    e.preventDefault();
    var userName = e.target.name;
    this.setState({
      [userName]: e.target.value
    });
  };

  validateForm = () => {
    if (!this.state.username) {
      this.setState({ errorMessage: "Please enter your username" });
      return false;
    }
    if (!this.state.password) {
      this.setState({ errorMessage: "Please enter your password" });
      return false;
    }
    return true;
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ errorMessage: "", isChecking: true });
      try {
        const res = await getUser(this.state.username);
        if (res) {
          if (res.birth_year === this.state.password) {
            delete res.birth_year;
            this.props.actions.loginUser(true, res);
          } else {
            this.setState({
              errorMessage: "Incorrect password!!!",
              isChecking: false
            });
          }
        } else {
          this.setState({
            errorMessage: "Please check your username and password",
            isChecking: false
          });
        }
      } catch (error) {
        this.setState({
          errorMessage: "Something went wrong!!! Please try again",
          isChecking: false
        });
      }
    }
  };

  render() {
    const { user } = this.props;
    if (user.isLoggedIn) {
      return <Redirect to="/" />;
    }
    const { errorMessage, isChecking } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h2>Log In</h2>
              {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ""}

              <Form className="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="e.g. Luke Skywalker"
                    onChange={this.handleOnChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={this.handleOnChange}
                    placeholder="date of birth"
                  />
                </FormGroup>
                <Button>{isChecking ? "Checking..." : "Submit"}</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loginUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
