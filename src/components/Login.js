import React, {Component} from 'react';
import { input } from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label for="inputID" className="sr-only"> ID  </label>
                <input type="text" id="inputID" className="form-control" placeholder="ID" required autofocus />
                <label for="inputPassword" className="sr-only"> Password </label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" type="button"> Sign in
                </button>
            </form>
        );
    }
}

export default Login;