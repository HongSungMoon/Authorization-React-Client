import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout, authorize, getUserList } from '../actions';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import axios from '../utils/http';

class UserList extends Component {

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
        if (props.value.isLogin == 0) {
            props.history.push('/');
        }
        axios.post('http://127.0.0.1:8081/api/get/user', props.value.userInfo)
            .then(function (response) {
                console.log(response);
                if (response.data.result == 'success') {
                    // alert("Sueccess");
                    props.setUserList(response.data.list);
                    // debugger;
                    // props.value.
                    // this.state = { list: response.data.list }
                    // debugger;
                    // alert("asdf")
                }
            })
            .catch(function (error) {
                alert("Authorize Server is dead");
                props.history.push('/');
                console.log(error);
            });
    }


    render() {
        if (this.props.value.userList) {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                        <h2 className="form-signin-heading"> User List </h2>
                        <br></br>
                        <ul>
                            {this.props.value.userList.map((data, i) => {
                                return (<User id={data.id + " / "} name={data.name + " / "}
                                    email={data.email + " / "} user_type={data.user_type}
                                    key={i} />);
                            })}
                        </ul>
                        {/* <ListGroup>
                            {this.props.value.userList.map((data, i) => {
                                return (<ListGroupItem header="{data.id}"> <font color="black">{i + 1} - {data.name} / {data.email} / {data.user_type}
                                </font> </ListGroupItem>);
                            })}
                        </ListGroup>

                        <ListGroup>
                            {this.props.value.userList.map((data, i) => {
                                return (
                                    <ListGroupItem>
                                    <ListGroupItemHeading> {data.id} </ListGroupItemHeading>
                                    <ListGroupItemText>
                                        {data.name} / {data.email} / {data.user_type}
                                    </ListGroupItemText>
                                    </ListGroupItem>
                                );
                            })}
                        </ListGroup> */}
                    </form>
                    <br></br>
                    <Link to="/home">
                        <button className="btn btn-lg btn-primary btn-block"> Back
                    </button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>
                    <form className="form-signin" onSubmit={(evt) => this.handleSubmit(evt, this)}>
                        <h2 className="form-signin-heading"> User List </h2>
                        <br></br>
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
        onAuthorize: (userInfo) => dispatch(authorize(userInfo)),
        setUserList: (userList) => dispatch(getUserList(userList))
    }
    // bindActionCreators({ increment, decrement }, dispatch); // **** (2) bindActionCreators 사용.
}

class User extends React.Component {
    render() {
        return (
            <li>{this.props.id} {this.props.name} {this.props.email} {this.props.user_type} </li>
        );
    }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
UserList = connect(mapStateToProps, mapDispatchToProps)(UserList);


export default UserList;