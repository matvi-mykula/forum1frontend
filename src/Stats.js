// import * as natural from 'natural';
import natural from 'natural';
// import _ from 'lodash';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

function Stats(props) {
  //   const [chatLog, setChatLog] = useState();
  //   const fetchChat = () => {
  //     axios
  //       .get('http://localhost:4000/getMessages')
  //       .then((response) => {
  //         console.log(response);
  //         setChatLog(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   useEffect(() => {
  //     fetchChat();
  //   }, []);

  //   const tokenizer = new natural.WordTokenizer();

  //   const tokens = tokenizer.tokenize(chatLog);

  //   const wordCounts = _.countBy(tokens);
  //   console.log(wordCounts);

  return (
    <div>
      <p>Stats Page</p>
    </div>
  );
}

export { Stats };
