import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout } from '../actions';


import axios from '../utils/http';

class JoinForm extends Component {

    state = {
        id: '',
        password: '',
        name: '',
        email: ''
    }


    onLogin() {
        this.props.onLogin();
    }

    idChange = (e) => {
        this.setState({
            id: e.target.value,
        });
    }

    passwdChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();

        axios.post('user/login', this.state)
            .then(function (response) {
                console.log(response);
                this.onLogin();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h2 className="form-signin-heading"> Please sign in </h2>
                    <label htmlFor="inputID" className="sr-only"> ID  </label>
                    <input type="text" id="inputID" className="form-control" value={this.state.id} placeholder="ID" required onChange={this.idChange} />
                    <label htmlFor="inputPassword" className="sr-only"> Password </label>
                    <input type="password" id="inputPassword" className="form-control" value={this.state.password} placeholder="Password" required onChange={this.passwdChange} />
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in
                </button>
                </form>
                <br></br>
                <Link to="/join">
                    <button className="btn btn-lg btn-primary btn-block"> Sign up
                </button>
                </Link>
                <button type="button"
                        onClick={ this.props.onLogin }>
                        +
                </button>
                <button type="button"
                        onClick={ this.props.onLogout}>
                        -
                </button>
                <h1>VALUE: { this.props.value }</h1>
            </div>
        );
    }


}
let mapStateToProps = (state) => {
    return {
        value: state.counter.value
    };
  }

let mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch(login()),
        onLogout: () => dispatch(logout())
    }
}

JoinForm = connect(mapStateToProps, mapDispatchToProps)(JoinForm);


export default JoinForm;