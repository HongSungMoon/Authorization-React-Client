import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout, authorize } from '../actions';


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

    handleSubmit = (event, obj) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8080/user/login', this.state)
            .then(function (response) {
                console.log(response);
                obj.props.onAuthorize(response.data);
                obj.props.history.push('/home')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit2 = (event, obj) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8081/user/login', this.state)
            .then(function (response) {
                console.log(response);
                obj.props.onAuthorize(response.data);
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
        if (this.props.value.islogin === 0) {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
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
                </div>
            );
        } else {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit2(evt, this)}>
                        <h2 className="form-signin-heading"> URL Shortener </h2>
                        <label htmlFor="inputID" className="sr-only"> ID  </label>
                        <input type="text" id="inputID" className="form-control" value={this.state.id} placeholder="ID" required onChange={this.idChange} />
                        <br></br>
                        <button className="btn btn-lg btn-primary btn-block" type="submit"> Send
                </button>
                    </form>
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.props.onLogout}> Logout
                </button>
                </div>
            );
        }
    }


}
// props 로 넣어줄 스토어 상태값
let mapStateToProps = (state) => {
    return {
        value: state.service
    };
}

// props 로 넣어줄 액션 생성함수
let mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch(login()),
        onLogout: () => dispatch(logout()),
        onAuthorize: (userInfo) => dispatch(authorize(userInfo))
    }
    // bindActionCreators({ increment, decrement }, dispatch); // **** (2) bindActionCreators 사용.
}



// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
JoinForm = connect(mapStateToProps, mapDispatchToProps)(JoinForm);


export default JoinForm;