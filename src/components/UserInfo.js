import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout, authorize } from '../actions';


import axios from '../utils/http';

class UserInfo extends Component {

    state = {
        id: '',
        password: '',
        name: '',
        email: '',
        access_token: ''
    }

    idChange = (e) => {
        this.setState({
            id: e.target.value,
        });
    }

    passwdChange = (e, obj) => {
        this.setState({
            access_token: obj.props.value.userInfo.access_token,
            id: obj.props.value.userInfo.id,
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
        axios.post('http://127.0.0.1:8081/api/modify', this.state)
            .then(function (response) {
                console.log(response);
                if (response.data == 'success') {
                    alert("Sueccess");
                }
                obj.props.history.push('/home')
            })
            .catch(function (error) {
                alert("Authorize Server is dead");
                console.log(error);
            });
    }

    constructor(props) {
        super(props);
        if(props.value.isLogin == 0) {
            props.history.push('/')
        }
    }


    render() {
        return (
            <div>
                <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                    <h2 className="form-signin-heading"> Infomation </h2>
                    <br></br>
                    <label htmlFor="inputPassword" className="sr-only"> Password </label>
                    <input type="password" id="inputPassword" className="form-control" value={this.state.password} placeholder="Password" required onChange={(evt) => this.passwdChange(evt, this)} />
                    <label htmlFor="inputID" className="sr-only"> Name  </label>
                    <input type="text" id="inputName" className="form-control" value={this.state.name} placeholder="Name" required onChange={this.nameChange} />
                    <label htmlFor="inputID" className="sr-only"> Email  </label>
                    <input type="email" id="inputEmail" className="form-control" value={this.state.email} placeholder="Email" required onChange={this.emailChange} />
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Modify
            </button>
                </form>
                <br></br>
                <Link to="/home">
                    <button className="btn btn-lg btn-primary btn-block"> Back
                </button>
                </Link>
            </div>
        );
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
UserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo);


export default UserInfo;