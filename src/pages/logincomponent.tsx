import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { IUserProfile } from "../models/userprofile";

interface IValidateLogin {
  value: string;
  isValid: boolean;
  message: string;
}

interface ILoginState {
  email: IValidateLogin;
  password: IValidateLogin;
  userList: IUserProfile[];
}

class LoginComponent extends React.Component<RouteComponentProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: {
        value: "",
        isValid: true,
        message: "Please choose a email."
      },
      password: {
        value: "",
        isValid: true,
        message: "Please choose a password."
      },
      userList: []
    };
  }
  loadEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a email."
      }
    });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a password."
      }
    });
  };
  loginUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.email.value === "") {
      this.setState({
        email: {
          value: "",
          isValid: false,
          message: "Please choose a email."
        }
      });
    } else if (this.state.password.value === "") {
      this.setState({
        password: {
          value: "",
          isValid: false,
          message: "Please choose a password."
        }
      });
    } else {
      let isUserPresent =
        this.state.userList.filter(
          employee =>
            employee.email === this.state.email.value &&
            employee.password === this.state.password.value
        ).length > 0;
      if (isUserPresent) {
        let updateLocalStorage = new Promise((success, failure) => {
          localStorage.setItem("isLoggedIn", isUserPresent + "");
          localStorage.setItem("loggedEmail", this.state.email.value);
          console.log(localStorage.getItem("loggedEmail"));
          success();
        });
        updateLocalStorage.then(() => {
          this.props.history.push("/");
        });
      } else {
        this.setState({
          email: {
            value: "",
            isValid: false,
            message: "Email doesnot match."
          },
          password: {
            value: "",
            isValid: false,
            message: "Password doesnot match."
          }
        });
      }
    }
  };
  componentDidMount() {
    this.setState(
      {
        userList: JSON.parse(localStorage.getItem("userList") || "[]")
      },
      () => {
        console.log(this.state.userList);
      }
    );
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.loginUser} className="col-md-4">
          <div
            style={{ marginTop: "5em", padding: "4em" }}
            className="rounded-lg shadow border bg-light text-left"
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className={
                  "form-control " +
                  (this.state.email.isValid ? null : "is-invalid")
                }
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email.value}
                onChange={this.loadEmail}
              />
              <div className="invalid-feedback">{this.state.email.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.password.isValid ? null : "is-invalid")
                }
                id="password"
                placeholder="Password"
                value={this.state.password.value}
                onChange={this.loadPassword}
              />
              <div className="invalid-feedback">
                {this.state.password.message}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark px-4 mt-2">
                Login
              </button>
            </div>
            <hr className="bg-white" />
            <div className="text-center">
              <span>
                New to here?{" "}
                <Link to="/register" className="text-secondary">
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
