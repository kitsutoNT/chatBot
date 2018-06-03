import React from 'react';
import ReactDOM from 'react-dom';
import ComposedTextField from './inputComponent';
import SendButton from './sendButton';
import LogField from './logField'

console.log("Working!");

const ChatFields= () => (
  <div>
    <div>
      <ComposedTextField/>
      <SendButton/>
      <LogField/>
    </div>
  </div>

);

ReactDOM.render(
  <ChatFields />, document.getElementById('root')
);
