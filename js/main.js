import React from 'react';
import ReactDOM from 'react-dom';
import ComposedTextField from './inputComponent';
import LogField from './logField'



const ChatFields= () => (
  <div>
    <ComposedTextField/>
    <LogField/>
  </div>
);

ReactDOM.render(
  <ChatFields />, document.getElementById('root')
);
