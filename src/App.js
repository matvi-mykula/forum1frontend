import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App(props) {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const secretAdminCode = 'admin';
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // creates a user
  const register = () => {
    let isAdmin = false;
    if (adminCode === secretAdminCode) {
      isAdmin = true;
    }
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        isAdmin: isAdmin,
      },
      withCredentials: true,
      url: 'http://localhost:4000/register',
    }).then((res) => console.log(res));
  };
  //logs in a user
  const login = async () => {
    console.log('login attempted');
    await axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => {
      console.log(res.data);
      console.log('should be logged in');
      props.setUserData(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="admin passcode"
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        {console.log(props.userData)}
        {console.log(typeof props.userData)}
        {/* {props.userData === 'null' ? props.setUserData(null) : null} */}
        {props.userData !== null ? (
          <h1>Welcome Back {props.userData.username}</h1>
        ) : null}
      </div>
    </div>
  );
}

export { App };
