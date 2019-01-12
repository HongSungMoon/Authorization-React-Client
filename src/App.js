import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import JoinForm from './components/JoinForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Password from './components/Password';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';

class App extends Component {

  isLogin = false

  constructor(props) {
    super(props);
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={LoginForm}/>
          <Route path="/join" component={JoinForm}/>
          <Route path="/home" component={Home}/>
          <Route path="/password" component={Password}/>
          <Route path="/userinfo" component={UserInfo}/>
          <Route path="/userlist" component={UserList}/>
          {/* <h1>VALUE: { this.props.value }</h1> */}
        </header>
      </div>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//       value: state.counter.value
//   };
// }

// App = connect(mapStateToProps)(App);

export default App;
