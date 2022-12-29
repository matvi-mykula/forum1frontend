import axios from 'axios';
import React, { useState, useEffect } from 'react';

function DisplayChat(props) {
  console.log(props);

  const [textArea, setTextArea] = useState(null);
  const [chatLog, setChatLog] = useState(null);
  //   useEffect(() => {
  //     const savedUser = JSON.parse(localStorage.getItem('user'));
  //     if (savedUser) {
  //       props.setUserData(savedUser);
  //     }
  //   }, []);

  const fetchChat = () => {
    axios
      .get('http://localhost:4000/getMessages')
      .then((response) => {
        console.log(response);
        setChatLog(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchChat();
  }, []);

  const handleChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleSubmit = async () => {
    await postMessage(props.userData.username, textArea, new Date());
    console.log('message should be posted');
    await fetchChat();
    setTextArea(null);
  };

  const removeFromState = (id) => {
    setChatLog(chatLog.filter((entry) => entry._id !== id));
  };
  const handleRemove = (id) => {
    console.log({ id });
    removeEntry(id);
    removeFromState(id);
  };

  const handleMessage = (index, isItAdmin) => {
    let whichClass;
    let message;
    if (chatLog[index].username === props.userData.username) {
      whichClass = 'isUserMessage';
      message = chatLog[index].username + ' : ' + chatLog[index].message;
    } else {
      whichClass = 'notUserMessage';
      message = chatLog[index].message + ' : ' + chatLog[index].username;
    }
    console.log(message);
    return (
      <div>
        <p
          key={index}
          className={whichClass}
        >
          {message}
          {'        '}
          {isItAdmin ? (
            <span
              className="adminDelete"
              onClick={() => handleRemove(chatLog[index]._id)}
            >
              X
            </span>
          ) : null}
        </p>
      </div>
    );
  };

  return (
    <div>
      <form>
        <textarea
          placeholder="..."
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        ></input>
      </form>
      {/* if there is  a chatlog then return some jsx */}
      {chatLog ? (
        // if the user is Admin
        // props.userData.isAdmin ? (
        <div className="chatContainer">
          {[...chatLog].map((x, i) => {
            return handleMessage(i);
          })}
        </div>
      ) : null}
    </div>
  );
}

const postMessage = (aName, aMessage, aDate) => {
  console.log('posting message');
  axios
    .post('http://localhost:4000/postMessage', {
      aName,
      aMessage,
      aDate,
    })
    .then((response) => {
      console.log('this message should be posted');

      console.log(response.data);
    });
};

const removeEntry = (id) => {
  axios
    .delete(`http://localhost:4000/delete/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { DisplayChat };
