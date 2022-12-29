import { DisplayChat } from './DisplayChat';

function Profile(props) {
  console.log(props);
  console.log(props.userData);
  console.log(localStorage);

  console.log(props.userData);

  if (props.userData) {
    return (
      <div>
        <p className="contentText">Welcome {props.userData.username}!!!</p>
        <DisplayChat
          userData={props.userData}
          setUserData={props.setUserData}
        ></DisplayChat>
      </div>
    );
  } else {
    return (
      <div>
        <p className="contentText">
          Log In to see chat history and to post a message
        </p>
      </div>
    );
  }
}

export { Profile };
