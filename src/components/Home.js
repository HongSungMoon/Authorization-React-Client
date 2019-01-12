import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout, authorize } from '../actions';


import axios from '../utils/http';

class Home extends Component {

    state = {
        input: ''
    }

    inputChange = (e) => {
        this.setState({
            input: e.target.value,
        });
    }

    handleSubmit = (event, obj) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8081/api/hello', obj.props.value.userInfo.access_token)
            .then(function (response) {
                console.log(response);
                obj.setState({ input: response.data });
            })
            .catch(function (error) {
                if (!error.response) {
                    alert("Authorize Server is dead");
                } else if (error.response.status == 401) {
                    alert("Token Expired");
                } else {
                    alert("API Server is dead");
                }
                console.log(error);
                obj.props.onLogout();
                obj.props.history.push('/')

            });
        // axios.post(`http://localhost:8000/api/auth`,
        // { headers: { 'Content-type': 'application/x-www-form-urlencoded', }, id: 'hong', pwd: '12345' }).then(response => { console.log('response', JSON.stringify(response, null, 2)) }).catch(error => { console.log('failed', error) })

    }

    handleLogout = (obj) => {
        obj.props.onLogout();
        this.setState({ input: '' });
        obj.props.history.push('/')
    }

    constructor(props) {
        super(props);
        if(props.value.isLogin == 0) {
            props.history.push('/');
        }
    }

    render() {
        if (this.props.value.userInfo.user_type === 'admin') {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                        <h2 className="form-signin-heading"> Hello </h2>
                        <br></br>
                        <label htmlFor="input" className="sr-only"> ID  </label>
                        <input type="text" id="input" readOnly className="form-control" value={this.state.input} placeholder="" onChange={this.inputChange} />
                        <br></br>
                        <button className="btn btn-lg btn-primary btn-block" type="submit"> Send
                </button>
                    </form><br></br>
                    <Link to="/userlist">
                    <button className="btn btn-lg btn-primary btn-block"> UserList
                </button></Link>
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" onClick={() => this.handleLogout(this)}> Logout
                </button>
                    <br></br>
                    <Link to="/userInfo">
                        <span> Do you want to modify your information?</span>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                        <h2 className="form-signin-heading"> Hello </h2>
                        <label htmlFor="input" className="sr-only"> ID  </label>
                        <input type="text" id="input" readOnly className="form-control" value={this.state.input} placeholder="" onChange={this.inputChange} />
                        <br></br>
                        <button className="btn btn-lg btn-primary btn-block" type="submit"> Send
                </button>
                    </form>
                    <br></br>
                    <button className="btn btn-lg btn-primary btn-block" onClick={() => this.handleLogout(this)}> Logout
                </button>
                    <br></br>
                    <Link to="/userInfo">
                        <span> Do you want to modify your information?</span>
                    </Link>
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
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;