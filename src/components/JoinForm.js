import React, { Component } from 'react';

import axios from '../utils/http';

import { browserHistory } from 'react-router';

class Join extends Component {

    state = {
        id: '',
        password: ''
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


    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleSubmit = (event, obj) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:8080/user/join', this.state)
            .then(function (response) {
                console.log(response);
                obj.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                <h2 className="form-signin-heading"> Sign Up </h2>
                <label htmlFor="inputID" className="sr-only"> ID  </label>
                <input type="text" id="inputID" className="form-control" value={this.state.id} placeholder="ID" required onChange={this.idChange} />
                <label htmlFor="inputPassword" className="sr-only"> Password </label>
                <input type="password" id="inputPassword" className="form-control" value={this.state.password} placeholder="Password" required onChange={this.passwdChange} />
                <label htmlFor="inputID" className="sr-only"> Name  </label>
                <input type="text" id="inputName" className="form-control" value={this.state.name} placeholder="Name" required onChange={this.nameChange} />
                <label htmlFor="inputID" className="sr-only"> Email  </label>
                <input type="email" id="inputEmail" className="form-control" value={this.state.email} placeholder="Email" required onChange={this.emailChange} />
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign up
                </button>
            </form>
        );
    }

}

export default Join;