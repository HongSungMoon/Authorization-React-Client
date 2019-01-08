import React, { Component } from 'react';

import axios from '../utils/http';

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

    handleSubmit = event => {
        event.preventDefault();

        axios.post('user/join', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    constructor(props) {
        super();
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label htmlFor="inputID" className="sr-only"> ID  </label>
                <input type="text" id="inputID" className="form-control" value={this.state.id} placeholder="ID" required onChange={this.idChange} />
                <label htmlFor="inputPassword" className="sr-only"> Password </label>
                <input type="password" id="inputPassword" className="form-control" value={this.state.password} placeholder="Password" required onChange={this.passwdChange} />
                <label htmlFor="inputID" className="sr-only"> ID  </label>
                <input type="text" id="inputName" className="form-control" value={this.state.name} placeholder="Name" required onChange={this.nameChange} />
                <label htmlFor="inputID" className="sr-only"> ID  </label>
                <input type="email" id="inputEmail" className="form-control" value={this.state.email} placeholder="Email" required onChange={this.emailChange} />
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign up
                </button>
            </form>
        );
    }

}

export default Join;