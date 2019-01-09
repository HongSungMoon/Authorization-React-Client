import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout, authorize } from '../actions';


import axios from '../utils/http';

class Home extends Component {

    state = {
        url: ''
    }

    idChange = (e) => {
        this.setState({
            url: e.target.value,
        });
    }

    handleSubmit = (event, obj) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8080/user/login', this.state)
            .then(function (response) {
                console.log(response);
                obj.props.onAuthorize(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleLogout = (obj) => {
                obj.props.onLogout();
                this.setState({url: ''});
                obj.props.history.push('/')
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                    <h2 className="form-signin-heading"> URL Shortener </h2>
                    <label htmlFor="inputID" className="sr-only"> ID  </label>
                    <input type="text" id="inputID" className="form-control" value={this.state.url} placeholder="URL" required onChange={this.urlChange} />
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Send
                </button>
                </form>
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" onClick={()=> this.handleLogout(this)}> Logout
                </button>
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
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;