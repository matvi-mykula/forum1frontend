import { App } from './App.js';
import { Profile } from './Profile.js';
import { Stats } from './Stats.js';
import { useState, useEffect } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const RouteSwitch = () => {
  //   localStorage.setItem('user', JSON.stringify());
  //   const savedState = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(null);

  //   const savedUser = JSON.parse(localStorage.getItem('user'));
  //   console.log(savedUser);
  //   if (savedUser) {
  //     setUserData(savedUser);
  //   }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    console.log(savedUser);
    console.log(typeof savedUser);
    if (savedUser) {
      setUserData(savedUser);
    }
    // if (userData) {
    //   localStorage.setItem('user', JSON.stringify(userData));
    // }
  }, []);

  const logOut = () => {
    console.log('loggin out');
    axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:4000/logout',
    }).then((res) => {
      console.log('logged out');
      setUserData(null);
      localStorage.setItem('user', JSON.stringify(null));
    });
  };
  return (
    <div>
      <BrowserRouter>
        <header className="App-header">
          <Link
            to={'/'}
            className="headerLink"
          >
            Login
          </Link>
          <Link
            to={'/profile'}
            className="headerLink"
          >
            Forum
          </Link>
          <Link
            to={'/stats'}
            className="headerLink"
          >
            Statistics
          </Link>
          <button
            onClick={() => {
              logOut();
              console.log('logged out');
            }}
            className="headerLink"
          >
            Log Out
          </button>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <App
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                userData={userData}
                setUserData={setUserData}
              ></Profile>
            }
          />
          <Route
            path="/stats"
            element={
              <Stats
                userData={userData}
                setUserData={setUserData}
              ></Stats>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { RouteSwitch };
